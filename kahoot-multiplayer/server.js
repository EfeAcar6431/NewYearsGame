const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const os = require("os");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Game rooms storage
const games = new Map();

// Generate random game code
function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Host creates a new game
  socket.on("host-game", (data) => {
    const gameCode = generateGameCode();
    const game = {
      code: gameCode,
      hostId: socket.id,
      players: new Map(),
      category: data.category || "general",
      totalQuestions: data.totalQuestions || 10,
      currentQuestion: 0,
      state: "lobby", // lobby, question, results, leaderboard, ended
      questionStartTime: null,
      answers: new Map(),
      shuffledQuestions: [],
    };

    games.set(gameCode, game);
    socket.join(gameCode);
    socket.gameCode = gameCode;
    socket.isHost = true;

    console.log(`Game created: ${gameCode}`);
    socket.emit("game-created", {
      gameCode,
      localIP: getLocalIP(),
      port: PORT,
    });
  });

  // Player joins a game
  socket.on("join-game", (data) => {
    const { gameCode, playerName } = data;
    const game = games.get(gameCode.toUpperCase());

    if (!game) {
      socket.emit("join-error", { message: "Game not found!" });
      return;
    }

    if (game.state !== "lobby") {
      socket.emit("join-error", { message: "Game already in progress!" });
      return;
    }

    // Add player to game
    const player = {
      id: socket.id,
      name: playerName,
      score: 0,
      streak: 0,
    };

    game.players.set(socket.id, player);
    socket.join(gameCode.toUpperCase());
    socket.gameCode = gameCode.toUpperCase();
    socket.playerName = playerName;

    console.log(`${playerName} joined game ${gameCode}`);

    // Notify player
    socket.emit("joined-game", {
      gameCode: gameCode.toUpperCase(),
      playerName,
    });

    // Notify host of new player
    io.to(game.hostId).emit("player-joined", {
      players: Array.from(game.players.values()),
    });
  });

  // Host starts the game
  socket.on("start-game", (data) => {
    const game = games.get(socket.gameCode);
    if (!game || !socket.isHost) return;

    game.shuffledQuestions = data.questions;
    game.state = "playing";
    game.currentQuestion = 0;

    // Notify all players game is starting
    io.to(socket.gameCode).emit("game-starting", {
      totalQuestions: game.totalQuestions,
    });

    // Start first question after delay
    setTimeout(() => {
      sendQuestion(game);
    }, 3000);
  });

  // Player submits an answer
  socket.on("submit-answer", (data) => {
    const game = games.get(socket.gameCode);
    if (!game || game.state !== "question") return;

    const player = game.players.get(socket.id);
    if (!player || game.answers.has(socket.id)) return;

    const timeElapsed = (Date.now() - game.questionStartTime) / 1000;
    const basePoints = 1000;
    const timeBonus = Math.max(
      0,
      Math.floor(basePoints * (1 - timeElapsed / 20))
    );

    const isCorrect =
      data.answerIndex === game.shuffledQuestions[game.currentQuestion].correct;
    const points = isCorrect ? timeBonus : 0;

    // Update streak
    if (isCorrect) {
      player.streak++;
    } else {
      player.streak = 0;
    }

    // Streak bonus
    const streakBonus =
      isCorrect && player.streak > 1
        ? Math.floor(points * 0.1 * Math.min(player.streak - 1, 5))
        : 0;
    const totalPoints = points + streakBonus;

    player.score += totalPoints;

    game.answers.set(socket.id, {
      answerIndex: data.answerIndex,
      isCorrect,
      points: totalPoints,
      timeElapsed,
    });

    // Notify player of their result immediately
    socket.emit("answer-result", {
      isCorrect,
      points: totalPoints,
      streak: player.streak,
      totalScore: player.score,
    });

    // Notify host of answer count
    io.to(game.hostId).emit("answer-submitted", {
      answeredCount: game.answers.size,
      totalPlayers: game.players.size,
    });

    // Check if all players answered
    if (game.answers.size >= game.players.size) {
      clearTimeout(game.questionTimer);
      showResults(game);
    }
  });

  // Host requests next question
  socket.on("next-question", () => {
    const game = games.get(socket.gameCode);
    if (!game || !socket.isHost) return;

    game.currentQuestion++;

    if (game.currentQuestion >= game.shuffledQuestions.length) {
      endGame(game);
    } else {
      sendQuestion(game);
    }
  });

  // Host ends game early
  socket.on("end-game", () => {
    const game = games.get(socket.gameCode);
    if (!game || !socket.isHost) return;
    endGame(game);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.gameCode) {
      const game = games.get(socket.gameCode);
      if (game) {
        if (socket.isHost) {
          // Host disconnected, end game
          io.to(socket.gameCode).emit("game-ended", {
            reason: "Host disconnected",
          });
          games.delete(socket.gameCode);
        } else {
          // Player disconnected
          game.players.delete(socket.id);
          io.to(game.hostId).emit("player-left", {
            players: Array.from(game.players.values()),
          });
        }
      }
    }
  });
});

