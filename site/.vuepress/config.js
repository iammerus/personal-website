import { viteBundler } from '@vuepress/bundler-vite'

import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { seoPlugin } from '@vuepress/plugin-seo'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'


export default defineUserConfig({
  title: 'Melvin Mupondori',
  description: 'Senior Full-stack Engineer & Frontend Architect',
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Experience', link: '/experience' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Hire Me', link: 'mailto:him@mups.co.zw' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          collapsible: false,
          children: [
            '/blog/modern-frontend-architecture',
            '/blog/scaling-vue-applications',
          ],
        },
      ],
    },
    lastUpdatedText: 'Last Updated',
    repo: 'iammerus',
  }),
  plugins: [
    seoPlugin({}),
    sitemapPlugin({})
  ],
  bundler: viteBundler(),
  extraCss: [
    '/styles/styles.scss'
  ]
})
