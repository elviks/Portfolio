'use client';

import { useMemo } from 'react';
import { Terminal, Cpu, Database, Globe, Zap, Code2, Smartphone, GitBranch, Box } from 'lucide-react';

interface SkillsProps {
  isVisible: boolean;
}

export default function Skills({ isVisible }: SkillsProps) {
  const skills = useMemo(
    () => [
      { name: 'Programming Language', subname: 'JavaScript, Dart, Python, C/C++, C#', icon: Code2, color: 'from-green-400 to-emerald-600' },
      { name: 'Frameworks', subname: 'React.js, Next.js, Express.js, Expo, TailwindCSS', icon: Smartphone, color: 'from-emerald-400 to-green-600' },
      { name: 'Database', subname: 'MongoDB, PostgreSQL', icon: Database, color: 'from-emerald-400 to-green-600' },
      { name: 'Creative Software', subname: 'Premiere Pro, After Effects, Blender, Unity, Godot', icon: Box, color: 'from-green-600 to-emerald-400' },

    ],
    []
  );

  return (
    <section id="skills" className="relative px-4 py-12 md:px-6 md:py-24" data-animate>
      <div className="mx-auto max-w-3xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="mb-4 text-center text-4xl font-black md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              TECH ARSENAL
            </span>
          </h2>
          <p className="mb-12 text-center font-mono text-sm text-gray-500 md:mb-20 md:text-base">
            // Mastered technologies
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className={`group relative aspect-square transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
              />
              <div className="relative flex h-full flex-col items-center justify-center rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-green-400/60 md:p-8">
                <div className="relative mb-4 md:mb-6">
                  <div className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50 bg-green-500" />
                  <skill.icon
                    className="relative z-10 h-12 w-12 text-green-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-16 md:w-16"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-center text-base font-bold md:text-xl">
                  <span className="bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {skill.name}
                  </span>
                </h3>
                <p className='bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent text-center mt-4'>{skill.subname}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}