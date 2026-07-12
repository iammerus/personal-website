import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return rss({
    title: 'Melvin Mupondori',
    description: 'Notes on software, infrastructure, hardware experiments, mistakes and the process of figuring out how systems work.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      // Compute Canonical link or fallback to site URL
      link: post.data.canonical || `/blog/${post.id}/`,
      // Add optional updated date if it exists
      ...(post.data.updated && { customData: `<updated>${post.data.updated.toUTCString()}</updated>` }),
    })),
    customData: `<language>en-gb</language>`,
  });
}
