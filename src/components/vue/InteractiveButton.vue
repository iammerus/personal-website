<template>
  <button
    ref="buttonRef"
    :class="[
      'group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 active:scale-95'
    ]"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    
    <span :class="{ 'opacity-0': loading }">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>
    
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
        class="absolute h-2 w-2 bg-white/30 rounded-full transition-all duration-500"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { gsap } from 'gsap'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  animate?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  animate: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<HTMLElement>()
const rippleRef = ref<HTMLElement>()
const ripples = ref<Ripple[]>([])
let rippleId = 0

const { element, isVisible, shouldAnimate } = useScrollAnimation()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500'
    case 'secondary':
      return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500'
    case 'outline':
      return 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950 focus:ring-blue-500'
    case 'ghost':
      return 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500'
    default:
      return ''
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'md':
      return 'px-6 py-3 text-base'
    case 'lg':
      return 'px-8 py-4 text-lg'
    default:
      return 'px-6 py-3 text-base'
  }
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  
  createRipple(event)
  emit('click', event)
}

const createRipple = (event: MouseEvent) => {
  if (!rippleRef.value) return
  
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
  gsap.to(newRipple, {
    scale: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      ripples.value = ripples.value.filter(r => r.id !== newRipple.id)
    }
  })
}

const onHover = () => {
  if (!buttonRef.value || !shouldAnimate.value) return
  
  gsap.to(buttonRef.value, {
    y: -2,
    duration: 0.2,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  if (!buttonRef.value || !shouldAnimate.value) return
  
  gsap.to(buttonRef.value, {
    y: 0,
    duration: 0.2,
    ease: 'power2.out'
  })
}

onMounted(() => {
  if (props.animate && buttonRef.value && shouldAnimate.value) {
    element.value = buttonRef.value
    
    // Initial animation when visible
    if (isVisible.value) {
      gsap.fromTo(buttonRef.value, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }
})
</script>
