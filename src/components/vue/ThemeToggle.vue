<template>
  <button
    ref="buttonRef"
    :class="[
      'relative p-3 rounded-xl transition-all duration-300 group',
      'bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700',
      'backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50',
      'shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
    ]"
    :aria-label="ariaLabel"
    @click="toggleTheme"
  >
    <!-- Sun icon -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 rotate-180 scale-0"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 -rotate-180 scale-0"
    >
      <svg
        v-if="!isDark"
        class="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>
    </Transition>
    
    <!-- Moon icon -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 rotate-180 scale-0"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 -rotate-180 scale-0"
    >
      <svg
        v-if="isDark"
        class="w-5 h-5 text-blue-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
    </Transition>
    
    <!-- Ripple effect -->
    <span
      ref="rippleRef"
      class="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
    >
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        :style="{
          left: ripple.x + 'px',
          top: ripple.y + 'px',
          transform: `translate(-50%, -50%) scale(${ripple.scale})`,
          opacity: ripple.opacity
        }"
        class="absolute h-2 w-2 bg-blue-500/30 rounded-full transition-all duration-500"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

let gsap: any

interface Ripple {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
}

const buttonRef = ref<HTMLElement>()
const rippleRef = ref<HTMLElement>()
const ripples = ref<Ripple[]>([])
let rippleId = 0

const { isDark, toggleTheme: toggle } = useTheme()
const { shouldAnimate } = useScrollAnimation()

const ariaLabel = computed(() => 
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
)

const toggleTheme = async (event: MouseEvent) => {
  createRipple(event)
  
  if (gsap && shouldAnimate.value && buttonRef.value) {
    // Add a small bounce animation
    gsap.to(buttonRef.value, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    })
  }
  
  toggle()
}

const createRipple = (event: MouseEvent) => {
  if (!rippleRef.value || !shouldAnimate.value) return
  
  const rect = rippleRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const newRipple: Ripple = {
    id: rippleId++,
    x,
    y,
    scale: 0,
    opacity: 1
  }
  
  ripples.value.push(newRipple)
  
  // Animate ripple
  if (gsap) {
    gsap.to(newRipple, {
      scale: 10,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        ripples.value = ripples.value.filter(r => r.id !== newRipple.id)
      }
    })
  }
}

onMounted(async () => {
  // Dynamically import GSAP only on client-side
  if (typeof window !== 'undefined') {
    const { gsap: gsapImport } = await import('gsap')
    gsap = gsapImport
    
    if (shouldAnimate.value && buttonRef.value) {
      // Initial hover animations
      const button = buttonRef.value
      
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
    }
  }
})
</script>
