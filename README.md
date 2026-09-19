# 💻 nerdy-site // Nagul's Terminal Portfolio

> A highly stylized personal portfolio transformed into an interactive Linux terminal & developer workstation dashboard.

[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📸 Aesthetic & Concept

Inspired by customized Linux rices (Hyprland / i3 / bspwm), `fastfetch`/`neofetch`, and modern developer terminal dashboards:

- **Monospace Typography:** JetBrains Mono & IBM Plex Mono.
- **Catppuccin & Tokyo Night Palettes:** Deep charcoal `#0D0F18` canvas with pastel terminal accents (cyan `#8BE9FD`, purple `#CBA6F7`, pink `#F5C2E7`, green `#A6E3A1`, yellow `#F9E2AF`).
- **Neofetch System Information:** Real-time spec inspection with multi-mode ASCII art switcher (`Rig`, `Dev`, `Bot`).
- **Directory Tree Projects (`ls ~/projects`):** Terminal directory hierarchy cards with hover glow and inspect drawer.
- **Progress Block Skills (`./skills.sh`):** Unicode block bars (`██████████░░`) with honest proficiency markers.
- **Git Commit Log (`git log --oneline`):** Interactive git commit history with expandable diff previews and a contribution activity heatmap.
- **Music Widget (cmus / mpd inspired):** Synthesized lo-fi chill synthwave chords generated directly with the Web Audio API, animated ASCII equalizer bars, and track controls.
- **Interactive Floating Terminal CLI:** A functional in-browser terminal emulator accessible via `Ctrl + ~` or floating badge that accepts `help`, `projects`, `about`, `skills`, `matrix`, `theme`, `uptime`, `whoami`, etc.
- **CRT Scanline & Matrix Rain Overlays:** Built-in retro effects toggleable directly from the status bar.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Architecture

```
nerdy-site/
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx            # > cat about.txt (with tabbed file buffers)
│   │   ├── BrandIcons.tsx              # Clean SVG icons (GitHub, LinkedIn, Instagram)
│   │   ├── ContactSection.tsx          # > echo "Let's build something" transmission form
│   │   ├── GitHubSection.tsx           # > git log --oneline & commit activity heatmap
│   │   ├── HeroSystemInfo.tsx          # Neofetch system info + ASCII art switcher
│   │   ├── InteractiveTerminalModal.tsx# Floating interactive Linux CLI shell
│   │   ├── MatrixRain.tsx              # Canvas-based green digital rain overlay
│   │   ├── NowPlayingWidget.tsx        # Terminal music player with Web Audio synthesizer
│   │   ├── ProjectsSection.tsx         # > ls ~/projects directory tree cards
│   │   ├── SkillsSection.tsx           # > ./skills.sh progress blocks & badge matrix
│   │   ├── TerminalFooter.tsx          # Tmux powerline statusline & exit sequence
│   │   └── TerminalHeader.tsx          # Terminal ASCII frame header & navigation
│   ├── data/
│   │   └── portfolioData.ts            # Centralized portfolio data, specs, & projects
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces
│   ├── utils/
│   │   └── audio.ts                    # Web Audio synthesizer for keyclicks & ambient synth
│   ├── App.tsx                         # Main terminal application layout & state
│   ├── index.css                       # Tailwind v4, CRT overlay, terminal styles
│   └── main.tsx                        # React application entry point
├── package.json
└── vite.config.ts
```

---

## ⌨️ Keyboard Shortcuts

- `~` or `Ctrl + ~`: Toggle the interactive terminal CLI drawer
- `Esc`: Close terminal modal or exit Matrix digital rain
- `Tab`: Auto-complete commands inside the terminal CLI
- `↑ / ↓`: Cycle through command history

---

## 👤 Author

**Nagul**
- GitHub: [@Nagul08](https://github.com/Nagul08)
- Repository: [Nagul08/nerdy-site](https://github.com/Nagul08/nerdy-site.git)
- Email: [nagul.dev@gmail.com](mailto:nagul.dev@gmail.com)
