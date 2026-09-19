import type { Project, GitCommit, AudioTrack } from '../types'

export const SYSTEM_INFO = {
  user: 'Nagul',
  officialName: 'Siva Kowsik S',
  username: 'retr0',
  host: 'portfolio',
  title: 'Computer Science Engineering Student',
  status: 'ONLINE',
  ping: '18ms',
  specs: [
    { label: 'OS', value: 'Windows 11 (Dev Channel)', icon: 'Terminal' },
    { label: 'Kernel', value: 'Developer Mode / WSL2 Ubuntu 24.04', icon: 'Cpu' },
    { label: 'CPU', value: 'Computer Science Engineering (Second Year)', icon: 'GraduationCap' },
    { label: 'Shell', value: 'PowerShell 7.4 / zsh 5.9', icon: 'Code2' },
    { label: 'Editor', value: 'VS Code + Neovim (NvChad)', icon: 'FileCode' },
    { label: 'Uptime', value: 'Building cool stuff since 2008', icon: 'Clock' },
    { label: 'Location', value: 'Chennai, India (UTC+5:30)', icon: 'MapPin' },
    { label: 'Memory', value: '16.0 GiB (7.2 GiB Coffee + RAM)', icon: 'Database' },
  ],
  statuses: [
    { text: 'Available for projects', type: 'success', color: '#A6E3A1' },
    { text: 'Learning continuously', type: 'info', color: '#89B4FA' },
    { text: 'Currently building', type: 'warning', color: '#F9E2AF' },
  ],
  neofetchColors: [
    { name: 'black', hex: '#1E2030' },
    { name: 'red', hex: '#F38BA8' },
    { name: 'green', hex: '#A6E3A1' },
    { name: 'yellow', hex: '#F9E2AF' },
    { name: 'blue', hex: '#89B4FA' },
    { name: 'purple', hex: '#CBA6F7' },
    { name: 'cyan', hex: '#8BE9FD' },
    { name: 'white', hex: '#D8DEE9' },
  ],
}

export const ASCII_ARTS = {
  developer: `
       .---.
      /     \\
     | () () |
      \\  -  /
     .-'---'-.
    /   DEV   \\
   | |     | |
   | |     | |
   (_|     |_)
      |___|
     (_____)
  [ retr0@workstation ]
`,
  cyberRig: `
  .-------------------------------------.
  | [x] ~/workspace/terminal            |
  |-------------------------------------|
  |  >_ RETR0.DEV                       |
  |     ┌──────────────────────────┐    |
  |     │ █   █   █   █   █   █    │    |
  |     │  SYSTEM READY: 100% OK   │    |
  |     └──────────────────────────┘    |
  |  [CSE '29] [CYBERSEC] [BUILDER]     |
  '-------------------------------------'
        \\                     /
         \\___________________/
            [=============]
           (_______________)
`,
  abstractBot: `
      .----------------.
     /  .-.  .-.   .---.|
    |  ( @ ) ( @ ) | # ||
    |   '-'   '-'  '---'|
    |      ___          |
    |    /|||||\\        |
     \\  '-------'      /
      '---------------'
        | |       | |
      .-' '-.   .-' '-.
     '-------' '-------'
  < ready_to_compile_future />
`,
}

