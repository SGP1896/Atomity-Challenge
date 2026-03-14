// src/components/DrilldownHeader/index.tsx

import { Badge } from '@/components/Badge';

interface DrilldownHeaderProps {
  timeRange?: string;
  breadcrumb: string;      // e.g. "Cluster" or "Cluster A - Namespace"
  aggregatedBy: string;    // e.g. "Cluster" or "Namespace"
}

export function DrilldownHeader({
  timeRange = 'Last 30 Days',
  breadcrumb,
  aggregatedBy,
}: DrilldownHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-md)',
        marginBlockEnd: 'var(--spacing-xl)',
        paddingInline: 'var(--spacing-md)',
      }}
    >
      {/* Time range pill — outline style */}
      <Badge label={timeRange} variant="outline" />

      {/* Breadcrumb + aggregation badge */}
      <Badge
        label={breadcrumb}
        sublabel={aggregatedBy}
        variant="solid"
      />
    </header>
  );
}