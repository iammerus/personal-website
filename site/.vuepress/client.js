import { defineClientConfig } from 'vuepress/client'
import ProjectCard from './components/ProjectCard.vue'

export default defineClientConfig({
  rootComponents: [
    ProjectCard
  ]
  // we provide some blog layouts
})