export const PROJECTS: Project[] = [
  {
    id: 'nerdy-site',
    name: 'nerdy-site',
    folder: 'nerdy-site',
    tagline: 'Linux terminal rice & developer workstation personal portfolio',
    description:
      'A highly stylized personal portfolio transformed into a customized developer terminal interface with fastfetch system info, interactive CLI modal, directory tree explorer, Web Audio synthesizer, and retro themes.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web Audio API'],
    category: 'web',
    githubUrl: 'https://github.com/Nagul08/nerdy-site.git',
    liveUrl: 'https://nagul08.github.io/nerdy-site/',
    stars: 54,
    commits: 28,
    featured: true,
    stats: {
      language: 'TypeScript / React',
      linesOfCode: '3.6k lines',
      version: 'v1.0.0',
    },
  },
  {
    id: 'devpulse',
    name: 'devpulse-telemetry',
    folder: 'devpulse-telemetry',
    tagline: 'Real-time WebSocket server health & telemetry dashboard',
    description:
      'High-performance system telemetry agent and web dashboard that monitors CPU, memory, event loop latency, and network I/O with ASCII sparklines and live WebSocket streaming.',
    tech: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Chart.js', 'Tailwind'],
    category: 'web',
    githubUrl: 'https://github.com/Nagul08/devpulse-telemetry',
    liveUrl: 'https://devpulse.demo.nagul.dev',
    stars: 48,
    commits: 64,
    featured: true,
    stats: {
      language: 'TypeScript / React',
      linesOfCode: '4.8k lines',
      version: 'v1.4.2',
    },
  },
  {
    id: 'bytevibe',
    name: 'bytevibe-interactive-shell',
    folder: 'bytevibe-interactive-shell',
    tagline: 'In-browser terminal emulator & JavaScript AST execution visualizer',
    description:
      'Educational terminal simulator built to visualize lexical analysis, token trees, and AST evaluation in real-time. Features custom piping, command execution, and pseudo-filesystem in IndexedDB.',
    tech: ['TypeScript', 'React', 'Web Workers', 'Babel Parser', 'Xterm.js'],
    category: 'tools',
    githubUrl: 'https://github.com/Nagul08/bytevibe-interactive-shell',
    liveUrl: 'https://bytevibe.demo.nagul.dev',
    stars: 82,
    commits: 93,
    featured: true,
    stats: {
      language: 'TypeScript',
      linesOfCode: '6.2k lines',
      version: 'v2.1.0',
    },
  },
  {
    id: 'cachecraft',
    name: 'cachecraft-distributed-kv',
    folder: 'cachecraft-distributed-kv',
    tagline: 'Fault-tolerant in-memory key-value store with consistent hashing',
    description:
      'Distributed key-value store implementation featuring LRU cache eviction, write-ahead logging (WAL), snapshotting, and HTTP REST interface for low-latency node clustering.',
    tech: ['Python', 'FastAPI', 'Consistent Hashing', 'AsyncIO', 'Docker'],
    category: 'systems',
    githubUrl: 'https://github.com/Nagul08/cachecraft-distributed-kv',
    stars: 35,
    commits: 41,
    featured: true,
    stats: {
      language: 'Python 3.12',
      linesOfCode: '3.1k lines',
      version: 'v0.9.4',
    },
  },
  {
    id: 'neuralcanvas',
    name: 'neuralcanvas-ai',
    folder: 'neuralcanvas-ai',
    tagline: 'Local multimodal workspace for code explanation & architecture diagrams',
    description:
      'Developer workspace integrating local LLMs with Mermaid.js diagram synthesis. Converts raw system architecture code into visual sequence charts and interactive flow diagrams.',
    tech: ['React', 'Python', 'Ollama', 'Mermaid.js', 'FastAPI', 'Tailwind'],
    category: 'ai',
    githubUrl: 'https://github.com/Nagul08/neuralcanvas-ai',
    liveUrl: 'https://neuralcanvas.demo.nagul.dev',
    stars: 59,
    commits: 78,
    stats: {
      language: 'Python / React',
      linesOfCode: '5.5k lines',
      version: 'v1.2.0',
    },
  },
  {
    id: 'hypr-rice',
    name: 'hypr-rice-dotfiles',
    folder: 'hypr-rice-dotfiles',
    tagline: 'Custom Linux Wayland desktop environment & development workflow',
    description:
      'Curated dotfiles for Hyprland, Waybar, Rofi, Neovim, and Kitty terminal. Includes dynamic Catppuccin color scheme generation, automated battery optimizations, and workspace switcher scripts.',
    tech: ['Bash', 'Lua', 'Wayland / Hyprland', 'CSS', 'Linux'],
    category: 'tools',
    githubUrl: 'https://github.com/Nagul08/hypr-rice-dotfiles',
    stars: 124,
    commits: 112,
    stats: {
      language: 'Bash / Lua',
      linesOfCode: '2.4k lines',
      version: 'v3.0.1',
    },
  },
  {
    id: 'algotrace',
    name: 'algotrace-visualizer',
    folder: 'algotrace-visualizer',
    tagline: 'Interactive CS algorithm & data structure execution tracer',
    description:
      'Interactive sandbox for visualizing graph pathfinding (Dijkstra, A*), sorting algorithms, dynamic programming tables, and virtual memory paging page replacement policies.',
    tech: ['React', 'JavaScript', 'HTML5 Canvas', 'Tailwind CSS'],
    category: 'web',
    githubUrl: 'https://github.com/Nagul08/algotrace-visualizer',
    liveUrl: 'https://algotrace.demo.nagul.dev',
    stars: 41,
    commits: 36,
    stats: {
      language: 'JavaScript / React',
      linesOfCode: '3.9k lines',
      version: 'v1.0.8',
    },
  },
]

