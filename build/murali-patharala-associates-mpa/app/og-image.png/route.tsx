import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export async function GET() {
  const logo = await readFile(
    join(
      process.cwd(),
      'public/mpa-3d-logo-social.png',
    ),
  );
  const logoData = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '58px 70px',
        color: '#f7f1e9',
        backgroundColor: '#1a1918',
        borderTop: '10px solid #f1743a',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        {/* ImageResponse accepts data images; this keeps the supplied artwork exact. */}
        <img src={logoData} width={144} height={144} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ fontSize: 37, fontWeight: 700, letterSpacing: -1 }}>
            murali patharala
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 5,
              color: '#f49a66',
            }}
          >
            &amp; ASSOCIATES
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 700, lineHeight: 1.12 }}>
          <span>Architecture. Construction.</span>
          <span>Bespoke Interiors.</span>
        </div>
        <div style={{ fontSize: 25, color: '#dfd0c5' }}>
          Thoughtful spaces, built from first sketch to handover.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 22,
          borderTop: '1px solid #6e5143',
          fontSize: 18,
          color: '#e5b297',
        }}
      >
        <span>ANNA NAGAR EAST · CHENNAI</span>
        <span>MPA + ARCH FOUNDATIONS</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
