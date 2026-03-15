// components/ResourceIconRow/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ResourceIcon, ResourceType } from '@/components/ResourceIcon';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RESOURCES: ResourceType[] = ['cpu', 'gpu', 'ram', 'storage', 'network'];

export function ResourceIconRow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref}>
      {/* Section label */}
      <p
        style={{
          textAlign: 'center',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-muted)',
          marginBlockEnd: 'var(--spacing-lg)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: '600',
        }}
      >
        Cost breakdown by resource
      </p>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reducedMotion ? 0 : 0.09,
            },
          },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-xl)',
          flexWrap: 'wrap',
        }}
      >
        {RESOURCES.map((type, i) => (
          <ResourceIcon key={type} type={type} index={i} />
        ))}
      </motion.div>
    </div>
  );
}