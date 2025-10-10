import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Claude Code Plugin Marketplaces';
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
          background: '#faf9f5',
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
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              marginBottom: 20,
              color: '#d97757',
            }}
          >
            Claude Code Plugin Marketplaces
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#141413',
              maxWidth: 900,
            }}
          >
            Discover and install plugin marketplaces to enhance your Claude Code experience
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
