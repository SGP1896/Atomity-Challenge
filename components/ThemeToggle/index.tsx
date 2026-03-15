// components/ThemeToggle/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Read initial theme from html attribute
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  function toggle() {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setIsDark(!isDark);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        top: 'var(--spacing-lg)',
        right: 'var(--spacing-lg)',
        zIndex: 100,
        background: 'var(--color-bg-card)',
        border: '1.5px solid var(--color-border)',
        borderRadius: 'var(--radius-pill)',
        padding: '8px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        boxShadow: '0 2px 8px color-mix(in srgb, var(--color-text-primary) 8%, transparent)',
        transition: 'background var(--transition-base), border-color var(--transition-base)',
      }}
    >
      <motion.span
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        style={{ display: 'inline-block' }}
      >
        {isDark ? '☀️' : '🌙'}
      </motion.span>
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}