import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/images/hero.jpg\",\"heroText\":\"Hi, I'm Melvin 👋\",\"tagline\":\"Senior Full-stack Engineer passionate about building performant web applications\",\"actionText\":\"Get to know me →\",\"actionLink\":\"/about/\",\"features\":[{\"title\":\"Frontend Expert\",\"details\":\"Specialized in Vue.js and React ecosystems with a focus on performance and accessibility.\"},{\"title\":\"Full-Stack Developer\",\"details\":\"Experience with Node.js, Laravel, and cloud infrastructure (AWS, GCP).\"},{\"title\":\"Open Source Contributor\",\"details\":\"Active contributor to various open source projects including Paynow ZW.\"}],\"footer\":\"Made with ❤️ using VuePress | Copyright © 2024 Melvin Mupondori\"},\"headers\":[{\"level\":2,\"title\":\"Latest Blog Posts\",\"slug\":\"latest-blog-posts\",\"link\":\"#latest-blog-posts\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"index.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
