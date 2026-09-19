import React, { useState } from 'react'
import { ExternalLink, Folder } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { PROJECTS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems' },
    { id: 'web', label: 'Web' },
    { id: 'tools', label: 'Security & Tools' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-8 scroll-mt-20 font-mono">
      {/* Section Header with Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-[#1C2030]">
        <div>
          <div className="text-xs text-[#00F0FF] mb-1">// WORK & EXPERIMENTS</div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick('key')
                setSelectedCategory(cat.id)
              }}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer whitespace-nowrap font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#00F0FF] text-[#08090C] font-bold'
                  : 'bg-[#131624] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#22273C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0D0F17] border border-[#1C2030] hover:border-[#00F0FF]/50 rounded-lg p-5 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 shadow-lg shadow-black/20"
          >
            <div>
              {/* Top: Folder Icon, Title & Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-base font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                  <Folder className="w-4 h-4 text-[#00F0FF]" />
                  <span>{project.name}</span>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#141826] text-[#94A3B8] border border-[#252B42] capitalize">
                  {project.category}
                </span>
              </div>

              {/* Tagline */}
              <h3 className="text-xs font-semibold text-[#38BDF8] mb-2 leading-snug">
                {project.tagline}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#131624] text-[#CBD5E1] text-[11px] border border-[#22273C]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Links */}
            <div className="pt-3 border-t border-[#181C2A] flex items-center justify-between gap-2">
              <div className="text-[11px] text-[#64748B]">
                {project.stats.language}
              </div>

              <div className="flex items-center space-x-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#08090C] bg-[#00F0FF] hover:bg-[#38BDF8] flex items-center gap-1.5 px-3 py-1 rounded transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Live Demo</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#CBD5E1] hover:text-[#00F0FF] bg-[#141724] hover:bg-[#1E2336] border border-[#252A3E] flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
