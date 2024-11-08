import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/scaling-vue-applications.html.vue"
const data = JSON.parse("{\"path\":\"/blog/scaling-vue-applications.html\",\"title\":\"Scaling Vue Applications: Lessons Learned\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Scaling Vue Applications: Lessons Learned\",\"date\":\"2024-02-28T00:00:00.000Z\",\"tags\":[\"Vue.js\",\"Performance\",\"Architecture\"]},\"headers\":[],\"git\":{},\"filePathRelative\":\"blog/scaling-vue-applications.md\"}")
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
