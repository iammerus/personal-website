import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/modern-frontend-architecture.html.vue"
const data = JSON.parse("{\"path\":\"/blog/modern-frontend-architecture.html\",\"title\":\"Modern Frontend Architecture: A Deep Dive\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Modern Frontend Architecture: A Deep Dive\",\"date\":\"2024-03-15T00:00:00.000Z\",\"tags\":[\"Architecture\",\"Frontend\",\"Performance\"]},\"headers\":[],\"git\":{},\"filePathRelative\":\"blog/modern-frontend-architecture.md\"}")
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
