# Atomity Frontend Challenge

**Live Demo:** https://subodhatomity.vercel.app/ <br/>
**GitHub:** https://github.com/SGP1896/Atomity-Challenge

---

## Feature Chosen — Option A (0:30–0:40)

I chose the **drill-down cost breakdown dashboard** — a three-level
interactive view (Cluster → Namespace → Pod) showing cloud resource
costs with animated bar charts and a detailed cost table.

I picked this over Option B because it offered more surface area for
animation craft: the drill-down transition, staggered bar growth, and
count-up numbers all work together to create a coherent motion story
rather than isolated effects.

---

## Animation Approach

All animations use **Framer Motion** with spring physics
(`type: 'spring'`) rather than duration-based easing. This makes
motion feel physical and natural instead of mechanical.

**Scroll-triggered entrance** — `useInView` with `once: true` fires
each animation exactly once when the element enters the viewport.
Bars and table rows use `staggerChildren` so they cascade in rather
than appearing all at once.

**Drill-down transitions** — `AnimatePresence` with `mode="wait"`
ensures the outgoing content fully exits before new content enters.
The key prop changes on every drill level so Framer Motion treats
each level as a distinct element.

**Count-up numbers** — a custom `useCountUp` hook uses
`requestAnimationFrame` with cubic ease-out to animate totals from
zero. This draws the eye to the data at the moment it appears.

**Reduced motion** — a `useReducedMotion` hook listens to the
`prefers-reduced-motion` media query. When active, all animation
durations drop to zero and stagger delays are removed. No content
is hidden — only motion is disabled.

---

## Token & Styling Architecture

The project uses a two-layer token system:

**Layer 1 — CSS custom properties** (`globals.css`):
All raw values live here once. Dark mode swaps the same variable
names under `[data-theme="dark"]` — no component ever checks
which theme is active.
```css
:root {
  --color-accent-green: #4ade80;
  --color-bg-primary: #f4f6f4;
}
[data-theme="dark"] {
  --color-bg-primary: #0d1a0d;
}
```

**Layer 2 — TypeScript token map** (`tokens/index.ts`):
Components import from this typed map instead of writing raw
CSS variable strings. This gives autocomplete, prevents typos,
and makes global refactoring instant.

**Modern CSS features used:**
- `clamp()` — fluid typography that scales between breakpoints
  without media queries
- `@container` — bar chart reflows at component level, not
  viewport level
- `color-mix()` — alternating table row tints and shadow colors
  derived from the accent green without hardcoding new values
- Logical properties (`margin-inline`, `padding-block`) —
  layout properties that adapt to writing direction

---

## Data Fetching & Caching

**API:** JSONPlaceholder (`/users`, `/posts`, `/comments`)
mapped to Clusters, Namespaces, and Pods via a deterministic
cost generator in `lib/dataMapper.ts`. Same ID always produces
the same costs — data feels consistent across navigations.

**Caching:** TanStack Query with:
- `staleTime: 5 minutes` — no refetch while data is fresh
- `gcTime: 10 minutes` — unused cache kept in memory
- `enabled` guard — namespace/pod queries only fire when a
  parent ID exists
- `refetchOnWindowFocus: false` — no surprise refetches

**Result:** First visit fetches once per level. Back navigation
is instant with zero network requests — verifiable in DevTools
Network tab.

**States handled:** loading skeleton (shimmer animation), error
banner with retry button, and success state with full content.

---

## Libraries Used

| Library | Why |
|---------|-----|
| **Next.js 16 (App Router)** | Required by challenge |
| **TypeScript** | Type safety across all components and hooks |
| **Tailwind CSS** | Utility classes for responsive layout |
| **Framer Motion** | Spring physics, `AnimatePresence`, `useInView` |
| **TanStack Query v5** | Caching, async state, `enabled` queries |
| **Axios** | Cleaner API calls with typed responses |

No pre-built UI component libraries were used. Every component
— cards, badges, table, icons — was built from scratch.

---

## Project Structure
```
atomity-challenge/
  app/
    page.tsx          ← drill state, data wiring, layout
    layout.tsx        ← QueryClientProvider, fonts
    globals.css       ← CSS variables, tokens, keyframes
  components/
    Badge/            ← pill label, outline + solid variants
    BarChart/         ← animated proportional bars
    CostTable/        ← staggered rows, count-up totals
    DrilldownHeader/  ← breadcrumb + aggregation badge
    ErrorBanner/      ← error state with retry
    LoadingSkeleton/  ← shimmer placeholder
    ResourceIcon/     ← inline SVG icon cards
    ResourceIconRow/  ← scroll-triggered icon stagger
    ThemeToggle/      ← dark/light toggle
  hooks/
    useClusterData.ts ← TanStack Query hooks (3 levels)
    useCountUp.ts     ← rAF-based number animation
    useReducedMotion.ts ← prefers-reduced-motion listener
  lib/
    api.ts            ← fetch functions
    adapters.ts       ← DrillItem → component prop shapes
    dataMapper.ts     ← API response → DrillItem
    queryClient.ts    ← TanStack Query config
  tokens/
    index.ts          ← typed CSS variable references
  types/
    index.ts          ← DrillItem, DrillState, ResourceCosts
```

---

## Tradeoffs & Decisions

**JSONPlaceholder instead of real cloud data** — the challenge
requires a public API. I mapped their response shapes to cloud
cost data deterministically so numbers are consistent and
realistic-looking without being hardcoded.

**Inline SVGs over an icon library** — the challenge explicitly
forbids pre-built component libraries. Drawing SVGs inline also
means zero extra bundle size and full control over stroke style.

**CSS variables for dark mode over `next-themes`** — a single
`data-theme` attribute swap is simpler, faster, and requires no
extra dependency. The tradeoff is no SSR persistence of theme
preference (theme resets on page reload).

**Spring physics for all animations** — springs feel more natural
than duration-based easing but are harder to time precisely.
I tuned `stiffness` and `damping` manually for each animation
context rather than using a single global preset.

---

## What I'd Improve With More Time

- **Theme persistence** — save dark/light preference to
  `localStorage` and read it on mount to avoid flash
- **Real tooltips on bars** — show a breakdown popover on
  hover with CPU/RAM/Storage split
- **Transition between bar heights** — when drilling back up,
  animate bars morphing from pod heights back to cluster heights
- **E2E tests** — Playwright tests for the drill-down flow and
  caching verification
- **Error boundaries** — React error boundaries around each
  section so one failure doesn't crash the whole dashboard
