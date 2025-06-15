<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Enhanced background with animated gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Animated gradient orbs with better positioning -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/8 dark:bg-blue-500/12 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/8 dark:bg-indigo-500/12 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s; animation-duration: 6s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/6 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s; animation-duration: 8s;"></div>
      
      <!-- Subtle animated mesh pattern -->
      <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" style="background-size: 100px 2px; animation-duration: 10s;"></div>
      </div>
    </div>
    
    <!-- Animated floating particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        ref="particleRefs"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's',
          opacity: particle.opacity
        }"
        :class="[
          'absolute rounded-full animate-float',
          particle.size === 'sm' ? 'w-1 h-1' : particle.size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
          particle.color
        ]"
      />
    </div>
    
    <!-- Main content with better spacing -->
    <div class="container relative z-10 px-6 sm:px-8 lg:px-12">
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Enhanced name with improved typography and micro-interactions -->
        <div class="mb-8">
          <h1
            ref="nameRef"
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-4 opacity-0 leading-tight tracking-tight"
          >
            <span class="inline-block hover:scale-105 transition-transform duration-300 cursor-default">{{ displayName.split(' ')[0] }}</span>
            <br>
            <span class="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
              {{ displayName.split(' ').slice(1).join(' ') }}
            </span>
            <span
              ref="cursorRef"
              class="inline-block w-1 bg-blue-600 ml-2 animate-blink"
              :class="{ 'opacity-100': showCursor, 'opacity-0': !showCursor }"
            >|</span>
          </h1>
          
          <!-- Enhanced title with animated underline -->
          <div
            ref="titleRef"
            class="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 opacity-0"
          >
            <span class="font-medium relative group cursor-default">
              {{ title }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-500 ease-out"></span>
            </span>
          </div>
        </div>
        
        <!-- Simplified description -->
        <div
          ref="descriptionRef"
          class="mb-12 opacity-0"
        >
          <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {{ description }}
          </p>
          
          <!-- Enhanced key highlights with hover effects -->
          <div class="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <div
              v-for="(highlight, index) in highlights.slice(0, 3)"
              :key="highlight"
              :style="{ animationDelay: `${index * 0.1}s` }"
              class="group inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-default animate-fade-in-up"
            >
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              {{ highlight }}
            </div>
          </div>
        </div>
        
        <!-- Simplified CTA Buttons -->
        <div
          ref="buttonsRef"
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 opacity-0"
        >
          <InteractiveButton
            variant="primary"
            size="lg"
            class="group relative overflow-hidden"
            @click="scrollToProjects"
          >
            <span class="relative z-10 flex items-center gap-2">
              View My Work
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </InteractiveButton>
          
          <InteractiveButton
            variant="outline"
            size="lg"
            class="group"
            @click="downloadResume"
          >
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </span>
          </InteractiveButton>
        </div>
        
        <!-- Enhanced Social Links with improved animations -->
        <div
          ref="socialRef"
          class="flex justify-center gap-6 mb-8 opacity-0"
        >
          <a
            v-for="(social, index) in socialLinks"
            :key="social.name"
            :href="social.url"
            :aria-label="`Visit ${social.name} profile`"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="group flex items-center justify-center w-12 h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full text-gray-600 dark:text-gray-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl animate-fade-in-up"
            :class="social.hoverClass"
            target="_blank"
            rel="noopener noreferrer"
            @mouseenter="onSocialHover"
          >
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path :d="social.iconPath" />
            </svg>
            <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {{ social.name }}
            </span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Simplified scroll indicator -->
    <div
      ref="scrollIndicatorRef"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
    >
      <div class="flex flex-col items-center text-gray-500 dark:text-gray-400 group cursor-pointer" @click="scrollToNextSection">
        <div class="w-6 h-10 border-2 border-gray-400 group-hover:border-blue-500 rounded-2xl flex justify-center transition-colors duration-200">
          <div class="w-1 h-3 bg-gray-400 group-hover:bg-blue-500 rounded-full animate-bounce mt-2 transition-colors duration-200" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
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
const isTyping = ref(false)
const typingComplete = ref(false)

// Computed data
const location = computed(() => 'Harare, Zimbabwe')
const email = computed(() => 'mel@mups.co.zw')

const highlights = [
  '5+ Years Experience',
  'Full-Stack Expert',
  'Cloud Architecture'
]

// Social links data
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/iammerus',
    hoverClass: 'hover:text-white hover:bg-gray-900 hover:border-gray-900',
    iconPath: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/melvin-mupondori-815318210/',
    hoverClass: 'hover:text-white hover:bg-blue-600 hover:border-blue-600',
    iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/wezhirawevhu',
    hoverClass: 'hover:text-white hover:bg-black hover:border-black',
    iconPath: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'
  }
]

