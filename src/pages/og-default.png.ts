import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import path from 'path';

// Default OG sheet for pages without a generated article image
// (home, work, writing index, about). Light palette per spec §16.
export const GET = async () => {
  const fontPath = path.join(
    process.cwd(),
    'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff'
  );
  const fontData = await fs.readFile(fontPath);

  const routeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><g opacity="0.3"><line x1="200" y1="315" x2="1000" y2="315" stroke="#6B6D62" stroke-width="2" /><circle cx="200" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" /><circle cx="1000" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" /><circle cx="600" cy="315" r="5" fill="#2F6B5E" /></g></svg>`;
  const routeBg = `url(data:image/svg+xml;base64,${Buffer.from(routeSvg).toString('base64')})`;

  const markup = html`
    <div style="display: flex; background-color: #DADBD2; background-image: ${routeBg}; background-size: 1200px 630px; width: 1200px; height: 630px; position: relative; font-family: 'JetBrains Mono', monospace; color: #1E211B;">
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 80px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; font-size: 72px; font-weight: 700; margin-bottom: 32px;">
              Melvin Mupondori
            </div>
            <div style="display: flex; font-size: 34px; color: #6B6D62; max-width: 820px; line-height: 1.4;">
              I build software, tinker with hardware, and spend an unreasonable amount of time figuring out how things work.
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; border: 4px solid #1E211B; border-radius: 50%;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E211B" stroke-width="2">
              <circle cx="4" cy="12" r="2" />
              <line x1="6" y1="12" x2="12" y2="12" />
              <circle cx="14" cy="12" r="2" />
              <line x1="16" y1="12" x2="20" y2="8" />
              <circle cx="20" cy="6" r="2" />
            </svg>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%; font-size: 28px; font-weight: 700;">
          <div style="display: flex; color: #2F6B5E;">mups.co.zw</div>
          <div style="display: flex; color: #6B6D62;">Harare, ZW</div>
        </div>
      </div>
    </div>
  `;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'JetBrains Mono', data: fontData, weight: 700, style: 'normal' }],
  });

  const resvg = new Resvg(svg, { background: '#DADBD2', fitTo: { mode: 'width', value: 1200 } });
  return new Response(resvg.render().asPng(), {
    headers: { 'Content-Type': 'image/png' },
  });
};
