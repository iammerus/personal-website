import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { fileURLToPath } from 'url'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site: 'https://mups.co.zw',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  build: {
    assets: '_astro',
    // ~29 KiB stylesheet inlined into each page: kills the render-blocking CSS
    // request and lets the browser discover @font-face URLs immediately
    inlineStylesheets: 'always'
  },
  vite: {
    ssr: {
      noExternal: ['gsap']
    },
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger']
    },
    build: {
      rollupOptions: {
        output: {
          // Ensure consistent asset naming for preloading
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
