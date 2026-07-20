import { getCollection } from 'astro:content';
import { getArticleNumber, sortArticlesNewestFirst } from '../../lib/articles';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
  const sortedPosts = sortArticlesNewestFirst(posts);
  return sortedPosts.map((post) => ({
    params: { slug: post.id },
    props: {
      post,
      articleNumber: getArticleNumber(posts, post.id),
    },
  }));
}

export const GET = async ({ props }) => {
  const { post, articleNumber } = props;
  
  // Provide basic deterministic shapes based on the slug
  const hash = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const routeShapes = [
    '<line x1="200" y1="315" x2="1000" y2="315" stroke="#6B6D62" stroke-width="2" />',
    '<circle cx="200" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" />',
    '<circle cx="1000" cy="315" r="10" fill="#1E211B" stroke="#DADBD2" stroke-width="2" />',
    `<path d="M 400 315 L 400 ${hash % 2 === 0 ? 150 : 480} L 800 ${hash % 2 === 0 ? 150 : 480} L 800 315" fill="none" stroke="#2F6B5E" stroke-width="2" />`,
    `<circle cx="400" cy="315" r="5" fill="#2F6B5E" />`,
    `<circle cx="800" cy="315" r="5" fill="#2F6B5E" />`
  ].join('');

  // Astro build runs from the project root, so anchor the font path there.
  // No fallback: a missing font must fail the build loudly.
  const fontPath = path.join(
    process.cwd(),
    'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff'
  );
  const fontData = await fs.readFile(fontPath);

  const dateString = post.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const topic = post.data.tags.length > 0 ? post.data.tags[0] : 'notes';

  // satori-html escapes interpolated markup, so the route diagram goes in as a
  // data-URI background image instead of inline SVG children.
  // Watermark opacity so the route never fights the type
  const routeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><g opacity="0.3">${routeShapes}</g></svg>`;
  const routeBg = `url(data:image/svg+xml;base64,${Buffer.from(routeSvg).toString('base64')})`;

  const markup = html`
    <div style="display: flex; background-color: #DADBD2; background-image: ${routeBg}; background-size: 1200px 630px; width: 1200px; height: 630px; position: relative; font-family: 'JetBrains Mono', monospace; color: #1E211B;">
      
      <!-- Content Wrapper -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 80px; z-index: 10;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; font-size: 32px; font-weight: 700; color: #2F6B5E; margin-bottom: 24px;">
              ${articleNumber}
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
    // Rethrow so the build fails — never serve a non-PNG body from this endpoint.
    console.error('Error generating OG image:', error);
    throw error;
  }
};
