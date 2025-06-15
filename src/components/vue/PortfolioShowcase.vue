<template>
  <section
    id="portfolio"
    ref="portfolioRef"
    class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
  >
    <!-- Enhanced Background decorative elements with subtle animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"
      ></div>
      <div 
        class="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float-delayed"
      ></div>
      <div 
        class="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl animate-float-slow"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <div 
          ref="badgeRef" 
          class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 transform hover:scale-105 transition-all duration-300 cursor-default opacity-0"
        >
          <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Portfolio
        </div>
        <h1
          ref="titleRef"
          class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 opacity-0"
        >
          My Work & Projects
        </h1>
        <p
          ref="subtitleRef"
          class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 leading-relaxed"
        >
          A showcase of real-world projects and technical achievements, featuring scalable web applications and enterprise solutions
        </p>
      </div>
      
      <!-- Enhanced Search Section -->
      <div ref="searchRef" class="mb-12 opacity-0">
        <div class="max-w-4xl mx-auto">
          <div class="relative group">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search projects by name, technology, or company..."
              class="w-full px-6 py-4 pl-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg group-hover:shadow-xl"
              @input="handleSearch"
            >
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button 
              v-if="searchQuery" 
              @click="clearSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Category Filters -->
      <div
        ref="filtersRef"
        class="flex flex-wrap justify-center gap-3 mb-8 opacity-0"
      >
        <button
          v-for="(category, index) in categories"
          :key="category"
          :class="[
            'relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1',
            'backdrop-blur-sm border border-white/20 dark:border-gray-700/50 group overflow-hidden',
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg'
          ]"
          @click="setActiveCategory(category)"
        >
          <!-- Ripple effect for active category -->
          <div v-if="activeCategory === category" class="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-xl animate-pulse"></div>
          <span class="relative z-10 flex items-center gap-2">
            {{ category }}
            <span v-if="activeCategory === category" class="text-xs bg-white/20 px-2 py-1 rounded-full">
              {{ getCategoryCount(category) }}
            </span>
          </span>
        </button>
      </div>
      
      <!-- Projects Count with animation -->
      <div class="text-center mb-8">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <em>
            <Transition name="fade" mode="out-in">
              <span :key="filteredProjects.length">
                Showing {{ displayedProjects.length }} of {{ filteredProjects.length }} projects
                <span v-if="searchQuery" class="text-blue-600 dark:text-blue-400">
                  matching "{{ searchQuery }}"
                </span>
              </span>
            </Transition>
          </em>
        </p>
      </div>

      <!-- Projects Grid with improved animations -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 opacity-0"
      >
        <TransitionGroup name="project-card" tag="div" class="contents">
          <article
            v-for="(project, index) in displayedProjects"
            :key="project.id"
            class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700/50 relative project-card-item"
          >
            <!-- Cool gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div class="relative overflow-hidden">
              <img 
                :src="project.featuredImage" 
                :alt="project.title"
                class="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
              />
              <!-- Dynamic gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Enhanced category badge -->
              <div class="absolute top-4 right-4">
                <span class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20 shadow-lg">
                  {{ mapProjectCategory(project) }}
                </span>
              </div>
              
              <!-- Action buttons on hover -->
              <div class="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div class="flex gap-2">
                  <a
                    v-if="project.hasProjectLink && project.projectLink"
                    :href="project.projectLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-xs font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-200 hover:scale-105 shadow-lg"
                    @click.stop
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Live
                  </a>
                  <a 
                    :href="`/portfolio/${project.id}`"
                    class="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full text-xs font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Details
                  </a>
                </div>
              </div>
            </div>

            <div class="p-8">
              <div class="flex items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">{{ project.role }}</span>
                <span>•</span>
                <span>{{ project.company }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                <a :href="`/portfolio/${project.id}`" class="hover:underline">
                  {{ project.title }}
                </a>
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                {{ project.description }}
              </p>
              
              <!-- Metrics with enhanced styling -->
              <div v-if="project.metrics && project.metrics.length > 0" class="mb-4">
                <div class="grid grid-cols-1 gap-2">
                  <div
                    v-for="metric in project.metrics.slice(0, 2)"
                    :key="metric.value"
                    class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-shadow duration-200"
                  >
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ metric.value }}</div>
                    <div class="text-xs text-green-700 dark:text-green-300">{{ metric.description }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Skills with enhanced animations -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="skill in project.skills.slice(0, 3)"
                  :key="skill"
                  class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-default"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="project.skills.length > 3"
                  class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-help"
                  :title="project.skills.slice(3).join(', ')"
                >
                  +{{ project.skills.length - 3 }} more
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <a 
                  :href="`/portfolio/${project.id}`"
                  class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  View Details
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ project.duration }}</span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>
      
      <!-- Enhanced Load More Button -->
      <div
        v-if="hasMoreProjects"
        ref="loadMoreRef"
        class="text-center mb-8 opacity-0"
      >
        <InteractiveButton
          variant="outline"
          size="lg"
          :loading="loadingMore"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 transform hover:scale-105 transition-all duration-300"
          @click="loadMore"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          Load More Projects
          <span v-if="remainingCount > 0" class="ml-2 text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
            {{ remainingCount }} remaining
          </span>
        </InteractiveButton>
      </div>

      <!-- Enhanced Statistics -->
      <div v-if="showStats" class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ stats.totalProjects }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
          </div>
          <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{{ stats.totalTechnologies }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div class="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ stats.totalCategories }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import InteractiveButton from './InteractiveButton.vue'

interface ProjectMetric {
  value: string
  description: string
}

interface Project {
  id: string
  title: string
  company: string
  role: string
  duration: string
  skills: string[]
  description: string
  problem: string
  contributions: string
  outcomes: string
  metrics?: ProjectMetric[]
  hasProjectLink?: boolean
  projectLink?: string
  featuredImage: string
}

interface Props {
  projects: Project[]
  page: {
    currentPage: number
    size: number
    total: number
  }
}

const props = defineProps<Props>()

// Refs for DOM elements
const portfolioRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const searchRef = ref<HTMLElement>()
const filtersRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const loadMoreRef = ref<HTMLElement>()

// Reactive state
const searchQuery = ref('')
const activeCategory = ref('All')
const loadingMore = ref(false)
const projectsPerLoad = ref(6) // Show 6 projects initially, load 6 more each time
const displayedCount = ref(projectsPerLoad.value)
const showStats = ref(true)

// Projects data
const projects = ref(props.projects)

// Map project data to appropriate categories
const mapProjectCategory = (project: Project): string => {
  if (project.company) {
    const company = project.company.toLowerCase()
    if (company.includes('dental') || company.includes('healthcare')) return 'Healthcare'
    if (company.includes('gfinity')) return 'E-sports'
    if (company.includes('open source')) return 'Open Source'
  }
  
  if (project.title) {
    const title = project.title.toLowerCase()
    if (title.includes('clinical') || title.includes('healthcare') || title.includes('dental')) return 'Healthcare'
    if (title.includes('premier') || title.includes('league') || title.includes('gaming')) return 'E-sports'
    if (title.includes('platform') || title.includes('system')) return 'SaaS'
    if (title.includes('redflag') || title.includes('zeki')) return 'Open Source'
  }
  
  return 'Web Apps'
}

// Computed properties
const categories = computed(() => {
  const cats = ['All', ...new Set(projects.value.map(project => mapProjectCategory(project)))]
  return cats
})

const filteredProjects = computed(() => {
  let filtered = projects.value

  // Filter by category
  if (activeCategory.value !== 'All') {
    filtered = filtered.filter(project => mapProjectCategory(project) === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.company.toLowerCase().includes(query) ||
      project.skills.some(skill => skill.toLowerCase().includes(query))
    )
  }

  return filtered
})

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, displayedCount.value)
})

