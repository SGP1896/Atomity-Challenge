// components/CostTable/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CostRow {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
}

interface CostTableProps {
  rows: CostRow[];
}

const COLUMNS = ['CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total'];

function fmt(value: number, isEfficiency = false): string {
  if (isEfficiency) return `${value}%`;
  return `$${value.toLocaleString()}`;
}

// Add this inside CostTable/index.tsx, before the CostTable function

import { useCountUp } from '@/hooks/useCountUp';

function AnimatedTotal({
  value,
  isInView,
}: {
  value: number;
  isInView: boolean;
}) {
  const count = useCountUp(value, isInView);
  return <>${count.toLocaleString()}</>;
}

export function CostTable({ rows }: CostTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();

  const tableVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.07 },
    },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div
      ref={ref}
      style={{
        overflowX: 'auto',
        paddingInline: 'var(--spacing-md)',
        marginBlockStart: 'var(--spacing-lg)',
      }}
      role="region"
      aria-label="Cost breakdown table"
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '120px' }} />
            {COLUMNS.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  color: 'var(--color-text-muted)',
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  letterSpacing: '0.03em',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* motion.tbody for stagger */}
        <motion.tbody
          variants={tableVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {rows.map((row, index) => (
            <motion.tr
              key={row.id}
              variants={rowVariants}
              style={{
                borderTop: '1px solid var(--color-border)',
                backgroundColor:
                  index % 2 === 0
                    ? 'transparent'
                    : 'color-mix(in srgb, var(--color-accent-green) 4%, transparent)',
              }}
            >
              <td
                style={{
                  fontWeight: '700',
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {row.name}
              </td>

              {[row.cpu, row.ram, row.storage, row.network, row.gpu].map(
                (val, i) => (
                  <td
                    key={i}
                    style={{
                      textAlign: 'center',
                      paddingBlock: 'var(--spacing-sm)',
                      paddingInline: 'var(--spacing-sm)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {fmt(val)}
                  </td>
                )
              )}

              <td
                style={{
                  textAlign: 'center',
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {fmt(row.efficiency, true)}
              </td>

              <td
                style={{
                  textAlign: 'center',
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  fontWeight: '700',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-primary)',
                }}
              >
               <AnimatedTotal value={row.total} isInView={isInView} />
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
}