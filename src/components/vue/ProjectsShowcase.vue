<template>
  <section
    id="projects"
    ref="projectsRef"
    class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <div ref="badgeRef" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 opacity-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          My Work
        </div>
        <h2
          ref="titleRef"
          class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 opacity-0"
        >
          Featured Projects
        </h2>
        <p
          ref="subtitleRef"
          class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 leading-relaxed"
        >
          A showcase of projects that demonstrate my expertise in modern web development, 
          from enterprise platforms to global gaming experiences
        </p>
      </div>
      
      <!-- Filter buttons -->
      <div
        ref="filtersRef"
        class="flex flex-wrap justify-center gap-3 mb-16 opacity-0"
      >
        <button
          v-for="filter in filters"
          :key="filter"
          :class="[
            'px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
            'backdrop-blur-sm border border-white/20 dark:border-gray-700/50',
            activeFilter === filter
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg'
          ]"
          @click="setActiveFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
      
      <!-- Projects grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :image-alt="project.title"
          :category="project.category"
          :tags="project.technologies"
          :interactive="true"
          class="transform transition-all duration-300 hover:scale-[1.02]"
          @click="openProject(project)"
        >
          <template #footer>
            <div class="flex justify-between items-center">
              <div class="flex gap-3">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  @click.stop
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Project
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  @click.stop
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </template>
        </ProjectCard>
      </div>
      
      <!-- Load more button or View All Projects -->
      <div
        v-if="hasMoreProjects"
        ref="loadMoreRef"
        class="text-center mb-8 opacity-0"
      >
        <InteractiveButton
          variant="outline"
          size="lg"
          :loading="loadingMore"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50"
          @click="loadMore"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          Load More Projects
        </InteractiveButton>
      </div>
      
      <!-- View All Projects link -->
      <div class="text-center">
        <a
          href="/portfolio"
          class="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>View All Projects</span>
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Project modal -->
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProject"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import ProjectCard from './ProjectCard.vue'
import InteractiveButton from './InteractiveButton.vue'
import ProjectModal from './ProjectModal.vue'

let gsap: any
let ScrollTriggerPlugin: any

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  challenges: string[]
  solutions: string[]
  features: string[]
}

const projectsRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const filtersRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const loadMoreRef = ref<HTMLElement>()

const activeFilter = ref('All')
const selectedProject = ref<Project | null>(null)
const loadingMore = ref(false)
const visibleCount = ref(3)

const { shouldAnimate } = useScrollAnimation()

const filters = ['All', 'Web Apps', 'SaaS', 'Healthcare', 'E-sports']

// Import projects data directly
import projectsData from '../../../data/projects.json'

// Fallback projects if JSON fails to load
const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Healthcare Management Platform',
    description: 'Enterprise-grade intranet application managing complete patient journey including scheduling and billing.',
    longDescription: 'Architected and led frontend development of an enterprise-grade intranet application managing the complete patient journey including scheduling, insurance verification, and billing systems.',
    image: '/projects/project-image-1.png',
    category: 'Web Apps',
    technologies: ['React', 'Node.js', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    challenges: [],
    solutions: [],
    features: []
  }
]

// Map project data with images
const projectImageMap: Record<string, string> = {
  'Redflag': '/assets/images/projects/redflag.svg',
  'Zeki': '/assets/images/projects/zeki.svg',
  'Integrated Clinical Practice Management System': '/assets/images/projects/community_dental_clinical.png',
  'ePremier League Platform': '/assets/images/projects/epremier_league_logo.webp',
  'Nyaradzo SIP': '/assets/images/projects/sahwira_internation_plan.png'
}

// Transform the JSON data to match our interface
const transformProjectData = (jsonProjects: any[]): Project[] => {
  return jsonProjects.map((project, index) => ({
    id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: project.title,
    description: project.description,
    longDescription: project.problem + ' ' + project.contributions,
    image: projectImageMap[project.title] || '/assets/images/projects/community_dental_clinical.png',
    category: mapProjectCategory(project),
    technologies: project.skills || [],
    liveUrl: project.hasProjectLink ? project.projectLink : undefined,
    githubUrl: undefined, // Remove GitHub button as it's redundant
    challenges: [project.problem],
    solutions: [project.contributions],
    features: project.metrics ? project.metrics.map((m: any) => `${m.value} ${m.description}`) : []
  }))
}

