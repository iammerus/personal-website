import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/about.html.vue"
const data = JSON.parse("{\"path\":\"/about.html\",\"title\":\"About Me\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"About Me\"},\"headers\":[{\"level\":2,\"title\":\"My Journey 🌍\",\"slug\":\"my-journey-🌍\",\"link\":\"#my-journey-🌍\",\"children\":[]},{\"level\":2,\"title\":\"What I Do 🔧\",\"slug\":\"what-i-do-🔧\",\"link\":\"#what-i-do-🔧\",\"children\":[]},{\"level\":2,\"title\":\"Get in Touch 👋\",\"slug\":\"get-in-touch-👋\",\"link\":\"#get-in-touch-👋\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"about.md\"}")
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
