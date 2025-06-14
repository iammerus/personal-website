import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

let gsap: any

const initGSAP = async () => {
  if (typeof window !== 'undefined' && !gsap) {
    const { gsap: gsapImport } = await import('gsap')
    gsap = gsapImport
  }
  return gsap
}

export function usePageTransition() {
  const isTransitioning = ref(false)
  const transitionElement = ref<HTMLElement>()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  const fadeIn = async (element: HTMLElement, duration = 0.6) => {
    const gsapInstance = await initGSAP()
    if (!gsapInstance) return Promise.resolve()
    
    if (prefersReducedMotion.value) {
      gsapInstance.set(element, { opacity: 1 })
      return Promise.resolve()
    }
    
    return gsapInstance.fromTo(
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
  
  const fadeOut = async (element: HTMLElement, duration = 0.3) => {
    const gsapInstance = await initGSAP()
    if (!gsapInstance) return Promise.resolve()
    
    if (prefersReducedMotion.value) {
      gsapInstance.set(element, { opacity: 0 })
      return Promise.resolve()
    }
    
    return gsapInstance.to(element, {
      opacity: 0,
      y: -20,
      duration,
      ease: 'power2.in'
    }).then()
  }
  
  const slideIn = async (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    const gsapInstance = await initGSAP()
    if (!gsapInstance) return Promise.resolve()
    
    if (prefersReducedMotion.value) {
      gsapInstance.set(element, { opacity: 1, x: 0, y: 0 })
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
    
    return gsapInstance.fromTo(element, startProps, endProps).then()
  }
  
  const staggerIn = async (elements: HTMLElement[], delay = 0.1) => {
    const gsapInstance = await initGSAP()
    if (!gsapInstance) return Promise.resolve()
    
    if (prefersReducedMotion.value) {
      gsapInstance.set(elements, { opacity: 1, y: 0 })
      return Promise.resolve()
    }
    
    return gsapInstance.fromTo(
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
