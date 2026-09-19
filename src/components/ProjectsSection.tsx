import React, { useState } from 'react'
import {
  Folder,
  FolderOpen,
  ExternalLink,
  Star,
  GitCommit,
  Terminal,
  X,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { PROJECTS } from '../data/portfolioData'
import type { Project } from '../types'
import { soundFx } from '../utils/audio'

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All', flag: 'ls -la' },
    { id: 'systems', label: 'Systems', flag: 'ls --systems' },
    { id: 'web', label: 'Web', flag: 'ls --web' },
    { id: 'tools', label: 'Tools', flag: 'ls --tools' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  const handleOpenModal = (project: Project) => {
    soundFx.playClick('enter')
    setActiveProjectModal(project)
  }

  const handleCloseModal = () => {
    soundFx.playClick('key')
    setActiveProjectModal(null)
  }

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'systems':
        return 'text-[#8BE9FD] border-[#8BE9FD]/40 bg-[#8BE9FD]/10'
      case 'web':
        return 'text-[#A6E3A1] border-[#A6E3A1]/40 bg-[#A6E3A1]/10'
      case 'tools':
        return 'text-[#CBA6F7] border-[#CBA6F7]/40 bg-[#CBA6F7]/10'
      default:
        return 'text-[#F9E2AF] border-[#F9E2AF]/40 bg-[#F9E2AF]/10'
    }
  }

  return (
    <section id="projects" className="py-4 scroll-mt-20 font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm sm:text-base text-[#8BE9FD]">
          <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
          <span className="text-[#F9E2AF] font-bold">
            &gt; ls {selectedCategory !== 'all' ? `--type=${selectedCategory} ` : ''}~/projects
          </span>
          <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick('key')
                setSelectedCategory(cat.id)
              }}
              className={`px-3 py-1 rounded text-xs transition-all cursor-pointer whitespace-nowrap font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#8BE9FD] text-[#0A0C14] font-bold shadow-md shadow-[#8BE9FD]/20'
                  : 'bg-[#111420] text-[#7F849C] border border-[#23283E] hover:text-[#D8DEE9] hover:border-[#8BE9FD]/30'
              }`}
            >
              <span>{cat.flag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subheader / Telemetry strip */}
      <div className="text-xs text-[#7F849C] mb-4 bg-[#080B14] px-3 py-1.5 rounded border border-[#1E2438] flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6E3A1] animate-pulse" />
          <span className="text-[#8BE9FD] font-bold">MGS2 // REPO_ARCHIVES</span>
          <span className="text-[#585B70] hidden sm:inline">|</span>
          <span className="hidden sm:inline">total {filteredProjects.length} projects</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#A6E3A1] text-[10px] bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30">
            140.85 MHz
          </span>
          <span className="text-[#585B70] hidden md:inline">drwxr-xr-x 2 niko-rax</span>
        </div>
      </div>

      {/* Projects Grid: Clean, high-impact scannable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => {
          const isHovered = hoveredProjectId === project.id
          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className={`border-2 transition-all duration-200 bg-[#111420]/95 rounded-sm p-4 sm:p-5 flex flex-col justify-between group relative overflow-hidden ${
                isHovered
                  ? 'border-[#8BE9FD]/80 shadow-xl shadow-[#8BE9FD]/15 -translate-y-1'
                  : 'border-[#23283E] hover:border-[#384163]'
              }`}
            >
              {/* Tactical Corner Reticles */}
              <span className="absolute top-0 left-0 text-[#8BE9FD] text-[10px] select-none pointer-events-none z-20 opacity-70 leading-none drop-shadow-[0_0_2px_#8BE9FD]">
                ┌──
              </span>
              <span className="absolute top-0 right-0 text-[#8BE9FD] text-[10px] select-none pointer-events-none z-20 opacity-70 leading-none drop-shadow-[0_0_2px_#8BE9FD]">
                ──┐
              </span>
              <span className="absolute bottom-0 left-0 text-[#8BE9FD] text-[10px] select-none pointer-events-none z-20 opacity-70 leading-none drop-shadow-[0_0_2px_#8BE9FD]">
                └──
              </span>
              <span className="absolute bottom-0 right-0 text-[#8BE9FD] text-[10px] select-none pointer-events-none z-20 opacity-70 leading-none drop-shadow-[0_0_2px_#8BE9FD]">
                ──┘
              </span>

              {/* Card Body */}
              <div>
                {/* Top Row: Directory name & Category badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    <span className="text-[#8BE9FD]">
                      {isHovered ? (
                        <FolderOpen className="w-4 h-4 text-[#8BE9FD] inline-block" />
                      ) : (
                        <Folder className="w-4 h-4 text-[#89B4FA] inline-block" />
                      )}
                    </span>
                    <span className="text-[#F5C2E7] group-hover:text-[#8BE9FD] transition-colors">
                      ~/{project.folder}/
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadge(
                      project.category
                    )}`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Stars and commits telemetry */}
                <div className="flex items-center space-x-3 text-[11px] text-[#7F849C] mb-3">
                  <span className="flex items-center space-x-1" title="Stars">
                    <Star className="w-3 h-3 text-[#F9E2AF]" />
                    <span>{project.stars}</span>
                  </span>
                  <span className="flex items-center space-x-1" title="Commits">
                    <GitCommit className="w-3 h-3 text-[#A6E3A1]" />
                    <span>{project.commits} commits</span>
                  </span>
                  <span className="text-[#585B70]">•</span>
                  <span className="text-[#89B4FA] text-[10px]">{project.stats.version}</span>
                </div>

                {/* 1-Line Punchy Tagline */}
                <h3 className="text-xs font-semibold text-[#8BE9FD] mb-2 leading-snug">
                  {project.tagline}
                </h3>

                {/* Readable Description */}
                <p className="text-xs text-[#BAC2DE] leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#0A0C14] text-[#89B4FA] text-[11px] border border-[#23283E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-[#1E2235] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="text-xs text-[#7F849C] hover:text-[#8BE9FD] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Inspect project details"
                >
                  <Terminal className="w-3 h-3" />
                  <span>[ SPECS ]</span>
                </button>

                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#0A0C14] bg-[#A6E3A1] hover:bg-[#8BE9FD] flex items-center gap-1 px-2.5 py-1 rounded transition-colors shadow-sm"
                      title="Open Live Demo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>DEMO</span>
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D8DEE9] hover:text-[#8BE9FD] flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1D2D] border border-[#282C3F] hover:border-[#8BE9FD]/40 transition-colors"
                    title="Source code on GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>CODE</span>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Project Detail Modal / Terminal Inspector */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-[#111420] border-2 border-[#8BE9FD]/60 rounded-sm shadow-2xl overflow-hidden font-mono text-sm relative">
            {/* Modal Titlebar */}
            <div className="bg-[#181B28] px-4 py-2.5 border-b border-[#282C3F] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#F38BA8]" />
                <span className="w-3 h-3 rounded-full bg-[#F9E2AF]" />
                <span className="w-3 h-3 rounded-full bg-[#A6E3A1]" />
                <span className="text-xs text-[#8BE9FD] ml-2">
                  inspect --target={activeProjectModal.folder}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#7F849C] hover:text-[#F38BA8] transition-colors p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <div className="text-lg font-bold text-[#F5C2E7] flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#8BE9FD]" />
                  <span>{activeProjectModal.name}</span>
                  <span className="text-xs font-normal px-2 py-0.5 rounded bg-[#A6E3A1]/10 text-[#A6E3A1] border border-[#A6E3A1]/30 uppercase">
                    {activeProjectModal.category}
                  </span>
                </div>
                <p className="text-xs text-[#89B4FA] mt-1">{activeProjectModal.tagline}</p>
              </div>

              <div className="bg-[#090B12] p-3 rounded border border-[#1E2235]">
                <div className="text-xs text-[#7F849C] mb-1">$ cat README.md</div>
                <p className="text-xs text-[#D8DEE9] leading-relaxed">
                  {activeProjectModal.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-[#181B28] p-2.5 rounded border border-[#282C3F]">
                  <div className="text-[#7F849C] text-[10px]">STACK / LANGUAGE</div>
                  <div className="text-[#8BE9FD] font-semibold mt-0.5">
                    {activeProjectModal.stats.language}
                  </div>
                </div>
                <div className="bg-[#181B28] p-2.5 rounded border border-[#282C3F]">
                  <div className="text-[#7F849C] text-[10px]">CODEBASE SIZE</div>
                  <div className="text-[#F9E2AF] font-semibold mt-0.5">
                    {activeProjectModal.stats.linesOfCode}
                  </div>
                </div>
                <div className="bg-[#181B28] p-2.5 rounded border border-[#282C3F]">
                  <div className="text-[#7F849C] text-[10px]">VERSION</div>
                  <div className="text-[#A6E3A1] font-semibold mt-0.5">
                    {activeProjectModal.stats.version}
                  </div>
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <div className="text-xs text-[#7F849C] mb-1.5">TECH & DEPENDENCIES:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-[#181B28] text-xs text-[#CBA6F7] border border-[#282C3F]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#282C3F] flex items-center justify-end space-x-3">
                {activeProjectModal.liveUrl && (
                  <a
                    href={activeProjectModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded bg-[#A6E3A1] text-[#0A0C14] font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded bg-[#8BE9FD]/15 border border-[#8BE9FD]/40 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 text-xs font-semibold flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW ON GITHUB</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
