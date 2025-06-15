import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useWindowScroll, useMediaQuery } from '@vueuse/core'

export function useScrollAnimation(threshold = 100) {
  const isVisible = ref(false)
  const element = ref<HTMLElement>()
  const hasBeenTriggered = ref(false)
  
  // Only use VueUse composables if we have an active component instance
  const instance = getCurrentInstance()
  const { y } = instance ? useWindowScroll() : { y: ref(0) }
  const prefersReducedMotion = instance ? useMediaQuery('(prefers-reduced-motion: reduce)') : ref(false)
  
  const shouldAnimate = computed(() => !prefersReducedMotion.value)
  
  let observer: IntersectionObserver | null = null
  
  // Only register lifecycle hooks if we have an active component instance
  if (instance) {
    onMounted(() => {
      if (!element.value || !shouldAnimate.value) return
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasBeenTriggered.value) {
              isVisible.value = true
              hasBeenTriggered.value = true
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )
      
      observer.observe(element.value)
    })
    
    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })
  }
  
  return {
    element,
    isVisible,
    shouldAnimate,
    hasBeenTriggered,
    scrollY: y
  }
}
