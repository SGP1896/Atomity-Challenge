// src/components/CostTable/index.tsx

export interface CostRow {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;  // percentage
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

export function CostTable({ rows }: CostTableProps) {
  return (
    <div
      style={{
        overflowX: 'auto' as const,
        paddingInline: 'var(--spacing-md)',
        marginBlockStart: 'var(--spacing-lg)',
      }}
      role="region"
      aria-label="Cost breakdown table"
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse' as const,
          fontSize: 'var(--font-size-sm)',
        }}
      >
        {/* Column headers */}
        <thead>
          <tr>
            <th style={{ width: '120px' }} />
            {COLUMNS.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'center' as const,
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

        {/* Data rows */}
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              style={{
                borderTop: '1px solid var(--color-border)',
                backgroundColor:
                  index % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--color-accent-green) 4%, transparent)',
              }}
            >
              {/* Row label */}
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

              {/* Cost cells */}
              {[row.cpu, row.ram, row.storage, row.network, row.gpu].map(
                (val, i) => (
                  <td
                    key={i}
                    style={{
                      textAlign: 'center' as const,
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

              {/* Efficiency */}
              <td
                style={{
                  textAlign: 'center' as const,
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {fmt(row.efficiency, true)}
              </td>

              {/* Total — bold */}
              <td
                style={{
                  textAlign: 'center' as const,
                  paddingBlock: 'var(--spacing-sm)',
                  paddingInline: 'var(--spacing-sm)',
                  fontWeight: '700',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {fmt(row.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}