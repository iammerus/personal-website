<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        ref="particleRefs"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's'
        }"
        class="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse"
      />
    </div>
    
    <!-- Main content -->
    <div class="container relative z-10 text-center">
      <div class="max-w-4xl mx-auto">
        <!-- Greeting -->
        <div
          ref="greetingRef"
          class="mb-6 opacity-0"
        >
          <span class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            👋 Hello, I'm
          </span>
        </div>
        
        <!-- Name with typing effect -->
        <h1
          ref="nameRef"
          class="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 opacity-0"
        >
          {{ displayName }}
          <span
            ref="cursorRef"
            class="inline-block w-1 bg-blue-600 animate-pulse"
            :class="{ 'animate-pulse': showCursor }"
          >|</span>
        </h1>
        
        <!-- Title -->
        <div
          ref="titleRef"
          class="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 opacity-0"
        >
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            {{ title }}
          </span>
        </div>
        
        <!-- Description -->
        <p
          ref="descriptionRef"
          class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0"
        >
          {{ description }}
        </p>
        
        <!-- CTA Buttons -->
        <div
          ref="buttonsRef"
          class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
        >
          <InteractiveButton
            variant="primary"
            size="lg"
            @click="scrollToProjects"
          >
            View My Work
            <template #icon-right>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </template>
          </InteractiveButton>
          
          <InteractiveButton
            variant="outline"
            size="lg"
            @click="downloadResume"
          >
            Download Resume
            <template #icon-right>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </template>
          </InteractiveButton>
        </div>
        
        <!-- Social links -->
        <div
          ref="socialRef"
          class="mt-12 flex justify-center gap-6 opacity-0"
        >
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="social.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div
      ref="scrollIndicatorRef"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
    >
      <div class="flex flex-col items-center text-gray-500 dark:text-gray-400">
        <span class="text-sm mb-2">Scroll down</span>
        <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import InteractiveButton from './InteractiveButton.vue'

interface Props {
  name?: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Melvin Mupondori',
  title: 'Senior Full-Stack Engineer',
  description: 'Building scalable web solutions with modern technologies. Specialized in React, Vue.js, Node.js, and cloud architecture with 5+ years of experience.'
})

// Refs
const heroRef = ref<HTMLElement>()
const greetingRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const descriptionRef = ref<HTMLElement>()
const buttonsRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()
const scrollIndicatorRef = ref<HTMLElement>()
const cursorRef = ref<HTMLElement>()
const particleRefs = ref<HTMLElement[]>([])

// Animation state
const displayName = ref('')
const showCursor = ref(true)
const { shouldAnimate } = useScrollAnimation()

// Data
const particles = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 4
}))

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/melvinmupondori',
    icon: 'github-icon'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/melvinmupondori',
    icon: 'linkedin-icon'
  },
  {
    name: 'Email',
    url: 'mailto:melvin.rufetu@proton.me',
    icon: 'email-icon'
  }
]

// Animation timeline
let tl: gsap.core.Timeline

const initAnimations = () => {
  if (!shouldAnimate.value) {
    // Show all elements immediately if animations are disabled
    gsap.set([greetingRef.value, nameRef.value, titleRef.value, descriptionRef.value, buttonsRef.value, socialRef.value, scrollIndicatorRef.value], { opacity: 1 })
    displayName.value = props.name
    return
  }

  tl = gsap.timeline()
  
  // Typing effect for name
  const nameChars = props.name.split('')
  let currentName = ''
  
  const typeWriter = () => {
    return new Promise<void>((resolve) => {
      let i = 0
      const type = () => {
        if (i < nameChars.length) {
          currentName += nameChars[i]
          displayName.value = currentName
          i++
          setTimeout(type, 100)
        } else {
          showCursor.value = false
          setTimeout(resolve, 500)
        }
      }
      type()
    })
  }
  
  tl.fromTo(greetingRef.value, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  )
  .fromTo(nameRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power2.out' }
  )
  .call(() => typeWriter())
  .fromTo(titleRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.3'
  )
  .fromTo(descriptionRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.5'
  )
  .fromTo(buttonsRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
    '-=0.3'
  )
  .fromTo(socialRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.5'
  )
  .fromTo(scrollIndicatorRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.3'
  )
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const downloadResume = () => {
  // Create a link to download the resume
  window.open('/resume.pdf', '_blank')
}

onMounted(() => {
  setTimeout(initAnimations, 500)
})

onUnmounted(() => {
  if (tl) {
    tl.kill()
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
