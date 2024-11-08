import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/index.html.vue"
const data = JSON.parse("{\"path\":\"/blog/\",\"title\":\"Blog\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Blog\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"blog/index.md\"}")
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