const hasMoreProjects = computed(() => {
  return displayedCount.value < filteredProjects.value.length
})

const remainingCount = computed(() => {
  return Math.max(0, filteredProjects.value.length - displayedCount.value)
})

const stats = computed(() => ({
  totalProjects: projects.value.length,
  totalTechnologies: new Set(projects.value.flatMap(p => p.skills)).size,
  totalCategories: categories.value.length - 1 // Exclude "All"
}))

// Methods
const setActiveCategory = (category: string) => {
  activeCategory.value = category
  displayedCount.value = projectsPerLoad.value // Reset displayed count
  
  // Smooth animation for category change
  nextTick(() => {
    animateGridChange()
  })
}

const handleSearch = () => {
  displayedCount.value = projectsPerLoad.value // Reset displayed count
  nextTick(() => {
    animateGridChange()
  })
}

const clearSearch = () => {
  searchQuery.value = ''
  displayedCount.value = projectsPerLoad.value
  nextTick(() => {
    animateGridChange()
  })
}

const getCategoryCount = (category: string): number => {
  if (category === 'All') return projects.value.length
  return projects.value.filter(project => mapProjectCategory(project) === category).length
}

const loadMore = async () => {
  loadingMore.value = true
  
  // Simulate loading delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800))
  
  displayedCount.value += projectsPerLoad.value
  loadingMore.value = false
  
  // Animate new items
  nextTick(() => {
    animateNewItems()
  })
}

