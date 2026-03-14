// src/components/BarChart/index.tsx

export interface BarChartItem {
  id: string;
  name: string;
  value: number;  // total cost
}

interface BarChartProps {
  items: BarChartItem[];
  onBarClick?: (id: string, name: string) => void;
}

export function BarChart({ items, onBarClick }: BarChartProps) {
  const maxValue = Math.max(...items.map((i) => i.value));

  return (
    // container query wrapper — bars reflow at component level
    <div
      style={{ containerType: 'inline-size', containerName: 'barchart' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 'var(--spacing-lg)',
          alignItems: 'flex-end',
          height: '220px',
          paddingInline: 'var(--spacing-md)',
          marginBlockEnd: 'var(--spacing-md)',
          borderBottom: '1px dashed var(--color-border-dashed)',
          position: 'relative' as const,
        }}
      >
        {/* Dashed horizontal guide lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <div
            key={ratio}
            style={{
              position: 'absolute' as const,
              left: 0,
              right: 0,
              bottom: `${ratio * 100}%`,
              borderTop: '1px dashed var(--color-border-dashed)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Bars */}
        {items.map((item) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                cursor: onBarClick ? 'pointer' : 'default',
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
            >
              <div
                style={{
                  width: '100%',
                  height: `${heightPercent}%`,
                  backgroundColor: 'var(--color-accent-green)',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-sm)',
                  transition: 'filter var(--transition-fast), transform var(--transition-fast)',
                  // hover handled via CSS below — see globals.css addition
                }}
                className="bar-block"
              />
            </div>
          );
        })}
      </div>

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
              textAlign: 'center' as const,
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