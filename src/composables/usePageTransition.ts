import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import { gsap } from 'gsap'

export function usePageTransition() {
  const isTransitioning = ref(false)
  const transitionElement = ref<HTMLElement>()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  const fadeIn = (element: HTMLElement, duration = 0.6) => {
    if (prefersReducedMotion.value) {
      gsap.set(element, { opacity: 1 })
      return Promise.resolve()
    }
    
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration,
        ease: 'power2.out'
      }
    ).then()
  }
  
  const fadeOut = (element: HTMLElement, duration = 0.3) => {
    if (prefersReducedMotion.value) {
      gsap.set(element, { opacity: 0 })
      return Promise.resolve()
    }
    
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration,
      ease: 'power2.in'
    }).then()
  }
  
  const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    if (prefersReducedMotion.value) {
      gsap.set(element, { opacity: 1, x: 0, y: 0 })
      return Promise.resolve()
    }
    
    const startProps: any = { opacity: 0 }
    const endProps: any = { opacity: 1, duration: 0.8, ease: 'power3.out' }
    
    switch (direction) {
      case 'left':
        startProps.x = -50
        endProps.x = 0
        break
      case 'right':
        startProps.x = 50
        endProps.x = 0
        break
      case 'up':
        startProps.y = 50
        endProps.y = 0
        break
      case 'down':
        startProps.y = -50
        endProps.y = 0
        break
    }
    
    return gsap.fromTo(element, startProps, endProps).then()
  }
  
  const staggerIn = (elements: HTMLElement[], delay = 0.1) => {
    if (prefersReducedMotion.value) {
      gsap.set(elements, { opacity: 1, y: 0 })
      return Promise.resolve()
    }
    
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: delay,
        ease: 'power2.out'
      }
    ).then()
  }
  
  return {
    isTransitioning,
    transitionElement,
    fadeIn,
    fadeOut,
    slideIn,
    staggerIn
  }
}
