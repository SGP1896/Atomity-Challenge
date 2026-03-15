// components/ResourceIcon/index.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type ResourceType = 'cpu' | 'gpu' | 'ram' | 'storage' | 'network';

interface ResourceIconProps {
  type: ResourceType;
  index?: number; // for stagger delay
}

const LABELS: Record<ResourceType, string> = {
  cpu: 'CPU',
  gpu: 'GPU',
  ram: 'RAM',
  storage: 'Storage',
  network: 'Network',
};

// Inline SVG paths for each resource type
function IconSVG({ type }: { type: ResourceType }) {
  const style = {
    width: 48,
    height: 48,
    stroke: 'var(--color-text-primary)',
    fill: 'none',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'cpu':
      return (
        <svg viewBox="0 0 48 48" {...style}>
          <rect x="14" y="14" width="20" height="20" rx="2" />
          <rect x="18" y="18" width="12" height="12" rx="1" />
          {/* pins */}
          <line x1="19" y1="14" x2="19" y2="9" />
          <line x1="24" y1="14" x2="24" y2="9" />
          <line x1="29" y1="14" x2="29" y2="9" />
          <line x1="19" y1="34" x2="19" y2="39" />
          <line x1="24" y1="34" x2="24" y2="39" />
          <line x1="29" y1="34" x2="29" y2="39" />
          <line x1="14" y1="19" x2="9" y2="19" />
          <line x1="14" y1="24" x2="9" y2="24" />
          <line x1="14" y1="29" x2="9" y2="29" />
          <line x1="34" y1="19" x2="39" y2="19" />
          <line x1="34" y1="24" x2="39" y2="24" />
          <line x1="34" y1="29" x2="39" y2="29" />
        </svg>
      );
    case 'gpu':
      return (
        <svg viewBox="0 0 48 48" {...style}>
          <rect x="6" y="14" width="36" height="20" rx="3" />
          <circle cx="17" cy="24" r="5" />
          <circle cx="31" cy="24" r="5" />
          <line x1="10" y1="34" x2="10" y2="39" />
          <line x1="24" y1="34" x2="24" y2="39" />
          <line x1="38" y1="34" x2="38" y2="39" />
          <line x1="6" y1="20" x2="2" y2="20" />
          <line x1="6" y1="28" x2="2" y2="28" />
        </svg>
      );
    case 'ram':
      return (
        <svg viewBox="0 0 48 48" {...style}>
          <rect x="6" y="16" width="36" height="16" rx="2" />
          <line x1="13" y1="16" x2="13" y2="32" />
          <line x1="19" y1="16" x2="19" y2="32" />
          <line x1="25" y1="16" x2="25" y2="32" />
          <line x1="31" y1="16" x2="31" y2="32" />
          <line x1="35" y1="16" x2="35" y2="32" />
          <line x1="13" y1="32" x2="13" y2="37" />
          <line x1="19" y1="32" x2="19" y2="37" />
          <line x1="25" y1="32" x2="25" y2="37" />
          <line x1="31" y1="32" x2="31" y2="37" />
          <line x1="35" y1="32" x2="35" y2="37" />
        </svg>
      );
    case 'storage':
      return (
        <svg viewBox="0 0 48 48" {...style}>
          <rect x="8" y="9" width="32" height="10" rx="2" />
          <rect x="8" y="22" width="32" height="10" rx="2" />
          <rect x="8" y="35" width="32" height="6" rx="2" />
          <circle cx="34" cy="14" r="1.5" fill="var(--color-text-primary)" />
          <circle cx="34" cy="27" r="1.5" fill="var(--color-text-primary)" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 48 48" {...style}>
          <circle cx="24" cy="24" r="4" />
          <circle cx="10" cy="14" r="3" />
          <circle cx="38" cy="14" r="3" />
          <circle cx="10" cy="36" r="3" />
          <circle cx="38" cy="36" r="3" />
          <line x1="24" y1="20" x2="13" y2="16" />
          <line x1="24" y1="20" x2="35" y2="16" />
          <line x1="24" y1="28" x2="13" y2="34" />
          <line x1="24" y1="28" x2="35" y2="34" />
        </svg>
      );
  }
}

export function ResourceIcon({ type, index = 0 }: ResourceIconProps) {
  const reducedMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 100,
            damping: 18,
            delay: index * 0.09,
          },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={reducedMotion ? {} : { y: -4, scale: 1.04 }}
      whileTap={reducedMotion ? {} : { scale: 0.97 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        cursor: 'default',
      }}
    >
      {/* Green rounded square */}
      <div
        style={{
          backgroundColor: 'var(--color-accent-green)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-md)',
          width: '88px',
          height: '88px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow var(--transition-base)',
          boxShadow: '0 2px 12px color-mix(in srgb, var(--color-accent-green) 30%, transparent)',
        }}
      >
        <IconSVG type={type} />
      </div>

      <span
        style={{
          fontWeight: '600',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-primary)',
        }}
      >
        {LABELS[type]}
      </span>
    </motion.div>
  );
}