// Connect to Socket.io server
const socket = io();

// Game state
let gameState = {
  selectedCategory: "general",
  totalQuestions: 10,
  currentQuestion: 0,
  players: [],
  timerInterval: null,
};

// Categories
const categories = [
  { id: "general", name: "General", icon: "🎯" },
  { id: "movies", name: "Movies", icon: "🎬" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "geography", name: "Geography", icon: "🌍" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "history", name: "History", icon: "📜" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "food", name: "Food", icon: "🍕" },
];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
});

function renderCategories() {
  const grid = document.getElementById("category-grid");
  grid.innerHTML = categories
    .map(
      (cat, i) => `
        <button class="cat-btn${i === 0 ? " selected" : ""}" 
                data-category="${cat.id}" 
                onclick="selectCategory('${cat.id}')">
            <span class="icon">${cat.icon}</span>
            <span class="name">${cat.name}</span>
        </button>
    `
    )
    .join("");
}

function selectCategory(categoryId) {
  document
    .querySelectorAll(".cat-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  document
    .querySelector(`[data-category="${categoryId}"]`)
    .classList.add("selected");
  gameState.selectedCategory = categoryId;
}

function setQuestions(count) {
  document
    .querySelectorAll(".q-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  event.target.classList.add("selected");
  gameState.totalQuestions = count;
}

function createGame() {
  socket.emit("host-game", {
    category: gameState.selectedCategory,
    totalQuestions: gameState.totalQuestions,
  });
}

function startGame() {
  // Shuffle questions for selected category
  const categoryQuestions = [...questions[gameState.selectedCategory]];
  for (let i = categoryQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categoryQuestions[i], categoryQuestions[j]] = [
      categoryQuestions[j],
      categoryQuestions[i],
    ];
  }

  socket.emit("start-game", {
    questions: categoryQuestions.slice(0, gameState.totalQuestions),
  });
}

function nextQuestion() {
  socket.emit("next-question");
}

function showScreen(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Socket event handlers
socket.on("game-created", (data) => {
  document.getElementById("game-code").textContent = data.gameCode;
  document.getElementById(
    "join-url"
  ).textContent = `${data.localIP}:${data.port}`;
  showScreen("lobby-screen");
  playLobbyMusic(); // Start lobby music
});

socket.on("player-joined", (data) => {
  gameState.players = data.players;
  updatePlayerList();
  playJoinSound(); // Play join sound
});

socket.on("player-left", (data) => {
  gameState.players = data.players;
  updatePlayerList();
});

function updatePlayerList() {
  const count = gameState.players.length;
  document.getElementById("player-count").textContent = count;

  const grid = document.getElementById("players-grid");
  grid.innerHTML = gameState.players
    .map(
      (p) => `
        <div class="player-card">${p.name}</div>
    `
    )
    .join("");

  const startBtn = document.getElementById("start-btn");
  if (count >= 1) {
    startBtn.disabled = false;
    startBtn.textContent = "START GAME!";
  } else {
    startBtn.disabled = true;
    startBtn.textContent = "Waiting for players...";
  }
}

socket.on("game-starting", (data) => {
  showScreen("ready-screen");
  stopLobbyMusic(); // Stop lobby music
  playGameStartSound(); // Play game start sound

  document.getElementById("ready-q-total").textContent = data.totalQuestions;
  document.getElementById("ready-q-num").textContent = "1";

  let countdown = 3;
  document.getElementById("ready-countdown").textContent = countdown;
  playCountdownBeep(countdown); // Play countdown beep

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      document.getElementById("ready-countdown").textContent = countdown;
      playCountdownBeep(countdown); // Play countdown beep
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

socket.on("show-question", (data) => {
  showScreen("question-screen");
  playQuestionSound(); // Play question reveal sound
  playQuestionMusic(); // Start background music

  document.getElementById("question-text").textContent = data.question;
  document.getElementById("q-counter").textContent = `${
    data.questionIndex + 1
  }/${gameState.totalQuestions}`;

  // Set answers
  data.answers.forEach((answer, i) => {
    document.querySelector(`#answer-${i} .text`).textContent = answer;
    document
      .getElementById(`answer-${i}`)
      .classList.remove("correct", "incorrect");
  });

  // Reset answer counter
  document.getElementById("answered-count").textContent = "0";
  document.getElementById("total-players").textContent =
    gameState.players.length;

  // Store correct index
  gameState.correctIndex = data.correctIndex;
  gameState.currentQuestion = data.questionIndex;

  // Start timer
  startTimer();
});

function startTimer() {
  let timeLeft = 20;
  document.getElementById("timer-num").textContent = timeLeft;
  document.getElementById("timer-progress").style.strokeDashoffset = "0";

  if (gameState.timerInterval) clearInterval(gameState.timerInterval);

  gameState.timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer-num").textContent = timeLeft;

    // Play tick sound for last 5 seconds
    if (timeLeft <= 5 && timeLeft > 0) {
      playTickSound();
    }

    // Update circle progress
    const offset = 283 * (1 - timeLeft / 20);
    document.getElementById("timer-progress").style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(gameState.timerInterval);
      playTimeUpSound(); // Play time's up sound
    }
  }, 1000);
}

socket.on("answer-submitted", (data) => {
  document.getElementById("answered-count").textContent = data.answeredCount;
  document.getElementById("total-players").textContent = data.totalPlayers;
});

socket.on("show-results", (data) => {
  if (gameState.timerInterval) clearInterval(gameState.timerInterval);
  stopQuestionMusic(); // Stop question music

  showScreen("results-screen");
  playResultsSound(); // Play results sound

  document.getElementById("correct-answer").textContent = data.correctAnswer;

  const maxCount = Math.max(...data.answerCounts, 1);

  for (let i = 0; i < 4; i++) {
    const count = data.answerCounts[i];
    const height = (count / maxCount) * 140 + 60;

    const statBar = document.querySelector(`.stat-bar:nth-child(${i + 1})`);
    statBar.style.height = `${height}px`;
    document.getElementById(`count-${i}`).textContent = count;
  }

  // Highlight answer cards
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById(`answer-${i}`);
    if (i === data.correctIndex) {
      card.classList.add("correct");
    } else {
      card.classList.add("incorrect");
    }
  }
});

