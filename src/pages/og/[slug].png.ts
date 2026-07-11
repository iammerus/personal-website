import { getCollection } from 'astro:content';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET = async ({ props }) => {
  const { post } = props;
  
  // Provide basic deterministic shapes based on the slug
  const hash = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const routeShapes = [
    '<line x1="200" y1="315" x2="1000" y2="315" stroke="#DADBD2" stroke-width="2" />',
    '<circle cx="200" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" />',
    '<circle cx="1000" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" />',
    `<path d="M 400 315 L 400 ${hash % 2 === 0 ? 150 : 480} L 800 ${hash % 2 === 0 ? 150 : 480} L 800 315" fill="none" stroke="#2F6B5E" stroke-width="2" />`,
    `<circle cx="400" cy="315" r="5" fill="#2F6B5E" />`,
    `<circle cx="800" cy="315" r="5" fill="#2F6B5E" />`
  ].join('');

  // Use JetBrains Mono for OG image (Requires actual font file in production, 
  // we will load it from node_modules/@fontsource/jetbrains-mono/files)
  
  let fontData;
  try {
    const fontPath = path.resolve(
      fileURLToPath(import.meta.url),
      '../../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff'
    );
    fontData = await fs.readFile(fontPath);
  } catch (e) {
    console.error('Could not load font for OG generation', e);
    // Fallback empty font buffer if woff not found
    fontData = Buffer.from('');
  }

  const dateString = post.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const topic = post.data.tags.length > 0 ? post.data.tags[0] : 'notes';

  const markup = html`
    <div style="display: flex; background-color: #DADBD2; width: 1200px; height: 630px; position: relative; font-family: 'JetBrains Mono', monospace; color: #1E211B;">
      
      <!-- Abstract routing SVG background -->
      <svg width="1200" height="630" viewBox="0 0 1200 630" style="position: absolute; top: 0; left: 0;">
        <g dangerouslySetInnerHTML=${{ __html: routeShapes }}></g>
      </svg>
      
      <!-- Content Wrapper -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 80px; z-index: 10;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; font-size: 32px; font-weight: 700; color: #2F6B5E; margin-bottom: 24px;">
              B-${post.id.slice(0,3).toUpperCase()} <!-- Mock ID -->
            </div>
            <div style="display: flex; font-size: 64px; font-weight: 700; max-width: 800px; line-height: 1.1; margin-bottom: 32px;">
              ${post.data.title}
            </div>
            <div style="display: flex; font-size: 32px; color: #6B6D62; max-width: 800px; line-height: 1.4;">
              ${post.data.description.substring(0, 120)}${post.data.description.length > 120 ? '...' : ''}
            </div>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; border: 4px solid #1E211B; border-radius: 50%;">
            <!-- Circuit node mark simplified -->
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
          <div style="display: flex; gap: 40px;">
            <div style="display: flex; color: #6B6D62;">${dateString}</div>
            <div style="display: flex; color: #6B6D62;">${topic}</div>
          </div>
          <div style="display: flex;">Melvin Mupondori</div>
        </div>
        
      </div>
    </div>
  `;

  try {
    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    });

    const resvg = new Resvg(svg, {
      background: '#DADBD2',
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
};
