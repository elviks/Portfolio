'use client';

import { useEffect, useState, useMemo } from 'react';

export default function Terminal() {
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [typedText, setTypedText] = useState('');

  const terminalLines = useMemo(
    () => [
      '> Initializing portfolio...',
      '> Loading credentials...',
      '> Developer.status: AVAILABLE',
      '> Skills.load(): COMPLETE'
    ],
    []
  );

  useEffect(() => {
    const text = terminalLines[activeTerminal] ?? '';
    let index = 0;
    setTypedText('');

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setActiveTerminal((p) => (p + 1) % terminalLines.length);
        }, 1600);
      }
    }, 35);

    return () => window.clearInterval(interval);
  }, [activeTerminal, terminalLines]);

  return (
    <div className="inline-block rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 backdrop-blur-sm md:px-6">
      <p className="font-mono text-xs text-green-400 md:text-sm">
        {typedText}
        <span className="animate-pulse">_</span>
      </p>
    </div>
  );
}