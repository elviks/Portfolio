'use client';

import { useMemo } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface WorkProps {
  isVisible: boolean;
}

export default function Work({ isVisible }: WorkProps) {
  const projects = useMemo(
    () => [
      {
        title: 'Daily Work Report',
        desc: 'An HR management application with role based access control and submitting and managing daily work reports.',
        metrics: { Stack: 'Next.js, MongoDB' },
        glow: 'shadow-green-500/50',
        link: 'https://github.com/elviks/daily-report.git'
      },
      {
        title: 'AskQ : Qwen Powered Chatbot',
        desc: 'A simple chatbot interface with Qwen api integration from Open Router',
        metrics: { 'Tech Stack': 'ReactJs, Tailwind, Qwen2.5 VL 32B Instruct API' },
        glow: 'shadow-emerald-500/50',
        link: 'https://github.com/elviks/AskQ.git',
      },
      {
        title: 'GamerGears : E-commerce Platform',
        desc: 'An online shopping ecommerce site for gaming gadgets.',
        metrics: { 'Tech Stack': 'ReactJs, Supabase' },
        glow: 'shadow-green-400/50',
        link: 'https://gamergears.vercel.app/'
      },
      {
        title: 'GamerGears : Mobile App',
        desc: 'Mobile application for GamerGears Admin.',
        metrics: { 'Tech Stack': 'React-Native, Supabase' },
        glow: 'shadow-green-400/50',
        link: 'https://github.com/elviks/gamergears-mobile.git'
      },
      {
        title: 'SocioFetch',
        desc: 'A video downloading platform that supports downloading videos from YouTube, Facebook, Instagram, and TikTok.',
        metrics: { 'Tech Stack': 'ReactJs, Flask, yt-dlp' },
        glow: 'shadow-green-400/50',
        link: 'https://github.com/elviks/sociofetch.git'
      },
      {
        title: 'Mail Sucker',
        desc: 'A web app for extracting emails from Excel files based on custom criteria.',
        metrics: { 'Tech Stack': 'Flask, HTML, CSS, JavaScript' },
        glow: 'shadow-green-400/50',
        link: 'https://github.com/elviks/mail-sucker.git'
      }
    ],
    []
  );

  return (
    <section id="work" className="relative px-4 py-12 md:px-6 md:py-24" data-animate>
      <div className="mx-auto max-w-7xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="mb-4 text-4xl font-black md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              FEATURED WORK
            </span>
          </h2>
          <p className="mb-12 font-mono text-sm text-gray-500 md:mb-20 md:text-base">
            // Production-grade systems at scale
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative rounded-3xl border border-green-500/20 bg-gradient-to-r from-green-500/5 via-black to-emerald-500/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-green-400/60 md:p-12 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              <div
                className={`absolute inset-0 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${project.glow}`}
              />

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
                    <Sparkles className="h-5 w-5 animate-pulse text-green-400 md:h-6 md:w-6" />
                    <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">{project.title}</h3>
                  </div>

                  <p className="mb-4 text-base text-gray-400 md:mb-6 md:text-lg lg:text-xl">{project.desc}</p>

                  <div className="flex flex-wrap gap-4 font-mono text-xs md:gap-6 md:text-sm lg:gap-8">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="transition-transform duration-300 hover:scale-110">
                        <span className="text-gray-500">{key}: </span>
                        <span className="font-bold text-green-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={project.link} target="_blank" className="group/btn relative self-end md:self-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 blur-lg transition-all duration-300 group-hover/btn:opacity-100" />
                  <div className="relative rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-4 transition-all duration-300 group-hover/btn:rotate-6 group-hover/btn:scale-110 md:p-6">
                    <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}