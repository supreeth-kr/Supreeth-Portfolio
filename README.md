# Supreeth K R — Personal Portfolio Website

A modern, high-performance personal portfolio showcasing projects, technical skills, creative designs, and professional experience. Built with clean semantic HTML5, modern vanilla CSS, responsive interactive JavaScript, HTML5 Canvas particle system, and Web Audio API synthesis.

---

## 🚀 Live Demo & Preview

- **Local Development**: `http://localhost:3000`
- **GitHub Profile**: [@supreeth-kr](https://github.com/supreeth-kr)
- **LinkedIn**: [Supreeth K R](https://linkedin.com/in/supreeth-k-r)

---

## ✨ Features

- **Interactive Canvas Mesh Background**: Dynamic particle constellation network reacting to cursor proximity and theme hue.
- **Web Audio API Sound Synthesis**: Custom synthesized audio feedback for UI actions (toggleable ON/OFF).
- **Multi-Palette Theme Switcher**: 5 curated theme options (Cyber Violet, Electric Cyan, Neon Mint, Sunset Amber, Radiant Rose) with persistent state in `localStorage`.
- **Project Showcase**: Detailed cards for key projects including:
  - **Eventra**: Full-stack event management dashboard with ticket booking & attendee analytics.
  - **Hirevo**: AI-powered freelance marketplace with smart delay detection & penalty calculation.
  - **SkillMatch**: AI-powered resume parsing and ATS skill-matching platform.
  - **Creative Design Reel**: Multimedia design & video editing portfolio.
- **Interactive Resume Modal**: Integrated ATS-friendly resume viewer with direct PDF download and print options.
- **Zero-Dependency Local Server**: Built-in Node.js server (`serve.js`) handling MIME types, URL decoding, and clean routing without heavy third-party packages.
- **VS Code Debugging**: Pre-configured `launch.json` and `tasks.json` with single-key (`F5`) server and browser startup.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Modern Vanilla CSS (Glassmorphism, CSS Custom Properties), JavaScript (ES6+)
- **Graphics & Audio**: HTML5 Canvas API, Web Audio API
- **Icons & Typography**: Font Awesome 6, Google Fonts (*Outfit* & *Space Grotesk*)
- **Backend / Dev Server**: Node.js HTTP Server (`serve.js`)

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supreeth-kr/supreeth-portfolio.git
   cd supreeth-portfolio
   ```

2. **Start the local server:**
   ```bash
   npm start
   ```
   *Alternatively:*
   ```bash
   node serve.js
   ```

3. **Open in your browser:**
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```
Portfolio/
├── .vscode/
│   ├── launch.json          # VS Code debug & run configurations
│   └── tasks.json           # Automated server pre-launch task
├── assets/
│   ├── images/              # Project screenshots & avatar
│   └── Supreeth_K_R_Resume.pdf
├── css/
│   └── style.css            # Design system, themes & animations
├── js/
│   ├── canvas-bg.js         # Interactive particle network
│   └── main.js              # Theme switcher, sound, modal & UI logic
├── favicon.svg              # Vector favicon
├── index.html               # Main portfolio landing page
├── package.json             # NPM scripts and metadata
├── serve.js                 # Local Node.js static file server
└── README.md                # Project documentation
```

---

## 📬 Contact & Connect

- **Email**: [ssupreeth989@gmail.com](mailto:ssupreeth989@gmail.com)
- **LinkedIn**: [linkedin.com/in/supreeth-k-r](https://linkedin.com/in/supreeth-k-r)
- **GitHub**: [github.com/supreeth-kr](https://github.com/supreeth-kr)
