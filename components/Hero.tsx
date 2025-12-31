'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Terminal from './Terminal';
import SocialLinks from './SocialLinks';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center pt-20 md:pt-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-10 animate-fadeIn">
          <Terminal />
        </div>

        {/* Name */}
        <h1
          className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ transform: `translateY(${Math.min(scrollY * 0.08, 20)}px)` }}
        >
          Hi, I’m{' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Elvik Sharma
          </span>
        </h1>

        {/* Role */}
        <h2 className="mb-6 max-w-3xl text-xl font-bold md:text-2xl animate-pulse">
          <span className='bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'>
            Full-Stack Software Developer</span>
        </h2>

        {/* Description */}
        <p className="mb-10 max-w-2xl text-lg font-light text-gray-400 md:text-xl">
          I'm a Software Developer with an experience in building web and mobile applications.
          My focus is on creating clean, efficient, and user-friendly solutions to complex problems.
        </p>

        {/* Actions */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 md:px-8 md:py-4"
          >
            View Projects
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-gray-200 backdrop-blur transition-all duration-300 hover:bg-white/10 md:px-8 md:py-4"
          >
            <Mail className="h-5 w-5" />
            Contact Me
          </a>
        </div>

        {/* Socials */}
        <SocialLinks />

        {/* Status */}
        <p className="mt-8 text-sm text-gray-500">
          Available for freelance and full-time remote opportunities
        </p>
      </div>
    </section>
  );
}