const animateGridChange = () => {
  const gridItems = gridRef.value?.querySelectorAll('.project-card-item')
  if (!gridItems) return
  
  // Simple CSS-based animation using classes
  gridItems.forEach((item, index) => {
    const element = item as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    
    setTimeout(() => {
      element.style.transition = 'all 0.5s ease'
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, index * 100)
  })
}

const animateNewItems = () => {
  const gridItems = gridRef.value?.querySelectorAll('.project-card-item')
  if (!gridItems) return
  
  // Animate only the newly added items
  const startIndex = displayedCount.value - projectsPerLoad.value
  for (let i = startIndex; i < gridItems.length; i++) {
    const item = gridItems[i] as HTMLElement
    item.style.opacity = '0'
    item.style.transform = 'translateY(30px) scale(0.9)'
    
    setTimeout(() => {
      item.style.transition = 'all 0.6s ease'
      item.style.opacity = '1'
      item.style.transform = 'translateY(0) scale(1)'
    }, (i - startIndex) * 150)
  }
}

// Watch for filter changes to reset animation
watch([activeCategory, searchQuery], () => {
  nextTick(() => {
    animateGridChange()
  })
})

// Optimized animations using CSS-in-JS for better performance
onMounted(() => {
  console.log('PortfolioShowcase: onMounted called')
  
  // Make elements visible with staggered animation
  const elements = [
    { ref: badgeRef, delay: 0 },
    { ref: titleRef, delay: 200 },
    { ref: subtitleRef, delay: 400 },
    { ref: searchRef, delay: 600 },
    { ref: filtersRef, delay: 800 },
    { ref: gridRef, delay: 1000 },
    { ref: loadMoreRef, delay: 1200 }
  ]
  
  elements.forEach(({ ref, delay }) => {
    if (ref.value) {
      setTimeout(() => {
        ref.value!.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        ref.value!.style.opacity = '1'
        ref.value!.style.transform = 'translateY(0)'
      }, delay)
    }
  })
  
  // Animate grid items
  setTimeout(() => {
    animateGridChange()
  }, 1200)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom animations for floating elements */
@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-10px) translateX(-5px); }
  75% { transform: translateY(-30px) translateX(15px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(15px) translateX(-10px); }
  50% { transform: translateY(30px) translateX(5px); }
  75% { transform: translateY(10px) translateX(-15px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(10px); }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 30s ease-in-out infinite;
}

/* Transition animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.project-card-enter-active,
.project-card-leave-active {
  transition: all 0.5s ease;
}

.project-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.project-card-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.project-card-move {
  transition: transform 0.5s ease;
}

/* Improve animation performance */
.project-card-item {
  will-change: transform, opacity;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-float-delayed,
  .animate-float-slow {
    animation: none;
  }
  
  .project-card-enter-active,
  .project-card-leave-active,
  .project-card-move {
    transition: none;
  }
}
</style>
