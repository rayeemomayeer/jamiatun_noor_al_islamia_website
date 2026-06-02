import { ImageResponse } from 'next/og';

export const alt = 'Jamiatun Noor Al Islamia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default branded OG image — emerald + parchment + gold (BLUEPRINT §9.2).
 * Served at /opengraph-image; referenced in metadata as /og/default.png fallback.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F5A34',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parchment inner panel */}
      <div
        style={{
          position: 'absolute',
          inset: 40,
          background: '#FCF9EA',
          borderRadius: 16,
          border: '3px solid #C9A227',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        {/* Gold eyebrow */}
        <p
          style={{
            fontFamily: 'serif',
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C9A227',
            margin: 0,
          }}
        >
          ESTABLISHED IN PURSUIT OF SACRED KNOWLEDGE
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'serif',
            fontSize: 64,
            fontWeight: 700,
            color: '#0F5A34',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Jamiatun Noor
          <br />
          Al Islamia
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 2,
            background: '#C9A227',
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'serif',
            fontSize: 22,
            color: '#5A6B5F',
            margin: 0,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Nurturing scholars of the Qur&apos;an and Sunnah with depth,
          discipline, and devotion.
        </p>
      </div>

      {/* Corner ornaments */}
      {[
        { top: 48, left: 48 },
        { top: 48, right: 48 },
        { bottom: 48, left: 48 },
        { bottom: 48, right: 48 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 32,
            height: 32,
            border: '2px solid #C9A227',
            borderRadius: 2,
            ...pos,
          }}
        />
      ))}
    </div>,
    { width: 1200, height: 630 }
  );
}
