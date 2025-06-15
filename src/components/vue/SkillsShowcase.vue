<template>
  <section
    ref="skillsRef"
    id="skills"
    class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Enhanced Header -->
      <div class="text-center mb-20">
        <h2
          ref="titleRef"
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 opacity-0"
        >
          <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h2>
        <p
          ref="subtitleRef"
          class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto opacity-0 leading-relaxed"
        >
          Technologies and methodologies I leverage to build exceptional digital experiences
        </p>
        
        <!-- Stats row -->
        <div
          ref="statsRef"
          class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto opacity-0"
        >
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">Projects Delivered</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100K+</div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">Users Served</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">20+</div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Skills Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.name"
          ref="categoryRefs"
          class="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 opacity-0 hover:-translate-y-2"
          @mouseenter="onCategoryHover(index)"
          @mouseleave="onCategoryLeave(index)"
        >
          <!-- Background gradient on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <!-- Icon and Title -->
            <div class="flex items-center mb-6">
              <div
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3',
                  category.color
                ]"
              >
                <component :is="category.icon" class="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ category.description }}</p>
              </div>
            </div>
            
            <!-- Skills with enhanced design -->
            <div class="space-y-4">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="group/skill"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-800 dark:text-gray-200 font-medium group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors duration-200">
                    {{ skill.name }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {{ skill.level }}%
                  </span>
                </div>
                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    ref="progressBars"
                    :style="{ width: '0%' }"
                    :class="[
                      'h-full rounded-full transition-all duration-1000 ease-out relative',
                      category.progressColor
                    ]"
                    :data-level="skill.level"
                  >
                    <!-- Shimmer effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Experience Timeline -->
      <div class="mt-20">
        <h3
          ref="timelineTitle"
          class="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16 opacity-0"
        >
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Professional Journey
          </span>
        </h3>
        
        <div class="relative max-w-6xl mx-auto">
          <!-- Enhanced Timeline line -->
          <div
            ref="timelineLine"
            class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg"
            style="height: 0"
          />
          
          <div class="space-y-16">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              ref="experienceRefs"
              :class="[
                'relative flex items-center opacity-0',
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              ]"
            >
              <!-- Enhanced Timeline dot -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white dark:border-gray-900 z-10 shadow-lg"
              >
                <div class="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"></div>
              </div>
              
              <!-- Enhanced Content Card -->
              <div
                :class="[
                  'w-5/12 group relative',
                  index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                ]"
              >
                <!-- Card background with gradient border -->
                <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 group-hover:-translate-y-2">
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div class="relative z-10">
                    <!-- Period badge -->
                    <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full mb-4 shadow-lg">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ experience.period }}
                    </div>
                    
                    <!-- Role and Company -->
                    <h4 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {{ experience.role }}
                    </h4>
                    <div class="flex items-center mb-4">
                      <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p class="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {{ experience.company }}
                      </p>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {{ experience.description }}
                    </p>
                    
                    <!-- Technologies with enhanced styling -->
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in experience.technologies"
                        :key="tech"
                        class="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

let gsap: any
let ScrollTriggerPlugin: any

const skillsRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const categoryRefs = ref<HTMLElement[]>([])
const progressBars = ref<HTMLElement[]>([])
const timelineTitle = ref<HTMLElement>()
const timelineLine = ref<HTMLElement>()
const experienceRefs = ref<HTMLElement[]>([])

const shouldAnimate = ref(true)

// Check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const skillCategories = [
  {
    name: 'Frontend Development',
    description: 'Modern web interfaces',
    icon: 'frontend-icon',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30',
    progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'Vue.js/Nuxt.js', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    name: 'Backend Development',
    description: 'Scalable server solutions',
    icon: 'backend-icon',
    color: 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30',
    progressColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Laravel/PHP', level: 85 },
      { name: 'GraphQL', level: 80 },
      { name: 'REST APIs', level: 95 }
    ]
  },
  {
    name: 'DevOps & Cloud',
    description: 'Infrastructure & deployment',
    icon: 'cloud-icon',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30',
    progressColor: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'Kubernetes', level: 70 }
    ]
  },
  {
    name: 'Database & Storage',
    description: 'Data management solutions',
    icon: 'database-icon',
    color: 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30',
    progressColor: 'bg-gradient-to-r from-orange-500 to-red-600',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 90 },
      { name: 'Redis', level: 80 },
      { name: 'Elasticsearch', level: 75 }
    ]
  },
  {
    name: 'Tools & Methodologies',
    description: 'Development practices',
    icon: 'tools-icon',
    color: 'bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30',
    progressColor: 'bg-gradient-to-r from-teal-500 to-cyan-600',
    skills: [
      { name: 'Git/GitHub', level: 95 },
      { name: 'Agile/Scrum', level: 85 },
      { name: 'Testing (Jest/Cypress)', level: 80 },
      { name: 'Performance Optimization', level: 85 }
    ]
  },
  {
    name: 'Architecture & Design',
    description: 'System design patterns',
    icon: 'architecture-icon',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30',
    progressColor: 'bg-gradient-to-r from-pink-500 to-rose-600',
    skills: [
      { name: 'Microservices', level: 80 },
      { name: 'System Design', level: 85 },
      { name: 'API Design', level: 90 },
      { name: 'Database Design', level: 85 }
    ]
  }
]

