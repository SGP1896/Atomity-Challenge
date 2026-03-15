// components/ErrorBanner/index.tsx

interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorBanner({
  message = 'Failed to load data.',
  onRetry,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-md)',
        backgroundColor: 'color-mix(in srgb, var(--color-accent-error) 10%, transparent)',
        border: '1px solid var(--color-accent-error)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        marginBlockEnd: 'var(--spacing-lg)',
      }}
    >
      <span style={{ color: 'var(--color-accent-error)', fontWeight: '500' }}>
        ⚠ {message}
      </span>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'var(--color-accent-error)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 16px',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}