export const SKILL_PROGRESS = [
  {
    category: 'Frontend',
    progressBlocks: '███████████████░░',
    percentage: 85,
    highlightTech: 'React / TypeScript',
    level: 'working with' as const,
    color: '#8BE9FD', // cyan
  },
  {
    category: 'Backend',
    progressBlocks: '████████████░░░░░',
    percentage: 70,
    highlightTech: 'Node.js / Express',
    level: 'working with' as const,
    color: '#A6E3A1', // green
  },
  {
    category: 'Python',
    progressBlocks: '██████████████░░░',
    percentage: 80,
    highlightTech: 'Python / FastAPI',
    level: 'working with' as const,
    color: '#F9E2AF', // yellow
  },
  {
    category: 'Database',
    progressBlocks: '███████████░░░░░░',
    percentage: 65,
    highlightTech: 'MongoDB / MySQL',
    level: 'familiar with' as const,
    color: '#F5C2E7', // pink
  },
  {
    category: 'Git',
    progressBlocks: '███████████████░░',
    percentage: 88,
    highlightTech: 'Git / GitHub CI',
    level: 'working with' as const,
    color: '#CBA6F7', // purple
  },
  {
    category: 'CyberSec & Linux',
    progressBlocks: '████████████░░░░░',
    percentage: 72,
    highlightTech: 'Linux / Security / Bash',
    level: 'currently learning' as const,
    color: '#89B4FA', // blue
  },
]

