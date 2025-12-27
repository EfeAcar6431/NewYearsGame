// Sound System using Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let isMuted = false;

// Initialize audio context on first user interaction
function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Mute toggle
function toggleMute() {
  isMuted = !isMuted;
  return isMuted;
}

// Toggle sound button
function toggleSound() {
  initAudio();
  const muted = toggleMute();
  const btn = document.getElementById("mute-btn");
  btn.textContent = muted ? "🔇" : "🔊";
  if (!muted) {
    playSelectSound(); // Play a sound to confirm unmute
  }
}

// Play a tone
function playTone(frequency, duration, type = "sine", volume = 0.3) {
  if (isMuted || !audioCtx) return;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioCtx.currentTime + duration
  );

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

// Play a sequence of notes
function playSequence(notes, tempo = 150) {
  if (isMuted || !audioCtx) return;

  notes.forEach((note, index) => {
    setTimeout(() => {
      if (note.freq) {
        playTone(
          note.freq,
          note.duration || 0.2,
          note.type || "sine",
          note.volume || 0.3
        );
      }
    }, index * tempo);
  });
}

// === SOUND EFFECTS ===

// Lobby waiting music (looping background)
let lobbyInterval = null;
function playLobbyMusic() {
  initAudio();
  if (lobbyInterval) return;

  const melody = [
    { freq: 523.25 }, // C5
    { freq: 587.33 }, // D5
    { freq: 659.25 }, // E5
    { freq: 523.25 }, // C5
    { freq: 0 }, // rest
    { freq: 659.25 }, // E5
    { freq: 698.46 }, // F5
    { freq: 783.99 }, // G5
  ];

  let noteIndex = 0;
  lobbyInterval = setInterval(() => {
    if (melody[noteIndex].freq > 0) {
      playTone(melody[noteIndex].freq, 0.15, "triangle", 0.15);
    }
    noteIndex = (noteIndex + 1) % melody.length;
  }, 300);
}

function stopLobbyMusic() {
  if (lobbyInterval) {
    clearInterval(lobbyInterval);
    lobbyInterval = null;
  }
}

// Countdown beep (3, 2, 1)
function playCountdownBeep(number) {
  initAudio();
  if (number > 1) {
    playTone(880, 0.1, "sine", 0.4);
  } else {
    // Final beep is higher
    playTone(1320, 0.2, "sine", 0.5);
  }
}

// Question appear sound
function playQuestionSound() {
  initAudio();
  playSequence(
    [
      { freq: 392, duration: 0.1 }, // G4
      { freq: 523.25, duration: 0.1 }, // C5
      { freq: 659.25, duration: 0.2 }, // E5
    ],
    80
  );
}

// Timer tick (last 5 seconds)
function playTickSound() {
  initAudio();
  playTone(1000, 0.05, "square", 0.2);
}

// Answer selected
function playSelectSound() {
  initAudio();
  playTone(600, 0.1, "sine", 0.3);
}

// Correct answer
function playCorrectSound() {
  initAudio();
  playSequence(
    [
      { freq: 523.25, duration: 0.1, volume: 0.4 }, // C5
      { freq: 659.25, duration: 0.1, volume: 0.4 }, // E5
      { freq: 783.99, duration: 0.2, volume: 0.4 }, // G5
      { freq: 1046.5, duration: 0.3, volume: 0.4 }, // C6
    ],
    100
  );
}

// Wrong answer
function playWrongSound() {
  initAudio();
  playSequence(
    [
      { freq: 200, duration: 0.2, type: "sawtooth", volume: 0.3 },
      { freq: 150, duration: 0.3, type: "sawtooth", volume: 0.3 },
    ],
    200
  );
}

// Time's up
function playTimeUpSound() {
  initAudio();
  playSequence(
    [
      { freq: 400, duration: 0.15, type: "square", volume: 0.4 },
      { freq: 350, duration: 0.15, type: "square", volume: 0.4 },
      { freq: 300, duration: 0.3, type: "square", volume: 0.4 },
    ],
    150
  );
}

// Results reveal
function playResultsSound() {
  initAudio();
  playSequence(
    [
      { freq: 392, duration: 0.15 }, // G4
      { freq: 440, duration: 0.15 }, // A4
      { freq: 523.25, duration: 0.2 }, // C5
    ],
    120
  );
}

// Leaderboard reveal (dramatic)
function playLeaderboardSound() {
  initAudio();
  playSequence(
    [
      { freq: 261.63, duration: 0.15, volume: 0.3 }, // C4
      { freq: 329.63, duration: 0.15, volume: 0.3 }, // E4
      { freq: 392, duration: 0.15, volume: 0.35 }, // G4
      { freq: 523.25, duration: 0.3, volume: 0.4 }, // C5
    ],
    150
  );
}

// Player joins
function playJoinSound() {
  initAudio();
  playSequence(
    [
      { freq: 880, duration: 0.08, volume: 0.25 },
      { freq: 1100, duration: 0.1, volume: 0.25 },
    ],
    80
  );
}

// Victory fanfare
function playVictorySound() {
  initAudio();
  playSequence(
    [
      { freq: 523.25, duration: 0.15, volume: 0.4 }, // C5
      { freq: 523.25, duration: 0.15, volume: 0.4 }, // C5
      { freq: 523.25, duration: 0.15, volume: 0.4 }, // C5
      { freq: 523.25, duration: 0.4, volume: 0.4 }, // C5
      { freq: 415.3, duration: 0.3, volume: 0.4 }, // Ab4
      { freq: 466.16, duration: 0.3, volume: 0.4 }, // Bb4
      { freq: 523.25, duration: 0.2, volume: 0.4 }, // C5
      { freq: 0 }, // rest
      { freq: 466.16, duration: 0.15, volume: 0.4 }, // Bb4
      { freq: 523.25, duration: 0.5, volume: 0.5 }, // C5
    ],
    150
  );
}

// Game start
function playGameStartSound() {
  initAudio();
  stopLobbyMusic();
  playSequence(
    [
      { freq: 392, duration: 0.1, volume: 0.4 },
      { freq: 523.25, duration: 0.1, volume: 0.4 },
      { freq: 659.25, duration: 0.1, volume: 0.4 },
      { freq: 783.99, duration: 0.15, volume: 0.4 },
      { freq: 1046.5, duration: 0.3, volume: 0.5 },
    ],
    100
  );
}

// Streak sound
function playStreakSound(streak) {
  initAudio();
  const baseFreq = 523.25 + streak * 50;
  playSequence(
    [
      { freq: baseFreq, duration: 0.1, volume: 0.3 },
      { freq: baseFreq * 1.25, duration: 0.1, volume: 0.35 },
      { freq: baseFreq * 1.5, duration: 0.15, volume: 0.4 },
    ],
    70
  );
}

// Background music during question (tense)
let questionMusicInterval = null;
function playQuestionMusic() {
  initAudio();
  if (questionMusicInterval) return;

  let beat = 0;
  questionMusicInterval = setInterval(() => {
    const freq = beat % 2 === 0 ? 150 : 130;
    playTone(freq, 0.1, "triangle", 0.1);
    beat++;
  }, 500);
}

function stopQuestionMusic() {
  if (questionMusicInterval) {
    clearInterval(questionMusicInterval);
    questionMusicInterval = null;
  }
}

// Initialize on any click/touch
document.addEventListener("click", initAudio, { once: true });
document.addEventListener("touchstart", initAudio, { once: true });

console.log("🔊 Sound system loaded");