socket.on("show-leaderboard", (data) => {
  showScreen("leaderboard-screen");
  playLeaderboardSound(); // Play leaderboard sound

  const list = document.getElementById("leaderboard-list");
  list.innerHTML = data.players
    .slice(0, 5)
    .map(
      (p, i) => `
        <div class="leader-item" style="animation-delay: ${i * 0.1}s">
            <span class="leader-rank">#${i + 1}</span>
            <span class="leader-name">${p.name}</span>
            <span class="leader-score">${p.score} pts</span>
        </div>
    `
    )
    .join("");

  // Update next button text
  const nextBtn = document.querySelector(".next-btn");
  if (data.currentQuestion >= data.totalQuestions) {
    nextBtn.textContent = "See Final Results →";
  } else {
    nextBtn.textContent = "Next Question →";
  }
});

socket.on("game-over", (data) => {
  showScreen("final-screen");
  createConfetti();
  playVictorySound(); // Play victory fanfare

  const players = data.players;

  // Update podium
  if (players[0]) {
    document.querySelector("#first-place .podium-name").textContent =
      players[0].name;
    document.querySelector(
      "#first-place .podium-score"
    ).textContent = `${players[0].score} pts`;
  }

  if (players[1]) {
    document.querySelector("#second-place .podium-name").textContent =
      players[1].name;
    document.querySelector(
      "#second-place .podium-score"
    ).textContent = `${players[1].score} pts`;
  }

  if (players[2]) {
    document.querySelector("#third-place .podium-name").textContent =
      players[2].name;
    document.querySelector(
      "#third-place .podium-score"
    ).textContent = `${players[2].score} pts`;
  }
});

socket.on("game-ended", (data) => {
  alert("Game ended: " + (data.reason || "Unknown reason"));
  location.reload();
});

function createConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";

  // Christmas colors!
  const colors = [
    "#BB2528", // Red
    "#146B3A", // Green
    "#F8B229", // Gold
    "#ffffff", // White (snow)
    "#165B33", // Dark green
    "#EA4630", // Bright red
  ];

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 3 + "s";
    piece.style.animationDuration = Math.random() * 2 + 2 + "s";
    container.appendChild(piece);
  }

  // Add some festive emojis too
  const emojis = ["🎄", "⭐", "🎁", "❄️", "🔔", "🎅"];
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement("div");
    emoji.className = "confetti-piece";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "%";
    emoji.style.fontSize = "2rem";
    emoji.style.background = "none";
    emoji.style.animationDelay = Math.random() * 3 + "s";
    emoji.style.animationDuration = Math.random() * 2 + 3 + "s";
    container.appendChild(emoji);
  }
}