export const SKILL_BADGES = [
  { name: 'Python', category: 'language', color: '#F9E2AF', exp: 'Academic & Projects' },
  { name: 'HTML', category: 'frontend', color: '#FAB387', exp: 'Semantic web' },
  { name: 'CSS', category: 'frontend', color: '#89B4FA', exp: 'Modern CSS & Animations' },
  { name: 'JavaScript', category: 'language', color: '#F9E2AF', exp: 'ES6+ Deep Dive' },
  { name: 'React', category: 'frontend', color: '#8BE9FD', exp: 'Component Architecture' },
  { name: 'Node.js', category: 'backend', color: '#A6E3A1', exp: 'Async I/O & REST APIs' },
  { name: 'MongoDB', category: 'database', color: '#A6E3A1', exp: 'Document Stores' },
  { name: 'MySQL', category: 'database', color: '#89B4FA', exp: 'Relational Schema Design' },
  { name: 'Git', category: 'tools', color: '#F38BA8', exp: 'Version Control & Rebasing' },
  { name: 'GitHub', category: 'tools', color: '#CBA6F7', exp: 'Actions, PRs & Reviews' },
  { name: 'TypeScript', category: 'language', color: '#89B4FA', exp: 'Strict Typing' },
  { name: 'Docker', category: 'tools', color: '#8BE9FD', exp: 'Containerization' },
  { name: 'Linux', category: 'systems', color: '#FAB387', exp: 'Bash scripting & Arch' },
  { name: 'C / C++', category: 'systems', color: '#CBA6F7', exp: 'Data Structures & Pointers' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#8BE9FD', exp: 'Utility-First UI' },
]

export const GIT_COMMITS: GitCommit[] = [
  {
    hash: 'abc1234',
    message: 'feat(nerdy-site): launch customized terminal dashboard personal portfolio',
    author: 'retr0 <sivphax08@gmail.com>',
    date: 'Just now',
    branch: 'main',
    changes: { added: 1420, removed: 0 },
    diffSnippet: `+  export default function App() {\n+    return <TerminalDashboard config="Nagul08/nerdy-site" user="retr0" />;\n+  }`,
  },
  {
    hash: '91fa221',
    message: 'refactor(terminal): optimize command parser and auto-suggestion trie',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '1 day ago',
    branch: 'main',
    changes: { added: 84, removed: 35 },
    diffSnippet: `+  class TrieNode {\n+    children = new Map<string, TrieNode>();\n+    isEndOfCommand = false;\n+  }`,
  },
  {
    hash: '72bc981',
    message: 'perf(cache): achieve O(1) LRU eviction with doubly linked hash map',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '3 days ago',
    branch: 'feat/lru-optimization',
    changes: { added: 215, removed: 89 },
    diffSnippet: `+  def _remove_node(self, node: Node) -> None:\n+      node.prev.next = node.next\n+      node.next.prev = node.prev\n+      del self.lookup_table[node.key]`,
  },
  {
    hash: 'e45b809',
    message: 'docs(readme): add interactive architectural diagram and benchmarks',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '5 days ago',
    branch: 'main',
    changes: { added: 76, removed: 12 },
    diffSnippet: `+  ### Performance Benchmarks (P99 Latency)\n+  - Sequential Reads: 0.18ms\n+  - Clustered Replications: 1.42ms`,
  },
  {
    hash: '3f89a1c',
    message: 'fix(net): handle graceful websocket reconnection backoff algorithm',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '1 week ago',
    branch: 'main',
    changes: { added: 43, removed: 19 },
    diffSnippet: `+  const delay = Math.min(1000 * Math.pow(2, retryAttempt), 30000);\n+  retryTimeout = setTimeout(reconnect, delay + Math.random() * 500);`,
  },
  {
    hash: '6c10e42',
    message: 'init(repo): initialize nerdy-site workspace with Vite + React 19',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '2 weeks ago',
    branch: 'main',
    changes: { added: 340, removed: 0 },
    diffSnippet: `+  npm create vite@latest nerdy-site -- --template react-ts`,
  },
]

export const SOCIAL_LINKS = [
  {
    id: 'github',
    platform: 'GitHub',
    command: '$ connect --github',
    url: 'https://github.com/Nagul08',
    handle: '@Nagul08',
    desc: 'Explore open source code & dotfiles',
    icon: 'Github',
    color: '#8BE9FD',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    command: '$ connect --linkedin',
    url: 'https://www.linkedin.com/in/siva-kowsik-s-b490b437b/',
    handle: 'in/siva-kowsik-s',
    desc: 'Connect professionally & career updates',
    icon: 'Linkedin',
    color: '#89B4FA',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    command: '$ connect --instagram',
    url: 'https://instagram.com/nagul_08_x_',
    handle: '@nagul_08_x_',
    desc: 'Dev setups, tech desk rices & stories',
    icon: 'Instagram',
    color: '#F5C2E7',
  },
  {
    id: 'discord',
    platform: 'Discord',
    command: '$ connect --discord',
    url: 'https://discord.com/users/itz_nagul_08_',
    handle: 'itz_nagul_08_',
    desc: 'Chat about code, systems & Linux',
    icon: 'MessageSquare',
    color: '#CBA6F7',
  },
  {
    id: 'email',
    platform: 'Email',
    command: '$ connect --email',
    url: 'mailto:sivphax08@gmail.com',
    handle: 'sivphax08@gmail.com',
    desc: 'Direct email transmission for opportunities',
    icon: 'Mail',
    color: '#A6E3A1',
  },
]

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Resonance',
    artist: 'HOME',
    album: 'Odyssey (Terminal Edition)',
    duration: 212,
    bpm: 105,
    genre: 'Synthwave / Chillwave',
  },
  {
    id: 'track-2',
    title: 'Cyber Drifter',
    artist: 'Nagul & Lorn Soundscapes',
    album: 'Deep Hack Mode Vol. 2',
    duration: 185,
    bpm: 88,
    genre: 'Downtempo Cyberpunk',
  },
  {
    id: 'track-3',
    title: 'Midnight Compiler',
    artist: 'Lo-Fi Coding Beats',
    album: 'Night Owls at Sri Sairam',
    duration: 240,
    bpm: 78,
    genre: 'Lo-Fi Ambient',
  },
  {
    id: 'track-4',
    title: 'Kernel Panic Symphony',
    artist: 'Master Boot Record',
    album: 'C:/DOS/RUN',
    duration: 198,
    bpm: 130,
    genre: 'Chiptune / Darksynth',
  },
]

