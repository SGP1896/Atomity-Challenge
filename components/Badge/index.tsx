// src/components/Badge/index.tsx

interface BadgeProps {
  label: string;
  sublabel?: string;
  variant?: 'solid' | 'outline';
}

export function Badge({ label, sublabel, variant = 'solid' }: BadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      {/* Main pill */}
      <div
        style={{
          backgroundColor:
            variant === 'solid'
              ? 'var(--color-accent-green)'
              : 'transparent',
          color:
            variant === 'solid'
              ? 'var(--color-text-primary)'
              : 'var(--color-text-primary)',
          border:
            variant === 'outline'
              ? '1.5px solid var(--color-border)'
              : 'none',
          borderRadius: 'var(--radius-pill)',
          padding: '6px 20px',
          fontWeight: '700',
          fontSize: 'var(--font-size-base)',
          whiteSpace: 'nowrap' as const,
        }}
      >
        {label}
      </div>

      {/* Sublabel tooltip below */}
      {sublabel && (
        <div
          style={{
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 12px',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-bg-card)',
            textAlign: 'center' as const,
          }}
        >
          <span style={{ color: 'var(--color-text-muted)' }}>Aggregated by:</span>
          <br />
          <strong>{sublabel}</strong>
        </div>
      )}
    </div>
  );
}