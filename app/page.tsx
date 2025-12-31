'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ParticleBackground,
  Navbar,
  Hero,
  Skills,
  Work,
  Contact,
  Footer
} from '../components';

type VisibleMap = Record<string, boolean>;

export default function DeveloperPortfolio() {
  const [isVisible, setIsVisible] = useState<VisibleMap>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef<Record<string, boolean>>({});

  // Intersection observer (animate once per section)
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = (entry.target as HTMLElement).id || (entry.target as HTMLElement).dataset.animateId;
          if (!id) continue;

          if (!hasAnimatedRef.current[id]) {
            hasAnimatedRef.current[id] = true;
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -120px 0px' }
    );

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'));
    els.forEach((el) => {
      // Ensure observer has a stable key even if dev forgot an id
      if (!el.id) el.dataset.animateId = el.dataset.animateId || `section-${Math.random().toString(16).slice(2)}`;
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // If you later make navbar sticky, adjust this number (or measure header height)
    const offset = 16; // small breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Background layer (never blocks layout or clicks) */}
      <ParticleBackground />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar scrollToId={scrollToId} />

        <main>
          <Hero />
          <Skills isVisible={isVisible.skills} />
          <Work isVisible={isVisible.work} />
          <Contact isVisible={isVisible.contact} />
        </main>

        <Footer />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.7s ease-out both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.9s ease-out both;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.9s ease-out both;
        }
        .animate-slideInRight {
          animation: slideInRight 0.9s ease-out both;
        }
      `}</style>
    </div>
  );
}
