/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.7',
            h1: {
              marginTop: '2em',
              marginBottom: '1em',
            },
            h2: {
              marginTop: '2em', 
              marginBottom: '1em',
            },
            h3: {
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            p: {
              marginBottom: '1.5em',
            },
            code: {
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              padding: '1.5rem',
              borderRadius: '0.5rem',
              margin: '2rem 0',
            },
            blockquote: {
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              margin: '2rem 0',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: ['class', '.darkmode'],
}
