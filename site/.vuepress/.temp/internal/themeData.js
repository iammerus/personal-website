export const themeData = JSON.parse("{\"logo\":\"/images/logo.png\",\"navbar\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"About\",\"link\":\"/about\"},{\"text\":\"Experience\",\"link\":\"/experience\"},{\"text\":\"Projects\",\"link\":\"/projects\"},{\"text\":\"Blog\",\"link\":\"/blog/\"},{\"text\":\"Hire Me\",\"link\":\"mailto:him@mups.co.zw\"}],\"sidebar\":{\"/blog/\":[{\"text\":\"Blog Posts\",\"collapsible\":false,\"children\":[\"/blog/modern-frontend-architecture\",\"/blog/scaling-vue-applications\"]}]},\"lastUpdatedText\":\"Last Updated\",\"repo\":\"iammerus\",\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
