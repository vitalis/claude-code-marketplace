import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Claude Code Marketplace';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #1e40af, #4338ca)',
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              marginBottom: 20,
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Claude Code Marketplace
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#e0e7ff',
              maxWidth: 900,
            }}
          >
            Discover and install plugins to enhance your Claude Code experience
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
