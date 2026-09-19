import type { Project, GitCommit, AudioTrack } from '../types'

export const SYSTEM_INFO = {
  officialName: 'Siva Kowsik S',
  nickname: 'Nagul',
  user: 'Siva Kowsik S',
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
]

export const SKILL_PROGRESS = [
  {
    category: 'CyberSec & Linux',
    progressBlocks: '████████████░░░░░',
    percentage: 75,
    highlightTech: 'Linux / Security / Bash',
    level: 'working with' as const,
    color: '#8BE9FD',
  },
  {
    category: 'Programming',
    progressBlocks: '██████████████░░░',
    percentage: 80,
    highlightTech: 'Python / C / C++',
    level: 'working with' as const,
    color: '#A6E3A1',
  },
  {
    category: 'Web Dev',
    progressBlocks: '████████████░░░░░',
    percentage: 70,
    highlightTech: 'React / HTML / CSS / JS',
    level: 'working with' as const,
    color: '#F9E2AF',
  },
  {
    category: 'Version Control',
    progressBlocks: '███████████████░░',
    percentage: 85,
    highlightTech: 'Git / GitHub',
    level: 'working with' as const,
    color: '#CBA6F7',
  },
]

export const SKILL_BADGES = [
  { name: 'Python', category: 'language', color: '#F9E2AF', exp: 'Academic & Projects' },
  { name: 'C / C++', category: 'systems', color: '#CBA6F7', exp: 'Data Structures & Systems' },
  { name: 'Linux', category: 'systems', color: '#FAB387', exp: 'Bash scripting & Admin' },
  { name: 'Cyber Security', category: 'systems', color: '#8BE9FD', exp: 'Network Security & CTFs' },
  { name: 'HTML5', category: 'frontend', color: '#FAB387', exp: 'Semantic Web' },
  { name: 'CSS3', category: 'frontend', color: '#89B4FA', exp: 'Modern Layouts' },
  { name: 'JavaScript', category: 'language', color: '#F9E2AF', exp: 'ES6+ Logic' },
  { name: 'React', category: 'frontend', color: '#8BE9FD', exp: 'Component Architecture' },
  { name: 'Git', category: 'tools', color: '#F38BA8', exp: 'Version Control' },
  { name: 'GitHub', category: 'tools', color: '#CBA6F7', exp: 'Repositories & CI' },
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
    message: 'perf(security): audit packet handling and secure transmission endpoints',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '3 days ago',
    branch: 'main',
    changes: { added: 115, removed: 29 },
    diffSnippet: `+  function secureHandshake(req: TransmissionRequest): boolean {\n+    return verifySignature(req.headers['x-terminal-sig']);\n+  }`,
  },
  {
    hash: '6c10e42',
    message: 'init(repo): initialize nerdy-site workspace with Vite + React 19',
    author: 'retr0 <sivphax08@gmail.com>',
    date: '1 week ago',
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
    desc: 'Explore open source code & projects',
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
    desc: 'Dev setups & updates',
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
    desc: 'Direct transmission for opportunities',
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
  ]
}`,
    meta: '-rw-r--r-- 1 retr0 staff 480B Sep 19 15:51 education.json',
  },
  {
    file: 'philosophy.md',
    label: 'philosophy.md',
    content: `# Engineering & Security Philosophy

1. **Break to Understand:** The best way to secure or build a system is to understand how it breaks under pressure.
2. **Depth over surface:** Inspect the source code, trace network packets, and analyze system calls.
3. **Keyboard-first Ergonomics:** Speed in thought requires speed in tooling. Monospace fonts, vim keybindings, and automated dotfiles.
4. **Resilience & Fault Tolerance:** Build defensive systems that anticipate failures and malicious vectors gracefully.`,
    meta: '-rw-r--r-- 1 retr0 staff 640B Sep 19 15:51 philosophy.md',
  },
]
