// components/ResourceIconRow/index.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ResourceIcon, ResourceType } from '@/components/ResourceIcon';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RESOURCES: ResourceType[] = ['cpu', 'gpu', 'ram', 'storage', 'network'];

interface ResourceIconRowProps {
  onSelect: (type: ResourceType | null) => void;
  activeType: ResourceType | null;
}

export function ResourceIconRow({ onSelect, activeType }: ResourceIconRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();

  function handleClick(type: ResourceType) {
    // clicking active icon again deselects it
    onSelect(activeType === type ? null : type);
  }

  return (
    <div ref={ref}>
      <p style={{
        textAlign: 'center',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-muted)',
        marginBlockEnd: 'var(--spacing-lg)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontWeight: '600',
      }}>
        Cost breakdown by resource — click to explore
      </p>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-xl)',
          flexWrap: 'wrap',
        }}
      >
        {RESOURCES.map((type, i) => (
          <ResourceIcon
            key={type}
            type={type}
            index={i}
            isActive={activeType === type}
            onClick={handleClick}
          />
        ))}
      </motion.div>
    </div>
  );
}