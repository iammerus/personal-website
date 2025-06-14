<template>
  <Teleport to="body">
    <div
      v-if="project"
      ref="modalRef"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click="handleBackdropClick"
    >
      <div
        ref="contentRef"
        class="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        @click.stop
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          @click="$emit('close')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Content -->
        <div class="overflow-y-auto max-h-[90vh]">
          <!-- Hero image -->
          <div class="relative h-64 md:h-80 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div class="absolute bottom-6 left-6 text-white">
              <span class="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-medium mb-2">
                {{ project.category }}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold">{{ project.title }}</h2>
            </div>
          </div>
          
          <!-- Main content -->
          <div class="p-6 md:p-8">
            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">About This Project</h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ project.longDescription }}
              </p>
            </div>
            
            <!-- Technologies -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 rounded-lg font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Features, Challenges, Solutions in tabs -->
            <div class="mb-8">
              <div class="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  :class="[
                    'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  ]"
                  @click="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
              
              <div class="transition-all duration-300">
                <div v-if="activeTab === 'features'">
                  <ul class="space-y-3">
                    <li
                      v-for="feature in project.features"
                      :key="feature"
                      class="flex items-start"
                    >
                      <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                    </li>
                  </ul>
                </div>
                
                <div v-if="activeTab === 'challenges'">
                  <ul class="space-y-3">
                    <li
                      v-for="challenge in project.challenges"
                      :key="challenge"
                      class="flex items-start"
                    >
                      <svg class="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700 dark:text-gray-300">{{ challenge }}</span>
                    </li>
                  </ul>
                </div>
                
                <div v-if="activeTab === 'solutions'">
                  <ul class="space-y-3">
                    <li
                      v-for="solution in project.solutions"
                      :key="solution"
                      class="flex items-start"
                    >
                      <svg class="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700 dark:text-gray-300">{{ solution }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Demo
              </a>
              
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

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

interface Props {
  project: Project
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const activeTab = ref('features')

const { shouldAnimate } = useScrollAnimation()

const tabs = [
  { id: 'features', label: 'Key Features' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'solutions', label: 'Solutions' }
]

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === modalRef.value) {
    emit('close')
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  // Add escape key listener
  document.addEventListener('keydown', handleEscapeKey)
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
  
  // Animate modal appearance
  if (shouldAnimate.value && modalRef.value && contentRef.value) {
    gsap.fromTo(modalRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    
    gsap.fromTo(contentRef.value,
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    )
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>
