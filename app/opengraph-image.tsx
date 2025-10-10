import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Claude Code Plugins - Discover and Install Extensions';
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
            Claude Code Plugins
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#141413',
              maxWidth: 900,
            }}
          >
            Discover and install plugins to extend your AI coding assistant
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
