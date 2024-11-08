export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About Me"} }],
  ["/experience.html", { loader: () => import(/* webpackChunkName: "experience.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/experience.html.js"), meta: {"title":"Experience"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/projects.html", { loader: () => import(/* webpackChunkName: "projects.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/projects.html.js"), meta: {"title":"Projects"} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"Blog"} }],
  ["/blog/modern-frontend-architecture.html", { loader: () => import(/* webpackChunkName: "blog_modern-frontend-architecture.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/modern-frontend-architecture.html.js"), meta: {"title":"Modern Frontend Architecture: A Deep Dive"} }],
  ["/blog/scaling-vue-applications.html", { loader: () => import(/* webpackChunkName: "blog_scaling-vue-applications.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/blog/scaling-vue-applications.html.js"), meta: {"title":"Scaling Vue Applications: Lessons Learned"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"Z:/Personal/personal-website/site/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
