import comp from "Z:/Personal/personal-website/site/.vuepress/.temp/pages/projects.html.vue"
const data = JSON.parse("{\"path\":\"/projects.html\",\"title\":\"Projects\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Projects\"},\"headers\":[{\"level\":2,\"title\":\"Senior Full-stack Engineer | Community Dental Partners\",\"slug\":\"senior-full-stack-engineer-community-dental-partners\",\"link\":\"#senior-full-stack-engineer-community-dental-partners\",\"children\":[]},{\"level\":2,\"title\":\"Software Engineer | OperateBeyond\",\"slug\":\"software-engineer-operatebeyond\",\"link\":\"#software-engineer-operatebeyond\",\"children\":[]},{\"level\":2,\"title\":\"Software Engineer | Gfinity PLC\",\"slug\":\"software-engineer-gfinity-plc\",\"link\":\"#software-engineer-gfinity-plc\",\"children\":[]},{\"level\":2,\"title\":\"Full-stack Developer | AM Agency\",\"slug\":\"full-stack-developer-am-agency\",\"link\":\"#full-stack-developer-am-agency\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"projects.md\"}")
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
