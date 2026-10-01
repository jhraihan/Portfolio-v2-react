/**
 * Placeholder block shown while something loads.
 *
 * Content itself is bundled and renders on the first pass, so this now holds
 * space for images while they download. Matching the real shape keeps the
 * layout from jumping, which is what a spinner alone cannot do.
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-elevated ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-line-strong/40 to-transparent" />
    </div>
  )
}