export const ABOUT_TABS = [
  {
    file: 'about.txt',
    label: 'about.txt',
    content: `Hi, I'm Siva Kowsik S -AKA- Nagul.

I'm a Computer Science Engineering student who enjoys
building things for the web, experimenting with technology,
and occasionally breaking perfectly functional systems
just to understand why they work.

When I'm not writing code, you'll find me cranking my Linux
development setup, surfing cyber security sites, testing new
developer tools, or researching how operating systems handle
memory and scheduling behind the scenes or just penetrating (systems).`,
    meta: '-rw-r--r-- 1 retr0 staff 512B Sep 19 15:51 about.txt',
  },
  {
    file: 'education.json',
    label: 'education.json',
    content: `{
  "officialName": "Siva Kowsik S",
  "preferredName": "Nagul",
  "institution": "Sri Sairam Engineering College",
  "degree": "B.E. CSE",
  "major": "Computer Science & Engineering",
  "expectedGraduation": "2029",
  "keyCourses": [
    "Cyber Security",
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks"
  ],
  "standing": "Second Year Engineering",
  "activities": [
    "Cyber Security Research & CTFs",
    "Linux Systems Customization",
    "Full-Stack Web Development"
  ]
}`,
    meta: '-rw-r--r-- 1 retr0 staff 620B Sep 19 15:51 education.json',
  },
  {
    file: 'philosophy.md',
    label: 'philosophy.md',
    content: `# Engineering & Security Philosophy

1. **Break to Understand:** The best way to secure or build a system is to understand how it breaks under pressure.
2. **Depth over surface:** Inspect the source code, trace the network packets, and analyze system calls.
3. **Keyboard-first Ergonomics:** Speed in thought requires speed in tooling. Monospace fonts, vim keybindings, and automated dotfiles.
4. **Resilience & Fault Tolerance:** Build defensive systems that anticipate failures and malicious vectors gracefully.`,
    meta: '-rw-r--r-- 1 retr0 staff 640B Sep 19 15:51 philosophy.md',
  },
  {
    file: 'workstation.conf',
    label: 'workstation.conf',
    content: `[hardware]
machine   = Asus / Custom Workstation
cpu       = Multi-Core Developer Rig
ram       = 16GB DDR5 High-Speed Memory
display   = High-Refresh Developer Display

[software]
os_primary    = Windows 11 Pro (WSL2 Ubuntu 24.04 LTS)
os_secondary  = Arch Linux (Hyprland Wayland)
shell         = PowerShell 7.4 + Oh-My-Posh / zsh + starship
terminal      = Windows Terminal / Kitty
editor        = VS Code (Catppuccin Mocha) + Neovim (NvChad)
font          = JetBrains Mono Nerd Font 11pt`,
    meta: '-rw-r--r-- 1 retr0 staff 540B Sep 19 15:51 workstation.conf',
  },
]
