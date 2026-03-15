// app/page.tsx
'use client';

import { useState } from 'react';
import { DrilldownHeader } from '@/components/DrilldownHeader';
import { BarChart } from '@/components/BarChart';
import { CostTable } from '@/components/CostTable';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorBanner } from '@/components/ErrorBanner';
import { useClusters, useNamespaces, usePods } from '@/hooks/useClusterData';
import { toBarChartItems, toCostRows } from '@/lib/adapters';
import { DrillLevel } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ResourceIconRow } from '@/components/ResourceIconRow';
import { ThemeToggle } from '@/components/ThemeToggle';

interface DrillState {
  level: DrillLevel;
  clusterId: string | null;
  clusterName: string | null;
  namespaceId: string | null;
  namespaceName: string | null;
}

const INITIAL_STATE: DrillState = {
  level: 'cluster',
  clusterId: null,
  clusterName: null,
  namespaceId: null,
  namespaceName: null,
};

export default function Home() {
  const [drill, setDrill] = useState<DrillState>(INITIAL_STATE);

  // ── Data hooks (caching handled by TanStack Query) ──
  const clustersQuery  = useClusters();
  const namespacesQuery = useNamespaces(drill.clusterId);
  const podsQuery      = usePods(drill.namespaceId);

  // ── Pick active query based on current drill level ──
  const activeQuery =
    drill.level === 'cluster'   ? clustersQuery :
    drill.level === 'namespace' ? namespacesQuery :
    podsQuery;

  const items = activeQuery.data ?? [];

  // ── Breadcrumb label ──
  const breadcrumb =
    drill.level === 'cluster'   ? 'Cluster' :
    drill.level === 'namespace' ? `${drill.clusterName} - Namespace` :
    `${drill.clusterName} - ${drill.namespaceName} - Pods`;

  const aggregatedBy =
    drill.level === 'cluster'   ? 'Cluster' :
    drill.level === 'namespace' ? 'Namespace' :
    'Pod';

  // ── Drill down handler ──
  function handleBarClick(id: string, name: string) {
    if (drill.level === 'cluster') {
      setDrill({
        level: 'namespace',
        clusterId: id,
        clusterName: name,
        namespaceId: null,
        namespaceName: null,
      });
    } else if (drill.level === 'namespace') {
      setDrill((prev) => ({
        ...prev,
        level: 'pod',
        namespaceId: id,
        namespaceName: name,
      }));
    }
    // pod is the deepest level — no further drill
  }

  // ── Back navigation ──
  function handleBack() {
    if (drill.level === 'pod') {
      setDrill((prev) => ({ ...prev, level: 'namespace', namespaceId: null, namespaceName: null }));
    } else if (drill.level === 'namespace') {
      setDrill(INITIAL_STATE);
    }
  }

  return (
    <>
    <ThemeToggle />
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        paddingBlock: 'var(--spacing-xxl)',
        paddingInline: 'var(--spacing-xl)',
      }}
    >
      <motion.section
  aria-labelledby="dashboard-title"
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 70, damping: 18 }}
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
            position: 'absolute',
            width: 1, height: 1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
          }}
        >
          Cloud Cost Dashboard
        </h2>

           {/* Icon row at top */}
          <ResourceIconRow />

          <div style={{ marginBlockStart: 'var(--spacing-xl)' }}>
        {/* Back button — shown when drilled in */}
        {drill.level !== 'cluster' && (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -12 }}
    transition={{ duration: 0.2 }}
  >
    <button
      onClick={handleBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        background: 'none',
        border: '1.5px solid var(--color-border)',
        borderRadius: 'var(--radius-pill)',
        padding: '6px 16px',
        fontSize: 'var(--font-size-sm)',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        marginBlockEnd: 'var(--spacing-md)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      ← Back
    </button>
  </motion.div>
)}

        <DrilldownHeader
          breadcrumb={breadcrumb}
          aggregatedBy={aggregatedBy}
        />

        {/* Error state */}
        {activeQuery.isError && (
          <ErrorBanner
            message="Could not load cost data. Check your connection."
            onRetry={() => activeQuery.refetch()}
          />
        )}

        {/* Loading state */}
        {activeQuery.isLoading && <LoadingSkeleton />}

        {/* Success state */}
       {/* Success state */}
<AnimatePresence mode="wait">
  {activeQuery.isSuccess && items.length > 0 && (
    <motion.div
      key={drill.level + (drill.clusterId ?? '') + (drill.namespaceId ?? '')}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
    >
      <BarChart
        items={toBarChartItems(items)}
        onBarClick={drill.level !== 'pod' ? handleBarClick : undefined}
      />
      <CostTable rows={toCostRows(items)} />
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </motion.section>
    </main>
    </>
  );
}