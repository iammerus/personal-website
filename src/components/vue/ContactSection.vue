<template>
  <section 
    id="contact"
    ref="contactRef"
    class="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -right-12 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -left-12 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <div ref="badgeRef" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 opacity-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Get In Touch
          </div>
          
          <h2
            ref="titleRef"
            class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 opacity-0"
          >
            Let's Work Together
          </h2>
          
          <p
            ref="subtitleRef"
            class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 opacity-0 leading-relaxed"
          >
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-stretch">
          <!-- Contact Info -->
          <div ref="infoRef" class="space-y-8 opacity-0 flex flex-col">
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 flex-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a 
                      :href="`mailto:${props.email}`"
                      class="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {{ props.email }}
                    </a>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">{{ props.location }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Follow me on</p>
                <div class="flex gap-4">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-xl transition-all duration-300 transform hover:scale-110"
                    :title="social.name"
                  >
                    <span class="text-lg">{{ social.icon }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form / Actions -->
          <div ref="actionsRef" class="space-y-8 opacity-0 flex flex-col">
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 flex-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Start a Conversation</h3>
              
              <div class="space-y-4">
                <a
                  :href="`mailto:${props.email}`"
                  class="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
                
                <a
                  href="/resume.pdf"
                  download
                  class="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 rounded-xl font-semibold hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                >
                  <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </div>

              <!-- Quick Links -->
              <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Or explore more</p>
                <div class="grid grid-cols-2 gap-4">
                  <a
                    href="/portfolio"
                    class="group flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Portfolio</span>
                  </a>
                  <a
                    href="/blog"
                    class="group flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Blog</span>
                  </a>
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
import { useScrollAnimation } from '../../composables/useScrollAnimation'

interface Props {
  email?: string
  location?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: 'melvin.rufetu@proton.me',
  location: 'Harare, Zimbabwe'
})

let gsap: any
let ScrollTriggerPlugin: any

const contactRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const infoRef = ref<HTMLElement>()
const actionsRef = ref<HTMLElement>()

const { shouldAnimate } = useScrollAnimation()

// Social links with icons
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/iammerus',
    icon: '🐙'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/melvin-mupondori-815318210/',
    icon: '💼'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/wezhirawevhu',
    icon: '🐦'
  }
]

onMounted(async () => {
  // Dynamically import GSAP only on client-side
  if (typeof window !== 'undefined') {
    const { gsap: gsapImport } = await import('gsap')
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
    
    gsap = gsapImport
    ScrollTriggerPlugin = ScrollTrigger
    gsap.registerPlugin(ScrollTriggerPlugin)
    
    setupAnimations()
  }
})

const setupAnimations = () => {
  if (!gsap || !ScrollTriggerPlugin) return
  
  if (!shouldAnimate.value) {
    gsap.set([badgeRef.value, titleRef.value, subtitleRef.value, infoRef.value, actionsRef.value], { opacity: 1 })
    return
  }

  // Header animation timeline
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: badgeRef.value,
      start: 'top 80%'
    }
  })

  headerTl
    .fromTo(badgeRef.value,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(titleRef.value,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(subtitleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.7'
    )

  // Content sections animation
  const contentTl = gsap.timeline({
    scrollTrigger: {
      trigger: infoRef.value,
      start: 'top 80%'
    }
  })

  contentTl
    .fromTo(infoRef.value,
      { opacity: 0, x: -50, rotationY: -15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(actionsRef.value,
      { opacity: 0, x: 50, rotationY: 15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
}
</script>
