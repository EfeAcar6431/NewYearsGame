# 🎉 New Year's Party Games

A collection of fun party games perfect for New Year's Eve celebrations or any gathering with friends and family!

## 🎮 Games Included

### 1. Impostor Game (Main)
A social deduction game inspired by Spyfall and Among Us. One player is secretly the "impostor" who doesn't know the character everyone else is discussing.

**How to Play:**
1. Enter the number of players (3-12)
2. Add player names
3. Choose a character category (Movies, Anime, TV Shows, Video Games, etc.)
4. Pass the device around - each player sees their role privately
5. One player is the **Impostor** who only knows the category
6. Other players see the **character name and source**
7. Discuss, ask questions, and try to identify who doesn't know the character!
8. Vote on who you think the impostor is
9. Reveal and see who wins!

**Features:**
- 🎭 14 character categories with 300+ characters
- 📊 Persistent scoreboard & player statistics
- 🏆 Player leaderboard tracking wins/losses
- 📜 Game history (last 50 games)
- ⏱️ Auto-hide timer for role reveals
- 🎄 Holiday-themed UI

### 2. Kahoot Multiplayer
A real-time multiplayer quiz game similar to Kahoot! Host a game on one device while players join from their phones.

**How to Play:**
1. Start the server: `npm start` in the `kahoot-multiplayer` folder
2. Host opens: `http://localhost:3000/host.html`
3. Players join using the game code on their phones
4. Answer questions as fast as possible for maximum points!

**Features:**
- 📱 Mobile-friendly player interface
- 🏃 Real-time scoring with speed bonuses
- 🔥 Answer streak multipliers
- 📚 9 quiz categories with 20 questions each:
  - General Knowledge
  - Movies
  - Science
  - Geography
  - Sports
  - Music
  - History
  - Gaming
  - Food

## 🚀 Quick Start

### Impostor Game (No Setup Required)
Simply open `index.html` in your browser!

```bash
# Or use a local server
npx serve .
```

### Kahoot Multiplayer
```bash
cd kahoot-multiplayer
npm install
npm start
```

Then:
- **Host:** Open http://localhost:3000/host.html
- **Players:** Connect to the IP shown (e.g., http://192.168.1.x:3000)

## 📁 Project Structure

```
NewYearsGame/
├── index.html          # Impostor Game - main page
├── game.js             # Impostor Game - logic
├── styles.css          # Impostor Game - styling
├── kahoot.html         # Single-player Kahoot (standalone)
├── kahoot.js           # Single-player Kahoot logic
├── kahoot.css          # Single-player Kahoot styling
└── kahoot-multiplayer/ # Multiplayer Kahoot
    ├── server.js       # Express + Socket.io server
    ├── package.json
    └── public/
        ├── index.html  # Player join page
        ├── host.html   # Host dashboard
        ├── player.js   # Player client logic
        ├── host.js     # Host client logic
        ├── questions.js# Quiz questions database
        └── *.css       # Stylesheets
```

## 🎨 Themes & Design

- **Impostor Game:** Cyberpunk/retro aesthetic with neon glows, scanlines, and holiday touches
- **Kahoot Multiplayer:** Vibrant, colorful design optimized for party atmospheres

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend (Kahoot):** Node.js, Express, Socket.io
- **Data:** 
  - Characters from [NousResearch/CharacterCodex](https://huggingface.co/datasets/NousResearch/CharacterCodex) (with fallback)
  - 180 hand-crafted quiz questions

## 📱 Device Support

- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ Tablets
- ✅ Works offline (Impostor Game)

## 🎯 Tips for Hosting

1. **Impostor Game:** Use one device and pass it around, or cast to a TV
2. **Kahoot Multiplayer:** Host device on TV/monitor, players use their phones
3. Best played with 4-10 players
4. Keep discussions lively - the impostor should try to blend in!

## 📄 License

MIT License - Feel free to use and modify for your own parties!

---

**Have fun and Happy New Year! 🎆🥳**

