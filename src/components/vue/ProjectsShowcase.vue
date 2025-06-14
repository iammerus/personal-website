<template>
  <section
    id="projects"
    ref="projectsRef"
    class="py-20 bg-gray-50 dark:bg-gray-800"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2
          ref="titleRef"
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 opacity-0"
        >
          Featured Projects
        </h2>
        <p
          ref="subtitleRef"
          class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0"
        >
          A showcase of projects that demonstrate my expertise in modern web development
        </p>
      </div>
      
      <!-- Filter buttons -->
      <div
        ref="filtersRef"
        class="flex flex-wrap justify-center gap-4 mb-12 opacity-0"
      >
        <button
          v-for="filter in filters"
          :key="filter"
          :class="[
            'px-6 py-2 rounded-full font-medium transition-all duration-300',
            activeFilter === filter
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
          ]"
          @click="setActiveFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
      
      <!-- Projects grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          @click="openProject(project)"
        >
          <template #footer>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  @click.stop
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
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
      
      <!-- Load more button -->
      <div
        v-if="hasMoreProjects"
        ref="loadMoreRef"
        class="text-center mt-12 opacity-0"
      >
        <InteractiveButton
          variant="outline"
          size="lg"
          :loading="loadingMore"
          @click="loadMore"
        >
          Load More Projects
        </InteractiveButton>
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import ProjectCard from './ProjectCard.vue'
import InteractiveButton from './InteractiveButton.vue'
import ProjectModal from './ProjectModal.vue'

gsap.registerPlugin(ScrollTrigger)

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
const filtersRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const loadMoreRef = ref<HTMLElement>()

const activeFilter = ref('All')
const selectedProject = ref<Project | null>(null)
const loadingMore = ref(false)
const visibleCount = ref(6)

const { shouldAnimate } = useScrollAnimation()

const filters = ['All', 'Web Apps', 'E-commerce', 'SaaS', 'Mobile']

const projects: Project[] = [
  {
    id: '1',
    title: 'Healthcare Management Platform',
    description: 'Enterprise-grade intranet application managing complete patient journey including scheduling and billing.',
    longDescription: 'Architected and led frontend development of an enterprise-grade intranet application managing the complete patient journey including scheduling, insurance verification, and billing systems using React and shadcn/ui.',
    image: '/projects/project-image-1.png',
    category: 'Web Apps',
    technologies: ['React', 'shadcn/ui', 'Redux', 'Node.js', 'Laravel', 'AWS RDS'],
    liveUrl: '#',
    githubUrl: '#',
    challenges: [
      'Managing complex state across multiple interconnected modules',
      'Handling large datasets with optimal performance',
      'Integrating with legacy healthcare systems'
    ],
    solutions: [
      'Implemented Redux with normalized state structure',
      'Used virtual scrolling and pagination',
      'Built robust API abstraction layer'
    ],
    features: [
      'Patient scheduling system',
      'Insurance verification workflow',
      'Real-time billing updates',
      'Role-based access control'
    ]
  },
  {
    id: '2',
    title: 'Dealership Management System',
    description: 'Multi-industry platform for powersports, marine, and RV dealerships with advanced search capabilities.',
    longDescription: 'Developed a responsive dealership management system using Vue.js and NaiveUI that integrated with diverse legacy Dealer Management Systems across powersports, marine, and RV industries.',
    image: '/projects/project-image-2.png',
    category: 'Web Apps',
    technologies: ['Vue.js', 'NaiveUI', 'Laravel', 'Elasticsearch', 'Redis'],
    liveUrl: '#',
    githubUrl: '#',
    challenges: [
      'Integrating with multiple legacy systems',
      'Optimizing search performance across large datasets',
      'Normalizing disparate data formats'
    ],
    solutions: [
      'Built modular integration framework',
      'Optimized Elasticsearch configuration',
      'Created data transformation pipelines'
    ],
    features: [
      'Inventory management',
      'Advanced search and filtering',
      'Multi-dealer support',
      'Real-time data synchronization'
    ]
  },
  {
    id: '3',
    title: 'F1 Esports Platform',
    description: 'Real-time tournament system handling 100K+ concurrent users for Formula 1 esports competitions.',
    longDescription: 'Developed key components for the F1 Esports platform using Vue 3, Nuxt, and NaiveUI, including dynamic results ingestion, real-time standings updates, and comprehensive race control admin dashboards.',
    image: '/projects/project-image-3.png',
    category: 'SaaS',
    technologies: ['Vue 3', 'Nuxt', 'WebSocket', 'Redis', 'PHP'],
    liveUrl: '#',
    githubUrl: '#',
    challenges: [
      'Handling 100K+ concurrent users',
      'Real-time data synchronization',
      'Complex tournament bracket generation'
    ],
    solutions: [
      'Implemented WebSocket with Redis Pub/Sub',
      'Used efficient state management',
      'Built scalable bracket algorithms'
    ],
    features: [
      'Real-time race tracking',
      'Tournament bracket management',
      'Live standings updates',
      'Admin race control dashboard'
    ]
  },
  {
    id: '4',
    title: 'E-commerce Analytics Dashboard',
    description: 'Comprehensive analytics platform for e-commerce businesses with real-time reporting.',
    longDescription: 'Built a comprehensive analytics dashboard that provides real-time insights into e-commerce performance, customer behavior, and sales trends.',
    image: '/projects/project-image-4.png',
    category: 'E-commerce',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    challenges: [
      'Processing large amounts of real-time data',
      'Creating intuitive data visualizations',
      'Ensuring data accuracy and consistency'
    ],
    solutions: [
      'Implemented efficient data aggregation',
      'Used optimized charting libraries',
      'Built comprehensive data validation'
    ],
    features: [
      'Real-time sales monitoring',
      'Customer behavior analytics',
      'Inventory tracking',
      'Performance reports'
    ]
  }
]

const filteredProjects = computed(() => {
  const filtered = activeFilter.value === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter.value)
  
  return filtered.slice(0, visibleCount.value)
})

const hasMoreProjects = computed(() => {
  const totalFiltered = activeFilter.value === 'All' 
    ? projects.length 
    : projects.filter(p => p.category === activeFilter.value).length
  
  return visibleCount.value < totalFiltered
})

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter
  visibleCount.value = 6 // Reset visible count when changing filter
  
  // Animate grid change
  if (shouldAnimate.value) {
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
  
  visibleCount.value += 6
  loadingMore.value = false
  
  // Animate new items
  if (shouldAnimate.value) {
    const newItems = Array.from(gridRef.value?.children || []).slice(-6)
    gsap.fromTo(newItems,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    )
  }
}

onMounted(() => {
  if (!shouldAnimate.value) {
    gsap.set([titleRef.value, subtitleRef.value, filtersRef.value, loadMoreRef.value], { opacity: 1 })
    return
  }

  // Title animations
  gsap.fromTo(titleRef.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.value,
        start: 'top 80%'
      }
    }
  )

  gsap.fromTo(subtitleRef.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: subtitleRef.value,
        start: 'top 80%'
      }
    }
  )

  // Filters animation
  gsap.fromTo(filtersRef.value,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: filtersRef.value,
        start: 'top 80%'
      }
    }
  )

  // Load more button animation
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
})
</script>
