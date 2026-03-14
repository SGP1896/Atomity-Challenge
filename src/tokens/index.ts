// src/tokens/index.ts
// All components reference these — never use raw hex values in components

export const tokens = {
  colors: {
    bgPrimary: 'var(--color-bg-primary)',
    bgSecondary: 'var(--color-bg-secondary)',
    bgCard: 'var(--color-bg-card)',

    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',

    accentGreen: 'var(--color-accent-green)',
    accentGreenLight: 'var(--color-accent-green-light)',
    accentGreenDark: 'var(--color-accent-green-dark)',

    accentError: 'var(--color-accent-error)',
    accentSuccess: 'var(--color-accent-success)',

    border: 'var(--color-border)',
    borderDashed: 'var(--color-border-dashed)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    xxl: 'var(--spacing-xxl)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    pill: 'var(--radius-pill)',
  },
  font: {
    sizeBase: 'var(--font-size-base)',
    sizeSm: 'var(--font-size-sm)',
    sizeLg: 'var(--font-size-lg)',
    sizeXl: 'var(--font-size-xl)',
    weightNormal: '400',
    weightMedium: '500',
    weightBold: '700',
  },
  transition: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
    slow: 'var(--transition-slow)',
  },
} as const;