const experiences = [
  {
    period: 'Nov 2022 — Present',
    role: 'Senior Full-stack Engineer',
    company: 'Community Dental Partners',
    description: 'Architected enterprise-grade intranet applications managing complete patient journeys. Enhanced application performance by 50% through advanced optimization techniques including tree shaking, strategic caching, and server-side rendering.',
    technologies: ['React', 'shadcn/ui', 'Redux', 'Node.js', 'Laravel', 'ASP.NET Core', 'AWS RDS', 'Lambda', 'Playwright']
  },
  {
    period: 'Aug 2022 — Oct 2022',
    role: 'Software Engineer',
    company: 'OperateBeyond',
    description: 'Optimized Elasticsearch implementation for multi-industry dealership platform, reducing index times by 40% and search latency by 50%. Developed responsive dealership management system integrating with diverse legacy systems.',
    technologies: ['Vue.js', 'NaiveUI', 'Laravel', 'Zend', 'Elasticsearch', 'Redis']
  },
  {
    period: 'Jul 2021 — Jul 2022',
    role: 'Software Engineer',
    company: 'Gfinity PLC',
    description: 'Developed key components for the F1 Esports platform handling 100K+ concurrent users. Reduced application loading time by 80% through implementing route-based code splitting and component-level lazy loading.',
    technologies: ['Vue 3', 'Nuxt', 'Vite', 'NaiveUI', 'WebSocket', 'Zend/PHP', 'Redis']
  }
]

const onCategoryHover = (index: number) => {
  if (!gsap || !shouldAnimate.value) return
  
  const category = categoryRefs.value[index]
  if (category) {
    gsap.to(category, {
      scale: 1.02,
      y: -8,
      duration: 0.4,
      ease: 'power2.out'
    })
  }
}

const onCategoryLeave = (index: number) => {
  if (!gsap || !shouldAnimate.value) return
  
  const category = categoryRefs.value[index]
  if (category) {
    gsap.to(category, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }
}

onMounted(async () => {
  shouldAnimate.value = !prefersReducedMotion()
  
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

  if (!shouldAnimate.value) {
    // Show all elements immediately if animations are disabled
    const allElements = [
      titleRef.value, 
      subtitleRef.value, 
      statsRef.value,
      ...categoryRefs.value, 
      timelineTitle.value, 
      ...experienceRefs.value
    ]
    gsap.set(allElements, { opacity: 1 })
    
    progressBars.value.forEach((el) => {
      if (el && 'dataset' in el) {
        gsap.set(el, { width: el.dataset.level + '%' })
      }
    })
    return
  }

  // Enhanced title animations
  if (titleRef.value) {
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  if (subtitleRef.value) {
    gsap.fromTo(subtitleRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Stats animation
  if (statsRef.value) {
    gsap.fromTo(statsRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: statsRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Enhanced skills categories stagger animation
  gsap.fromTo(categoryRefs.value,
    { opacity: 0, y: 80, scale: 0.8, rotationY: 15 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: categoryRefs.value[0],
        start: 'top 80%'
      }
    }
  )

  // Enhanced progress bars animation
  ScrollTriggerPlugin.batch(progressBars.value, {
    onEnter: (elements: any[]) => {
      elements.forEach((el: any, index: number) => {
        gsap.fromTo(el,
          { width: '0%', opacity: 0.7 },
          {
            width: (el as HTMLElement).dataset.level + '%',
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.3 + (index * 0.1)
          }
        )
      })
    },
    start: 'top 80%'
  })

  // Enhanced timeline animations
  if (timelineTitle.value) {
    gsap.fromTo(timelineTitle.value,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineTitle.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Animate timeline line with more sophisticated effect
  if (timelineLine.value) {
    gsap.fromTo(timelineLine.value,
      { height: 0, opacity: 0.5 },
      {
        height: '100%',
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineLine.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Enhanced experience items stagger animation
  gsap.fromTo(experienceRefs.value,
    { 
      opacity: 0, 
      x: (i: number) => i % 2 === 0 ? -120 : 120,
      y: 50,
      scale: 0.9
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: experienceRefs.value[0],
        start: 'top 80%'
      }
    }
  )
}
</script>

<style scoped>
/* Shimmer animation for progress bars */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

/* Smooth transitions for all interactive elements */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

/* Enhanced card hover effects */
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Progress bar enhancements */
.progress-bar {
  position: relative;
  overflow: hidden;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}
</style>
