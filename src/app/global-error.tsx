'use client';

// Catches errors in the root layout itself; must render its own <html>/<body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontFamily: 'Georgia, serif',
          background: '#fcf9ea',
          color: '#1c2b22',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', color: '#0f5a34' }}>
          Something went wrong
        </h1>
        {error.digest ? (
          <p style={{ color: '#5a6b5f' }}>Reference: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#0f5a34',
            color: '#fcf9ea',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.625rem 1.25rem',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
