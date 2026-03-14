// src/app/page.tsx
'use client';

import { DrilldownHeader } from '@/components/DrilldownHeader';
import { BarChart, BarChartItem } from '@/components/BarChart';
import { CostTable, CostRow } from '@/components/CostTable';

// ── Dummy data (replaced with API data in Hour 3) ──────────
const DUMMY_BARS: BarChartItem[] = [
  { id: 'a', name: 'Cluster A', value: 6867 },
  { id: 'b', name: 'Cluster B', value: 5574 },
  { id: 'c', name: 'Cluster C', value: 4664 },
  { id: 'd', name: 'Cluster D', value: 2545 },
];

const DUMMY_ROWS: CostRow[] = [
  { id: 'a', name: 'Cluster A', cpu: 2463, ram: 1368, storage: 246, network: 307, gpu: 821, efficiency: 10, total: 6867 },
  { id: 'b', name: 'Cluster B', cpu: 2127, ram: 1181, storage: 212, network: 265, gpu: 0,   efficiency: 28, total: 5574 },
  { id: 'c', name: 'Cluster C', cpu: 1733, ram: 962,  storage: 173, network: 216, gpu: 577, efficiency: 15, total: 4664 },
  { id: 'd', name: 'Cluster D', cpu: 1218, ram: 677,  storage: 121, network: 152, gpu: 0,   efficiency: 50, total: 2545 },
];
// ──────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        paddingBlock: 'var(--spacing-xxl)',
        paddingInline: 'var(--spacing-xl)',
      }}
    >
      <section
        aria-labelledby="dashboard-title"
        style={{
          maxWidth: '960px',
          marginInline: 'auto',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-xl)',
          boxShadow: '0 2px 24px color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
        }}
      >
        <h2
          id="dashboard-title"
          style={{
            position: 'absolute' as const,
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
          }}
        >
          Cloud Cost Dashboard
        </h2>

        <DrilldownHeader
          breadcrumb="Cluster"
          aggregatedBy="Cluster"
        />

        <BarChart items={DUMMY_BARS} />

        <CostTable rows={DUMMY_ROWS} />
      </section>
    </main>
  );
}