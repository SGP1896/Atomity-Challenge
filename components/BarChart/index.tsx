// components/BarChart/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface BarChartItem {
  id: string;
  name: string;
  value: number;
}

interface BarChartProps {
  items: BarChartItem[];
  onBarClick?: (id: string, name: string) => void;
}

export function BarChart({ items, onBarClick }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once:true — animation only fires on first scroll into view
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  const maxValue = Math.max(...items.map((i) => i.value));

  // Container stagger — children animate one after another
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  // Each bar grows from 0 height to full height
  const barVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: reducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 80, damping: 18 },
    },
  };

  return (
    <div
      style={{ containerType: 'inline-size', containerName: 'barchart' }}
      ref={ref}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 'var(--spacing-lg)',
          alignItems: 'flex-end',
          height: '220px',
          paddingInline: 'var(--spacing-md)',
          marginBlockEnd: 'var(--spacing-md)',
          borderBottom: '1px dashed var(--color-border-dashed)',
          position: 'relative',
        }}
      >
        {/* Dashed guide lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <div
            key={ratio}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${ratio * 100}%`,
              borderTop: '1px dashed var(--color-border-dashed)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Animated bars */}
        {items.map((item) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <motion.div
              key={item.id}
              variants={barVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                cursor: onBarClick ? 'pointer' : 'default',
                // transform origin at bottom so bar grows upward
                transformOrigin: 'bottom',
              }}
              onClick={() => onBarClick?.(item.id, item.name)}
              role={onBarClick ? 'button' : undefined}
              tabIndex={onBarClick ? 0 : undefined}
              aria-label={`${item.name}: $${item.value.toLocaleString()}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onBarClick?.(item.id, item.name);
                }
              }}
              // Hover effect via whileHover
              whileHover={reducedMotion ? {} : { scaleX: 0.94, filter: 'brightness(1.12)' }}
              whileTap={reducedMotion ? {} : { scaleX: 0.9 }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${heightPercent}%`,
                  backgroundColor: 'var(--color-accent-green)',
                  borderRadius:
                    'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-sm)',
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bar labels row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 'var(--spacing-lg)',
          paddingInline: 'var(--spacing-md)',
        }}
      >
        {items.map((item) => (
          <p
            key={item.id}
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}