function sendQuestion(game) {
  game.state = "question";
  game.answers.clear();
  game.questionStartTime = Date.now();

  const question = game.shuffledQuestions[game.currentQuestion];

  // Send question to host (with correct answer)
  io.to(game.hostId).emit("show-question", {
    questionIndex: game.currentQuestion,
    question: question.q,
    answers: question.answers,
    correctIndex: question.correct,
  });

  // Send question to players (without correct answer)
  game.players.forEach((player, playerId) => {
    io.to(playerId).emit("show-question", {
      questionIndex: game.currentQuestion,
      answers: question.answers,
    });
  });

  // Set timer for question
  game.questionTimer = setTimeout(() => {
    showResults(game);
  }, 20000); // 20 second timer
}

function showResults(game) {
  game.state = "results";

  const question = game.shuffledQuestions[game.currentQuestion];
  const answerCounts = [0, 0, 0, 0];

  game.answers.forEach((answer) => {
    answerCounts[answer.answerIndex]++;
  });

  // Send results to host
  io.to(game.hostId).emit("show-results", {
    correctIndex: question.correct,
    correctAnswer: question.answers[question.correct],
    answerCounts,
    players: Array.from(game.players.values()).map((p) => ({
      name: p.name,
      score: p.score,
      answered: game.answers.has(p.id),
      correct: game.answers.get(p.id)?.isCorrect || false,
    })),
  });

  // Notify players that results are being shown
  game.players.forEach((player, playerId) => {
    const answer = game.answers.get(playerId);
    io.to(playerId).emit("results-shown", {
      correctAnswer: question.answers[question.correct],
      yourAnswer: answer ? question.answers[answer.answerIndex] : null,
      isCorrect: answer?.isCorrect || false,
    });
  });

  // Auto-advance to leaderboard after delay
  setTimeout(() => {
    showLeaderboard(game);
  }, 4000);
}

function showLeaderboard(game) {
  game.state = "leaderboard";

  const sortedPlayers = Array.from(game.players.values()).sort(
    (a, b) => b.score - a.score
  );

  io.to(game.code).emit("show-leaderboard", {
    players: sortedPlayers,
    currentQuestion: game.currentQuestion + 1,
    totalQuestions: game.shuffledQuestions.length,
  });
}

function endGame(game) {
  game.state = "ended";

  const sortedPlayers = Array.from(game.players.values()).sort(
    (a, b) => b.score - a.score
  );

  io.to(game.code).emit("game-over", {
    players: sortedPlayers,
  });

  // Clean up game after delay
  setTimeout(() => {
    games.delete(game.code);
  }, 60000);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  const localIP = getLocalIP();
  console.log("");
  console.log("🎮 Kahoot Multiplayer Server Running!");
  console.log("=====================================");
  console.log(`📺 Host URL: http://localhost:${PORT}/host.html`);
  console.log(`📱 Players join: http://${localIP}:${PORT}`);
  console.log("=====================================");
  console.log("");
});