// Improved particles with better dark mode contrast
const particles = Array.from({ length: 15 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 8,
  opacity: 0.2 + Math.random() * 0.3,
  size: ['sm', 'md'][Math.floor(Math.random() * 2)],
  color: [
    'bg-blue-400/40 dark:bg-blue-400/70',
    'bg-indigo-400/40 dark:bg-indigo-400/70',
    'bg-purple-400/35 dark:bg-purple-400/65'
  ][Math.floor(Math.random() * 3)]
}))

// Animation timeline
let tl: gsap.core.Timeline

const shouldAnimate = ref(true)

// Check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const initAnimations = async () => {
  shouldAnimate.value = !prefersReducedMotion()
  
  if (!shouldAnimate.value) {
    // Show all elements immediately if animations are disabled
    const elements = [nameRef.value, titleRef.value, descriptionRef.value, buttonsRef.value, socialRef.value, scrollIndicatorRef.value]
    elements.forEach(el => {
      if (el) gsap.set(el, { opacity: 1 })
    })
    displayName.value = props.name
    return
  }

  tl = gsap.timeline()
  
  // Show name container first, then start typing
  if (nameRef.value) {
    tl.fromTo(nameRef.value,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }
  
  // Start typing animation after name container is visible
  tl.call(() => {
    typeWriter()
  })
  
  // Animate other elements after typing is complete
  if (titleRef.value) {
    tl.fromTo(titleRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '+=0.3'
    )
  }
  
  if (descriptionRef.value) {
    tl.fromTo(descriptionRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
  }
  
  if (buttonsRef.value) {
    tl.fromTo(buttonsRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.4'
    )
  }
  
  if (socialRef.value) {
    tl.fromTo(socialRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
  }
  
  if (scrollIndicatorRef.value) {
    tl.fromTo(scrollIndicatorRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
  }
}

const typeWriter = (): Promise<void> => {
  return new Promise((resolve) => {
    const nameChars = props.name.split('')
    let currentName = ''
    let i = 0
    
    // Set typing state
    isTyping.value = true
    showCursor.value = true
    
    const type = () => {
      if (i < nameChars.length) {
        currentName += nameChars[i]
        displayName.value = currentName
        i++
        
        // Variable typing speed - slower for spaces and first letters
        const char = nameChars[i - 1]
        let delay = 60 // Base typing speed
        
        if (char === ' ') {
          delay = 200 // Longer pause for spaces
        } else if (i === 1 || (i > 0 && nameChars[i - 2] === ' ')) {
          delay = 120 // Slower for first letters of words
        } else {
          delay = 40 + Math.random() * 60 // Vary typing speed naturally
        }
        
        setTimeout(type, delay)
      } else {
        // Typing complete
        isTyping.value = false
        typingComplete.value = true
        
        // Keep cursor blinking for a moment, then hide it
        setTimeout(() => {
          showCursor.value = false
          setTimeout(resolve, 400)
        }, 800)
      }
    }
    
    // Start typing after a brief delay
    setTimeout(type, 500)
  })
}

const scrollToProjects = () => {
  const projectsElement = document.querySelector('#projects') || document.querySelector('[data-section="projects"]')
  if (projectsElement) {
    projectsElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToNextSection = () => {
  const nextSection = heroRef.value?.nextElementSibling
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'Melvin_Mupondori_Resume.pdf'
  link.click()
}

const onSocialHover = () => {
  // Optional: Add hover sound effect or haptic feedback here
  // This function is called when hovering over social links
}

onMounted(() => {
  setTimeout(initAnimations, 300)
})

onUnmounted(() => {
  if (tl) {
    tl.kill()
  }
})
</script>

<style scoped>
/* Enhanced floating animation for particles */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-25px) translateX(5px);
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-15px) translateX(-3px);
    opacity: 1;
  }
  75% {
    transform: translateY(-20px) translateX(2px);
    opacity: 0.6;
  }
}

.animate-float {
  animation: float var(--duration, 8s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

/* Enhanced cursor animation */
@keyframes typing-cursor {
  0%, 50% { 
    opacity: 1;
  }
  51%, 100% { 
    opacity: 0;
  }
}

.animate-pulse {
  animation: typing-cursor 1s infinite;
}

/* Improved pulse animation for gradient orbs */
@keyframes gentlePulse {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Subtle glow effect for particles in dark mode */
@media (prefers-color-scheme: dark) {
  .animate-float {
    filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
  }
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>
