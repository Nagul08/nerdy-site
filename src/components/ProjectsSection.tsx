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
    { id: 'all', flag: 'ls -la' },
    { id: 'web', flag: 'ls --type=web' },
    { id: 'systems', flag: 'ls --type=systems' },
    { id: 'tools', flag: 'ls --type=tools' },
    { id: 'ai', flag: 'ls --type=ai' },
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

  return (
    <section id="projects" className="py-8 scroll-mt-20">
      {/* Title with command prompt */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD]">
          <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
          <span className="text-[#F9E2AF] font-semibold">
            &gt; ls {selectedCategory !== 'all' ? `--type=${selectedCategory} ` : ''}~/projects
          </span>
          <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
        </div>

        {/* CLI Filter Flags */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick('key')
                setSelectedCategory(cat.id)
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#8BE9FD]/20 text-[#8BE9FD] border border-[#8BE9FD]/50 shadow-sm shadow-[#8BE9FD]/10'
                  : 'bg-[#111420] text-[#7F849C] border border-[#23283E] hover:text-[#D8DEE9]'
              }`}
            >
              <span>{cat.flag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Directory listing summary */}
      <div className="text-xs font-mono text-[#7F849C] mb-4 bg-[#090B12] px-3 py-1.5 rounded border border-[#1E2235] flex items-center justify-between">
        <span>total {filteredProjects.length} directories</span>
        <span>drwxr-xr-x 2 retr0 staff 4096 Sep 19 2026</span>
      </div>

      {/* Projects Grid: Styled as Terminal Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const isHovered = hoveredProjectId === project.id
          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className={`border transition-all duration-200 bg-[#111420]/95 rounded-sm p-4 sm:p-5 flex flex-col justify-between group relative overflow-hidden ${
                isHovered
                  ? 'border-[#8BE9FD]/70 shadow-lg shadow-[#8BE9FD]/10 -translate-y-0.5'
                  : 'border-[#282C3F] hover:border-[#3E4562]'
              }`}
            >
              {/* Top directory path indicator */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 font-mono text-sm font-semibold">
                    <span className="text-[#8BE9FD]">
                      {isHovered ? (
                        <FolderOpen className="w-4 h-4 text-[#8BE9FD] inline-block" />
                      ) : (
                        <Folder className="w-4 h-4 text-[#89B4FA] inline-block" />
                      )}
                    </span>
                    <span className="text-[#D8DEE9] group-hover:text-[#8BE9FD] transition-colors">
                      {project.folder}/
                    </span>
                  </div>

                  {/* Stars and commits badge */}
                  <div className="flex items-center space-x-2.5 text-xs font-mono text-[#7F849C]">
                    <span className="flex items-center space-x-1" title="Stars">
                      <Star className="w-3 h-3 text-[#F9E2AF]" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1" title="Commits">
                      <GitCommit className="w-3 h-3 text-[#A6E3A1]" />
                      <span>{project.commits}</span>
                    </span>
                  </div>
                </div>

                {/* Directory Tree ASCII Structure */}
                <div className="font-mono text-xs text-[#7F849C] space-y-1.5 pl-2 my-3 border-l border-[#282C3F]">
                  <div className="flex items-start space-x-1">
                    <span className="text-[#585B70] select-none">├──</span>
                    <p className="text-[#BAC2DE] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 pt-1">
                    <span className="text-[#585B70] select-none">├──</span>
                    <span className="text-[#CBA6F7] font-medium">tech:</span>
                    <div className="flex flex-wrap gap-1.5 pl-1">
                      {project.tech.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.2 rounded bg-[#181B28] text-[#89B4FA] text-[10px] border border-[#282C3F]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[10px] text-[#7F849C]">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 pt-1">
                    <span className="text-[#585B70] select-none">└──</span>
                    <span className="text-[#A6E3A1] text-[11px] font-mono">
                      {project.stats.version} • {project.stats.language}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions / Terminal Commands */}
              <div className="mt-4 pt-3 border-t border-[#1E2235] flex items-center justify-between">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="px-2.5 py-1.5 rounded bg-[#8BE9FD]/10 border border-[#8BE9FD]/30 text-[#8BE9FD] hover:bg-[#8BE9FD]/20 text-xs font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3 h-3" />
                  <span>[ VIEW DETAILS ]</span>
                </button>

                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#A6E3A1] hover:underline flex items-center gap-1 px-2 py-1 rounded bg-[#A6E3A1]/10 border border-[#A6E3A1]/30 hover:bg-[#A6E3A1]/20 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>DEMO</span>
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#D8DEE9] hover:text-[#8BE9FD] flex items-center gap-1.5 px-2 py-1 rounded bg-[#1A1D2D] border border-[#282C3F] hover:border-[#8BE9FD]/40 transition-colors"
                    title="Source code on GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>REPO</span>
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
          <div className="w-full max-w-2xl bg-[#111420] border border-[#8BE9FD]/60 rounded-sm shadow-2xl overflow-hidden font-mono text-sm">
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
                className="text-[#7F849C] hover:text-[#F38BA8] transition-colors p-1"
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
                  <span className="text-xs font-normal px-2 py-0.5 rounded bg-[#A6E3A1]/10 text-[#A6E3A1] border border-[#A6E3A1]/30">
                    {activeProjectModal.category.toUpperCase()}
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
                  <div className="text-[#7F849C] text-[10px]">PRIMARY STACK</div>
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
                <div className="text-xs text-[#7F849C] mb-1.5">DEPENDENCIES & LIBRARIES:</div>
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
                    className="px-3 py-1.5 rounded bg-[#A6E3A1]/15 border border-[#A6E3A1]/40 text-[#A6E3A1] hover:bg-[#A6E3A1]/25 text-xs flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#8BE9FD]/15 border border-[#8BE9FD]/40 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 text-xs flex items-center gap-1.5"
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
