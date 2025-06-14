<template>
  <div
    ref="cardRef"
    :class="[
      'group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-lg transition-all duration-300',
      'hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10',
      interactive ? 'cursor-pointer hover:-translate-y-2' : ''
    ]"
    @click="handleClick"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <!-- Background gradient overlay -->
    <div
      ref="overlayRef"
      class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300"
    />
    
    <!-- Image section -->
    <div
      v-if="image"
      class="relative overflow-hidden"
      :class="imageHeight"
    >
      <img
        :src="image"
        :alt="imageAlt"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div
        v-if="badge"
        class="absolute top-4 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
      >
        {{ badge }}
      </div>
    </div>
    
    <!-- Content section -->
    <div class="p-6">
      <!-- Header -->
      <div class="mb-4">
        <div v-if="category" class="mb-2">
          <span class="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
            {{ category }}
          </span>
        </div>
        
        <h3
          v-if="title"
          class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
        >
          {{ title }}
        </h3>
        
        <p
          v-if="subtitle"
          class="mt-1 text-sm text-gray-600 dark:text-gray-400"
        >
          {{ subtitle }}
        </p>
      </div>
      
      <!-- Description -->
      <p
        v-if="description"
        class="text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        {{ description }}
      </p>
      
      <!-- Tags -->
      <div
        v-if="tags && tags.length > 0"
        class="mt-4 flex flex-wrap gap-2"
      >
        <span
          v-for="tag in tags"
          :key="tag"
          class="inline-block rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-700 dark:text-gray-300"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Footer slot -->
      <div
        v-if="$slots.footer"
        class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <slot name="footer" />
      </div>
      
      <!-- Default slot -->
      <div v-if="$slots.default" class="mt-4">
        <slot />
      </div>
    </div>
    
    <!-- Hover indicator -->
    <div
      v-if="interactive"
      ref="indicatorRef"
      class="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
    >
      <svg
        class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { gsap } from 'gsap'

interface Props {
  title?: string
  subtitle?: string
  description?: string
  image?: string
  imageAlt?: string
  imageHeight?: string
  category?: string
  badge?: string
  tags?: string[]
  interactive?: boolean
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  imageHeight: 'h-48',
  interactive: false,
  animate: true
})

const emit = defineEmits<{
  click: []
}>()

const cardRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
const indicatorRef = ref<HTMLElement>()

const { element, isVisible, shouldAnimate } = useScrollAnimation()

const handleClick = () => {
  if (props.interactive) {
    emit('click')
  }
}

const onHover = () => {
  if (!shouldAnimate.value) return
  
  if (overlayRef.value) {
    gsap.to(overlayRef.value, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
  
  if (indicatorRef.value && props.interactive) {
    gsap.to(indicatorRef.value, {
      scale: 1.1,
      duration: 0.2,
      ease: 'back.out(1.7)'
    })
  }
}

const onLeave = () => {
  if (!shouldAnimate.value) return
  
  if (overlayRef.value) {
    gsap.to(overlayRef.value, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
  
  if (indicatorRef.value && props.interactive) {
    gsap.to(indicatorRef.value, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
}

onMounted(() => {
  if (props.animate && cardRef.value && shouldAnimate.value) {
    element.value = cardRef.value
    
    // Initial animation when visible
    if (isVisible.value) {
      gsap.fromTo(cardRef.value,
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: Math.random() * 0.3 // Add slight random delay for stagger effect
        }
      )
    }
  }
})
</script>
