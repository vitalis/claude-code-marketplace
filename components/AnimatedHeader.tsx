'use client';

import { useState, useEffect } from 'react';

const VERBS = [
  'Brewing',
  'Clauding',
  'Conjuring',
  'Crafting',
  'Finagling',
  'Forging',
  'Hatching',
  'Herding',
  'Honking',
  'Hustling',
  'Moseying',
  'Noodling',
  'Percolating',
  'Puttering',
  'Reticulating',
  'Schlepping',
  'Shucking',
  'Smooshing',
  'Vibing',
];

export default function AnimatedHeader() {
  const [currentVerb, setCurrentVerb] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentVerb((prev) => {
          let next = Math.floor(Math.random() * VERBS.length);
          // Ensure we don't get the same verb twice in a row
          while (next === prev && VERBS.length > 1) {
            next = Math.floor(Math.random() * VERBS.length);
          }
          return next;
        });
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 items-center">
        <span
          className={`inline-block text-sm sm:text-base font-medium text-[#d97757] px-2.5 py-1 border-2 border-[#d97757] rounded-md transition-all duration-300 w-fit ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          {VERBS[currentVerb]}...
        </span>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center sm:text-left">
          Discover and add marketplaces to extend Claude Code
        </p>
      </div>
    </div>
  );
}
