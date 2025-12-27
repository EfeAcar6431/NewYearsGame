// Connect to Socket.io server
const socket = io();

// Player state
let playerState = {
  name: "",
  gameCode: "",
  score: 0,
  rank: 0,
  hasAnswered: false,
};

// Join game
function joinGame() {
  const gameCode = document
    .getElementById("game-code-input")
    .value.trim()
    .toUpperCase();
  const playerName = document.getElementById("player-name-input").value.trim();

  // Validate
  if (!gameCode || gameCode.length < 4) {
    showError("Please enter a valid game PIN");
    return;
  }

  if (!playerName || playerName.length < 1) {
    showError("Please enter a nickname");
    return;
  }

  playerState.name = playerName;
  playerState.gameCode = gameCode;

  socket.emit("join-game", { gameCode, playerName });
}

function showError(message) {
  const errorEl = document.getElementById("error-msg");
  errorEl.textContent = message;
  errorEl.classList.add("show");

  setTimeout(() => {
    errorEl.classList.remove("show");
  }, 3000);
}

function selectAnswer(index) {
  if (playerState.hasAnswered) return;

  playerState.hasAnswered = true;
  playSelectSound(); // Play selection sound

  // Highlight selected answer
  document.querySelectorAll(".answer-btn").forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("selected");
    }
    btn.disabled = true;
  });

  // Send answer to server
  socket.emit("submit-answer", { answerIndex: index });

  // Show submitted screen after brief delay
  setTimeout(() => {
    showScreen("submitted-screen");
  }, 300);
}

function showScreen(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Socket event handlers
socket.on("join-error", (data) => {
  showError(data.message);
});

socket.on("joined-game", (data) => {
  document.getElementById("player-display").textContent = data.playerName;
  showScreen("waiting-screen");
  playJoinSound(); // Play join sound
});

socket.on("game-starting", () => {
  showScreen("ready-screen");
  playGameStartSound(); // Play game start sound
});

socket.on("show-question", (data) => {
  playerState.hasAnswered = false;

  // Reset answer buttons
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });

  showScreen("answer-screen");
});

socket.on("answer-result", (data) => {
  // Store result for display
  playerState.lastResult = data;
  playerState.score = data.totalScore;
});

socket.on("results-shown", (data) => {
  const result = playerState.lastResult || {
    isCorrect: false,
    points: 0,
    streak: 0,
  };
  const screen = document.getElementById("result-screen");

  // Clear previous animations
  clearAnimations();

  if (result.isCorrect) {
    screen.classList.remove("wrong");
    document.getElementById("result-icon").textContent = "🎄";
    document.getElementById("result-text").textContent = "Nice! 🎅";
    document.getElementById("points-display").textContent = `+${result.points}`;
    playCorrectSound(); // Play correct sound

    // Create cake/treat celebration!
    createCakeAnimation();

    if (result.streak > 1) {
      document.getElementById(
        "streak-display"
      ).textContent = `🔥 ${result.streak} Streak!`;
      document.getElementById("streak-display").classList.remove("hidden");
      playStreakSound(result.streak); // Play streak bonus sound
    } else {
      document.getElementById("streak-display").classList.add("hidden");
    }
  } else {
    screen.classList.add("wrong");
    document.getElementById("result-icon").textContent = "😈";
    document.getElementById("result-text").textContent = "Naughty List!";
    document.getElementById("points-display").textContent = "+0";
    document.getElementById("streak-display").classList.add("hidden");
    playWrongSound(); // Play wrong sound

    // Create attack animation!
    createAttackAnimation();
    screen.classList.add("screen-shake");
    setTimeout(() => screen.classList.remove("screen-shake"), 500);
  }

  document.getElementById("total-score").textContent = playerState.score;
  showScreen("result-screen");
});

// Animation functions
function clearAnimations() {
  document
    .querySelectorAll(
      ".cake-animation, .attack-animation, .celebration-particle"
    )
    .forEach((el) => el.remove());
}

