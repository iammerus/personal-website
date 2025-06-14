<template>
  <section
    ref="skillsRef"
    class="py-20 bg-white dark:bg-gray-900"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2
          ref="titleRef"
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 opacity-0"
        >
          Skills & Expertise
        </h2>
        <p
          ref="subtitleRef"
          class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0"
        >
          Technologies and tools I use to build exceptional digital experiences
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.name"
          ref="categoryRefs"
          class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0"
          @mouseenter="onCategoryHover(index)"
          @mouseleave="onCategoryLeave(index)"
        >
          <div class="flex items-center mb-4">
            <div
              :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-all duration-300',
                category.color
              ]"
            >
              <component :is="category.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ category.name }}
            </h3>
          </div>
          
          <div class="space-y-3">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="flex items-center justify-between"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium">
                {{ skill.name }}
              </span>
              <div class="flex items-center">
                <div class="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                  <div
                    ref="progressBars"
                    :style="{ width: skill.level + '%' }"
                    :class="[
                      'h-full rounded-full transition-all duration-1000 ease-out',
                      category.progressColor
                    ]"
                    :data-level="skill.level"
                  />
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {{ skill.level }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Experience timeline -->
      <div class="mt-20">
        <h3
          ref="timelineTitle"
          class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 opacity-0"
        >
          Experience Timeline
        </h3>
        
        <div class="relative">
          <!-- Timeline line -->
          <div
            ref="timelineLine"
            class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"
            style="height: 0"
          />
          
          <div class="space-y-12">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              ref="experienceRefs"
              :class="[
                'relative flex items-center opacity-0',
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              ]"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-10"
              />
              
              <!-- Content -->
              <div
                :class="[
                  'w-5/12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg',
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                ]"
              >
                <div class="flex items-center mb-2">
                  <span class="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {{ experience.period }}
                  </span>
                </div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {{ experience.role }}
                </h4>
                <p class="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {{ experience.company }}
                </p>
                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  {{ experience.description }}
                </p>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                    v-for="tech in experience.technologies"
                    :key="tech"
                    class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTriggerPlugin from 'gsap/ScrollTrigger'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

gsap.registerPlugin(ScrollTriggerPlugin)

const skillsRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const categoryRefs = ref<HTMLElement[]>([])
const progressBars = ref<HTMLElement[]>([])
const timelineTitle = ref<HTMLElement>()
const timelineLine = ref<HTMLElement>()
const experienceRefs = ref<HTMLElement[]>([])

const { shouldAnimate } = useScrollAnimation()

const skillCategories = [
  {
    name: 'Frontend',
    icon: 'frontend-icon',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'Vue.js/Nuxt.js', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    name: 'Backend',
    icon: 'backend-icon',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    progressColor: 'bg-gradient-to-r from-green-500 to-green-600',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Laravel/PHP', level: 85 },
      { name: 'GraphQL', level: 80 },
      { name: 'REST APIs', level: 95 }
    ]
  },
  {
    name: 'DevOps & Cloud',
    icon: 'cloud-icon',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    progressColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'Kubernetes', level: 70 }
    ]
  }
]

const experiences = [
  {
    period: 'Nov 2022 — Present',
    role: 'Senior Full-stack Engineer',
    company: 'Community Dental Partners',
    description: 'Architected enterprise-grade intranet applications and enhanced performance by 50% through advanced optimization techniques.',
    technologies: ['React', 'shadcn/ui', 'Node.js', 'Laravel', 'AWS', 'Playwright']
  },
  {
    period: 'Aug 2022 — Oct 2022',
    role: 'Software Engineer',
    company: 'OperateBeyond',
    description: 'Optimized Elasticsearch implementation reducing search latency by 50% for multi-industry dealership platform.',
    technologies: ['Vue.js', 'NaiveUI', 'Laravel', 'Elasticsearch', 'Redis']
  },
  {
    period: 'Jul 2021 — Jul 2022',
    role: 'Software Engineer',
    company: 'Gfinity PLC',
    description: 'Developed F1 Esports platform components handling 100K+ concurrent users with real-time features.',
    technologies: ['Vue 3', 'Nuxt', 'WebSocket', 'PHP', 'Redis']
  }
]

const onCategoryHover = (index: number) => {
  if (!shouldAnimate.value) return
  
  const category = categoryRefs.value[index]
  if (category) {
    gsap.to(category, {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}

const onCategoryLeave = (index: number) => {
  if (!shouldAnimate.value) return
  
  const category = categoryRefs.value[index]
  if (category) {
    gsap.to(category, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}

onMounted(() => {
  if (!shouldAnimate.value) {
    // Show all elements immediately if animations are disabled
    gsap.set([titleRef.value, subtitleRef.value, ...categoryRefs.value, timelineTitle.value, ...experienceRefs.value], { opacity: 1 })
    gsap.set(progressBars.value, { width: (el) => el.dataset.level + '%' })
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

  // Skills categories stagger animation
  gsap.fromTo(categoryRefs.value,
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: categoryRefs.value[0],
        start: 'top 80%'
      }
    }
  )

  // Progress bars animation
  ScrollTriggerPlugin.batch(progressBars.value, {
    onEnter: (elements) => {
      elements.forEach((el) => {
        gsap.fromTo(el,
          { width: '0%' },
          {
            width: el.dataset.level + '%',
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.5
          }
        )
      })
    },
    start: 'top 80%'
  })

  // Timeline animations
  gsap.fromTo(timelineTitle.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: timelineTitle.value,
        start: 'top 80%'
      }
    }
  )

  // Animate timeline line
  gsap.fromTo(timelineLine.value,
    { height: 0 },
    {
      height: '100%',
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: timelineLine.value,
        start: 'top 80%'
      }
    }
  )

  // Experience items stagger animation
  gsap.fromTo(experienceRefs.value,
    { opacity: 0, x: (i) => i % 2 === 0 ? -100 : 100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: experienceRefs.value[0],
        start: 'top 80%'
      }
    }
  )
})
</script>
