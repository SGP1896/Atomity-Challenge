// components/LoadingSkeleton/index.tsx

export function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading data"
      style={{ paddingInline: 'var(--spacing-md)' }}
    >
      {/* Fake bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--spacing-lg)',
          alignItems: 'flex-end',
          height: '220px',
          marginBlockEnd: 'var(--spacing-xl)',
        }}
      >
        {[80, 65, 50, 30].map((h, i) => (
          <div
            key={i}
            style={{
              height: `${h}%`,
              borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-sm)',
              background: 'linear-gradient(90deg, var(--color-border) 25%, var(--color-bg-secondary) 50%, var(--color-border) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
            }}
          />
        ))}
      </div>

      {/* Fake table rows */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: '36px',
            marginBlockEnd: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(90deg, var(--color-border) 25%, var(--color-bg-secondary) 50%, var(--color-border) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}

      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Loading...
      </span>
    </div>
  );
}