function createCakeAnimation() {
  const screen = document.getElementById("result-screen");
  const treats = ["🎂", "🍰", "🧁", "🍪", "🍩", "🎁", "⭐", "🌟", "✨", "🎄"];

  // Create multiple treats falling
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const treat = document.createElement("div");
      treat.className = "cake-animation";
      treat.textContent = treats[Math.floor(Math.random() * treats.length)];
      treat.style.left = Math.random() * 80 + 10 + "%";
      treat.style.animationDelay = Math.random() * 0.3 + "s";
      screen.appendChild(treat);

      // Remove after animation
      setTimeout(() => treat.remove(), 2500);
    }, i * 100);
  }

  // Add celebration particles
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "celebration-particle";
      particle.textContent = ["❄️", "🎄", "⭐", "✨"][
        Math.floor(Math.random() * 4)
      ];
      particle.style.left = Math.random() * 80 + 10 + "%";
      particle.style.bottom = "20%";
      screen.appendChild(particle);

      setTimeout(() => particle.remove(), 2000);
    }, i * 150);
  }
}

function createAttackAnimation() {
  const screen = document.getElementById("result-screen");

  // Snowball attack from side
  const snowball = document.createElement("div");
  snowball.className = "attack-animation snowball";
  snowball.textContent = "❄️";
  snowball.style.left = "50%";
  snowball.style.top = "40%";
  screen.appendChild(snowball);

  setTimeout(() => {
    // Coal drops from above (you were naughty!)
    const coal = document.createElement("div");
    coal.className = "attack-animation coal";
    coal.textContent = "\u26AB"; // Black circle for coal
    coal.style.left = "30%";
    coal.style.top = "30%";
    screen.appendChild(coal);
  }, 300);

  setTimeout(() => {
    // Another snowball
    const snowball2 = document.createElement("div");
    snowball2.className = "attack-animation snowball";
    snowball2.textContent = "🥶";
    snowball2.style.left = "60%";
    snowball2.style.top = "50%";
    screen.appendChild(snowball2);
  }, 500);

  setTimeout(() => {
    // Grinch appears!
    const grinch = document.createElement("div");
    grinch.className = "attack-animation grinch";
    grinch.textContent = "👹";
    grinch.style.left = "50%";
    grinch.style.top = "60%";
    grinch.style.transform = "translateX(-50%)";
    screen.appendChild(grinch);
  }, 800);

  // Clean up after animations
  setTimeout(clearAnimations, 3000);
}

socket.on("show-leaderboard", (data) => {
  // Find player's rank
  const playerIndex = data.players.findIndex(
    (p) => p.name === playerState.name
  );
  const rank = playerIndex + 1;

  document.getElementById("rank-display").textContent = `#${rank}`;
  document.getElementById(
    "rank-score"
  ).textContent = `${playerState.score} pts`;

  showScreen("rank-screen");
});

socket.on("game-over", (data) => {
  // Find player's final rank
  const playerIndex = data.players.findIndex(
    (p) => p.name === playerState.name
  );
  const rank = playerIndex + 1;

  // Update final screen
  if (rank === 1) {
    document.getElementById("final-icon").textContent = "🎅";
    document.getElementById("final-text").textContent = "Santa's Helper!";
    playVictorySound(); // Play victory sound for winner
  } else if (rank === 2) {
    document.getElementById("final-icon").textContent = "🦌";
    document.getElementById("final-text").textContent = "Nice Reindeer!";
    playLeaderboardSound();
  } else if (rank === 3) {
    document.getElementById("final-icon").textContent = "⛄";
    document.getElementById("final-text").textContent = "Cool Snowman!";
    playLeaderboardSound();
  } else {
    document.getElementById("final-icon").textContent = "🎄";
    document.getElementById("final-text").textContent = "Merry Quizmas!";
    playResultsSound();
  }

  document.getElementById("final-rank").textContent = `#${rank}`;
  document.getElementById(
    "final-score"
  ).textContent = `${playerState.score} pts`;

  showScreen("final-screen");
});

socket.on("game-ended", (data) => {
  document.getElementById("disconnect-reason").textContent =
    data.reason || "Game ended";
  showScreen("disconnected-screen");
});

socket.on("disconnect", () => {
  document.getElementById("disconnect-reason").textContent =
    "Lost connection to server";
  showScreen("disconnected-screen");
});

// Allow Enter key to submit
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("game-code-input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("player-name-input").focus();
      }
    });

  document
    .getElementById("player-name-input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        joinGame();
      }
    });
});