// Map project data to appropriate categories
const mapProjectCategory = (project: any): string => {
  if (project.industry && Array.isArray(project.industry)) {
    const industry = project.industry[0].toLowerCase()
    if (industry.includes('gaming') || industry.includes('esports')) return 'E-sports'
    if (industry.includes('healthcare') || industry.includes('clinical')) return 'Healthcare'
    if (industry.includes('consulting')) return 'Web Apps'
  }
  
  if (project.company) {
    const company = project.company.toLowerCase()
    if (company.includes('dental') || company.includes('healthcare')) return 'Healthcare'
    if (company.includes('gfinity')) return 'E-sports'
  }
  
  if (project.title) {
    const title = project.title.toLowerCase()
    if (title.includes('clinical') || title.includes('healthcare') || title.includes('dental')) return 'Healthcare'
    if (title.includes('premier') || title.includes('league') || title.includes('gaming')) return 'E-sports'
    if (title.includes('platform') || title.includes('system')) return 'SaaS'
  }
  
  return 'Web Apps'
}

const projects = ref<Project[]>([])

// Initialize projects data
const initializeProjects = () => {
  const projectsSource = Array.isArray(projectsData?.projects) ? projectsData.projects : []
  projects.value = transformProjectData(projectsSource)
}

const filteredProjects = computed(() => {
  const filtered = activeFilter.value === 'All' 
    ? projects.value 
    : projects.value.filter(p => p.category === activeFilter.value)
  
  return filtered.slice(0, visibleCount.value)
})

const hasMoreProjects = computed(() => {
  const totalFiltered = activeFilter.value === 'All' 
    ? projects.value.length 
    : projects.value.filter(p => p.category === activeFilter.value).length
  
  return visibleCount.value < totalFiltered
})

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter
  visibleCount.value = 3 // Reset visible count when changing filter
  
  // Animate grid change if GSAP is available
  if (gsap && shouldAnimate.value) {
    gsap.fromTo(gridRef.value?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    )
  }
}

const openProject = (project: Project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

const loadMore = async () => {
  loadingMore.value = true
  
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  visibleCount.value += 3
  loadingMore.value = false
  
  // Animate new items if GSAP is available
  if (gsap && shouldAnimate.value) {
    const newItems = Array.from(gridRef.value?.children || []).slice(-3)
    gsap.fromTo(newItems,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    )
  }
}

onMounted(async () => {
  // Initialize projects data
  initializeProjects()
  
  // Dynamically import GSAP only on client-side
  if (typeof window !== 'undefined') {
    const { gsap: gsapImport } = await import('gsap')
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
    
    gsap = gsapImport
    ScrollTriggerPlugin = ScrollTrigger
    gsap.registerPlugin(ScrollTriggerPlugin)
    
    setupAnimations()
  }
})

const setupAnimations = () => {
  if (!gsap || !ScrollTriggerPlugin) return
  
  const { shouldAnimate } = useScrollAnimation()
  
  if (!shouldAnimate.value) {
    gsap.set([badgeRef.value, titleRef.value, subtitleRef.value, filtersRef.value, loadMoreRef.value], { opacity: 1 })
    return
  }

  // Stagger timeline for header elements
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: badgeRef.value,
      start: 'top 80%'
    }
  })

  headerTl
    .fromTo(badgeRef.value,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(titleRef.value,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(subtitleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.7'
    )

  // Filters animation
  if (filtersRef.value) {
    gsap.fromTo(filtersRef.value?.children || [],
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: filtersRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Grid animation
  if (gridRef.value) {
    gsap.fromTo(gridRef.value?.children || [],
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Load more button animation
  if (loadMoreRef.value) {
    gsap.fromTo(loadMoreRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: loadMoreRef.value,
          start: 'top 80%'
        }
      }
    )
  }
}
</script>
