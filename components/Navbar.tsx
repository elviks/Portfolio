'use client';

import { Circle } from 'lucide-react';

interface NavbarProps {
  scrollToId: (id: string) => void;
}

export default function Navbar({ scrollToId }: NavbarProps) {
  return (
    <header className="pt-8 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex justify-center">
          <div className="inline-flex items-center gap-5 md:gap-8 rounded-full border border-green-500/30 bg-black/60 px-6 py-3 shadow-2xl shadow-green-500/20 backdrop-blur-xl animate-slideDown">
            <div className="flex items-center gap-2 whitespace-nowrap font-mono text-xs md:text-sm font-bold text-green-400">
              <Circle className="h-2 w-2 flex-shrink-0 animate-pulse fill-green-400" />
              ONLINE
            </div>
            {['WORK', 'SKILLS', 'CONTACT'].map((item) => {
              const id = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                    history.replaceState(null, '', `#${id}`); // keeps URL hash in sync
                  }}
                  className="relative whitespace-nowrap font-mono text-xs md:text-sm tracking-widest text-gray-400 transition-colors duration-300 hover:text-green-400 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}