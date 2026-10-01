import { useEffect, useRef, useState } from 'react'
import { ImageIcon } from 'lucide-react'

import { Skeleton } from './Skeleton'

/**
 * Renders an image, or a designed placeholder when none exists yet.
 *
 * The placeholder is deliberate rather than apologetic: it holds the correct
 * aspect ratio and reads as part of the design — a dotted field with a faint
 * label — so a project without screenshots never looks broken or unfinished.
 * Dropping a real image in later requires no other change.
 *
 * While the image downloads, a shimmer skeleton holds its space.
 */
export function ImageFrame({
  src,
  // Optional responsive sources, so a small frame never downloads the
  // full-size file.
  srcSet,
  sizes,
  alt,
  label,
  aspect = 'aspect-[16/10]',
  className = '',
  loading = 'lazy',
  // 'cover' fills the frame and crops; 'contain' fits the whole image inside
  // it, which suits wide desktop screenshots that must not lose their edges.
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)
  const showPlaceholder = !src || failed

  // An image served from cache can finish before React attaches onLoad. Check
  // once on mount so a missed event can never leave the image hidden.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [src])

  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-elevated ${aspect} ${className}`}
    >
      {showPlaceholder ? (
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-dots"
          role="img"
          aria-label={alt || 'Screenshot not yet available'}
        >
          {/* Corner ticks, which read as a crop frame rather than an error. */}
          <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-line-strong" aria-hidden="true" />
          <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-line-strong" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-line-strong" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-line-strong" aria-hidden="true" />

          <ImageIcon
            className="h-7 w-7 text-ink-faint/50"
            aria-hidden="true"
            strokeWidth={1.25}
          />
          {label && (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint/60">
              {label}
            </span>
          )}
        </div>
      ) : (
        <>
          {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            loading={loading}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`relative h-full w-full transition-opacity duration-500 ${
              fit === 'contain' ? 'object-contain' : 'object-cover'
            } ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  )
}
