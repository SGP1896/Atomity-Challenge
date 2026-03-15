// components/CostPieChart/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CostRow } from '@/components/CostTable';
import { ResourceType } from '@/components/ResourceIcon';

interface CostPieChartProps {
  rows: CostRow[];
  resourceType: ResourceType;
}

const RESOURCE_LABELS: Record<ResourceType, string> = {
  cpu: 'CPU Cost',
  gpu: 'GPU Cost',
  ram: 'RAM Cost',
  storage: 'Storage Cost',
  network: 'Network Cost',
};

// Green palette — distinct shades derived from accent green
const COLORS = ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#bbf7d0'];

function getValueForType(row: CostRow, type: ResourceType): number {
  switch (type) {
    case 'cpu':     return row.cpu;
    case 'gpu':     return row.gpu;
    case 'ram':     return row.ram;
    case 'storage': return row.storage;
    case 'network': return row.network;
  }
}

// Custom tooltip
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 16px',
      boxShadow: '0 4px 16px color-mix(in srgb, var(--color-text-primary) 10%, transparent)',
    }}>
      <p style={{ fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: 4 }}>
        {payload[0].name}
      </p>
      <p style={{ color: 'var(--color-accent-green-dark)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function CostPieChart({ rows, resourceType }: CostPieChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const reducedMotion = useReducedMotion();

  const data = rows
    .map((row) => ({
      name: row.name,
      value: getValueForType(row, resourceType),
    }))
    .filter((d) => d.value > 0); // hide zero values

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        key={resourceType}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          marginBlockStart: 'var(--spacing-xl)',
          padding: 'var(--spacing-xl)',
          backgroundColor: 'color-mix(in srgb, var(--color-accent-green) 5%, var(--color-bg-card))',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBlockEnd: 'var(--spacing-lg)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-sm)',
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
          }}>
            {RESOURCE_LABELS[resourceType]} Distribution
          </h3>
          <span style={{
            backgroundColor: 'var(--color-accent-green)',
            borderRadius: 'var(--radius-pill)',
            padding: '4px 14px',
            fontWeight: '700',
            fontSize: 'var(--font-size-sm)',
            fontFamily: 'var(--font-mono)',
          }}>
            Total: ${total.toLocaleString()}
          </span>
        </div>

        {/* Pie chart */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                isAnimationActive={!reducedMotion}
                animationBegin={0}
                animationDuration={700}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '500',
                  }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row below chart */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: 'var(--spacing-md)',
          marginBlockStart: 'var(--spacing-lg)',
        }}>
          {data.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 100 }}
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{
                width: 10, height: 10,
                borderRadius: '50%',
                backgroundColor: COLORS[i % COLORS.length],
                margin: '0 auto var(--spacing-xs)',
              }} />
              <p style={{ fontWeight: '600', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
                {item.name}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-green-dark)', fontWeight: '700' }}>
                ${item.value.toLocaleString()}
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {Math.round((item.value / total) * 100)}%
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}