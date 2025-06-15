<template>
  <section
    id="blog"
    ref="blogRef"
    class="py-20 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <div ref="badgeRef" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 opacity-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Latest Posts
        </div>
        <h1
          ref="titleRef"
          class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 opacity-0"
        >
          Blog & Insights
        </h1>
        <p
          ref="subtitleRef"
          class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 leading-relaxed"
        >
          Thoughts on web development, software engineering, and lessons learned building scalable applications
        </p>
      </div>
      
      <!-- Search and Filter Section -->
      <div ref="searchRef" class="mb-12 opacity-0">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search posts..."
              class="w-full px-6 py-4 pl-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              @input="handleSearch"
            >
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Category filters -->
      <div
        ref="filtersRef"
        class="flex flex-wrap justify-center gap-3 mb-16 opacity-0"
      >
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
            'backdrop-blur-sm border border-white/20 dark:border-gray-700/50',
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg'
          ]"
          @click="setActiveCategory(category)"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Posts Count -->
      <div class="text-center mb-8">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <em>Showing {{ filteredPosts.length }} of {{ posts.length }} posts</em>
        </p>
      </div>

      <!-- Featured Posts Section (if on first page) -->
      <div
        v-if="page.currentPage === 1 && featuredPosts.length > 0"
        ref="featuredRef"
        class="mb-16 opacity-0"
      >
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Posts</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="post in featuredPosts"
            :key="post.id"
            class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700/50"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="post.featuredImage.src || post.featuredImage" 
                :alt="post.data.title"
                class="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {{ post.data.category }}
                </span>
                <time :datetime="post.data.publishDate.toISOString()">
                  {{ formatDate(post.data.publishDate) }}
                </time>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ post.readingTime }} min read
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                <a :href="`/blog/${post.id}`" class="hover:underline">
                  {{ post.data.title }}
                </a>
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                {{ post.data.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in post.data.tags?.slice(0, 3)"
                  :key="tag"
                  class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                >
                  #{{ tag }}
                </span>
              </div>
              <a 
                :href="`/blog/${post.id}`"
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group-hover:gap-3 transition-all duration-300"
              >
                Read full article
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>

      <!-- All Posts Grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 opacity-0"
      >
        <article
          v-for="post in paginatedPosts"
          :key="post.id"
          class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20 dark:border-gray-700/50"
        >
          <div class="relative overflow-hidden">
            <img 
              :src="post.featuredImage.src || post.featuredImage" 
              :alt="post.data.title"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute top-4 left-4">
              <span class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                {{ post.data.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
              <time :datetime="post.data.publishDate.toISOString()">
                {{ formatDate(post.data.publishDate) }}
              </time>
              <span>•</span>
              <span>{{ post.readingTime }} min read</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              <a :href="`/blog/${post.id}`" class="hover:underline">
                {{ post.data.title }}
              </a>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
              {{ post.data.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.data.tags?.slice(0, 2)"
                :key="tag"
                class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
              >
                #{{ tag }}
              </span>
            </div>
            <a 
              :href="`/blog/${post.id}`"
              class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:gap-2 transition-all duration-300"
            >
              Read more
              <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      </div>
      
      <!-- Load More Button -->
      <div
        v-if="hasMorePosts"
        ref="loadMoreRef"
        class="text-center mb-8 opacity-0"
      >
        <InteractiveButton
          variant="outline"
          size="lg"
          :loading="loadingMore"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50"
          @click="loadMore"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </template>
          Load More Posts
        </InteractiveButton>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        ref="paginationRef"
        class="flex justify-center items-center gap-2 mb-8 opacity-0"
      >
        <button
          v-if="currentPage > 1"
          @click="goToPage(currentPage - 1)"
          class="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
        >
          Previous
        </button>
        
        <template v-for="pageNum in visiblePages" :key="pageNum">
          <button
            v-if="pageNum !== '...'"
            @click="goToPage(pageNum)"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-200',
              pageNum === currentPage
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'
            ]"
          >
            {{ pageNum }}
          </button>
          <span v-else class="px-2 text-gray-500">...</span>
        </template>
        
        <button
          v-if="currentPage < totalPages"
          @click="goToPage(currentPage + 1)"
          class="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import InteractiveButton from './InteractiveButton.vue'

let gsap: any
let ScrollTriggerPlugin: any

interface BlogPost {
  id: string
  data: {
    title: string
    description: string
    publishDate: Date
    author: string
    category: string
    tags?: string[]
    featured?: boolean
  }
  featuredImage: any
  readingTime: number
}

interface Props {
  posts: BlogPost[]
  page: {
    currentPage: number
    size: number
    total: number
  }
}

const props = defineProps<Props>()

const blogRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const searchRef = ref<HTMLElement>()
const filtersRef = ref<HTMLElement>()
const featuredRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const loadMoreRef = ref<HTMLElement>()
const paginationRef = ref<HTMLElement>()

const searchQuery = ref('')
const activeCategory = ref('All')
const currentPage = ref(props.page.currentPage)
const postsPerPage = ref(props.page.size)
const loadingMore = ref(false)

const { shouldAnimate } = useScrollAnimation()

const posts = ref(props.posts)

const categories = computed(() => {
  const cats = ['All', ...new Set(posts.value.map(post => post.data.category))]
  return cats
})

const featuredPosts = computed(() => {
  return posts.value.filter(post => post.data.featured).slice(0, 2)
})

const filteredPosts = computed(() => {
  let filtered = posts.value

  // Filter by category
  if (activeCategory.value !== 'All') {
    filtered = filtered.filter(post => post.data.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.data.title.toLowerCase().includes(query) ||
      post.data.description.toLowerCase().includes(query) ||
      post.data.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage.value))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return filteredPosts.value.slice(start, end)
})

const hasMorePosts = computed(() => {
  return currentPage.value < totalPages.value
})

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i)
  }

  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value)
  } else {
    rangeWithDots.push(totalPages.value)
  }

  return rangeWithDots.filter((v, i, arr) => arr.indexOf(v) === i)
})

const setActiveCategory = (category: string) => {
  activeCategory.value = category
  currentPage.value = 1
  
  // Animate grid change if GSAP is available
  if (gsap && shouldAnimate.value) {
    gsap.fromTo(gridRef.value?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    )
  }
}

const handleSearch = () => {
  currentPage.value = 1
}

const goToPage = (page: number) => {
  currentPage.value = page
  
  // Scroll to top of blog section
  blogRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const loadMore = async () => {
  loadingMore.value = true
  
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  currentPage.value++
  loadingMore.value = false
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

onMounted(async () => {
  console.log('BlogShowcase: onMounted called')
  console.log('BlogShowcase: Posts data:', posts.value)
  
  // Always make elements visible first, then handle animations
  const elements = [badgeRef.value, titleRef.value, subtitleRef.value, searchRef.value, filtersRef.value, featuredRef.value, gridRef.value, loadMoreRef.value, paginationRef.value]
  
  // Check if animations should be enabled
  const { shouldAnimate } = useScrollAnimation()
  console.log('BlogShowcase: Should animate?', shouldAnimate.value)
  
  if (!shouldAnimate.value) {
    // Make all elements visible immediately if animations are disabled
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '1'
        console.log('BlogShowcase: Made element visible (no animation):', el.className)
      }
    })
    return
  }
  
  // Try to load GSAP for animations
  if (typeof window !== 'undefined') {
    try {
      const { gsap: gsapImport } = await import('gsap')
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap = gsapImport
      ScrollTriggerPlugin = ScrollTrigger
      gsap.registerPlugin(ScrollTriggerPlugin)
      
      console.log('BlogShowcase: GSAP loaded successfully')
      setupAnimations()
      
      // Fallback timeout - if animations don't trigger within 2s, make elements visible
      setTimeout(() => {
        elements.forEach(el => {
          if (el && el.style.opacity === '0') {
            console.log('BlogShowcase: Animation timeout - making element visible:', el.className)
            el.style.opacity = '1'
          }
        })
      }, 2000)
    } catch (error) {
      console.warn('BlogShowcase: Failed to load GSAP, falling back to visible elements:', error)
      // Fallback: make elements visible
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1'
          console.log('BlogShowcase: Made element visible (fallback):', el.className)
        }
      })
    }
  } else {
    // Server-side: make elements visible
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '1'
      }
    })
  }
})

const setupAnimations = () => {
  if (!gsap || !ScrollTriggerPlugin) return
  
  const { shouldAnimate } = useScrollAnimation()
  
  if (!shouldAnimate.value) {
    gsap.set([badgeRef.value, titleRef.value, subtitleRef.value, searchRef.value, filtersRef.value, featuredRef.value, gridRef.value, loadMoreRef.value, paginationRef.value], { opacity: 1 })
    return
  }

  console.log('BlogShowcase: Setting up animations')

  // Stagger timeline for header elements - trigger immediately
  const headerTl = gsap.timeline({ delay: 0.2 })

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

  // Search animation - trigger immediately with delay
  if (searchRef.value) {
    gsap.fromTo(searchRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8
      }
    )
  }

  // Filters animation - trigger immediately with delay
  if (filtersRef.value) {
    gsap.fromTo(filtersRef.value?.children || [],
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 1.0
      }
    )
  }

  // Featured posts animation
  if (featuredRef.value) {
    // Animate the featuredRef container itself to be visible
    gsap.fromTo(featuredRef.value,
      { opacity: 0 }, // It has opacity-0 class
      {
        opacity: 1, // Animate its opacity to 1
        duration: 0.5,
        ease: 'power3.out',
        delay: 1.1 // Slightly before children
      }
    );
    // Animate its children
    gsap.fromTo(featuredRef.value.children,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1.2 // Existing delay for children
      }
    )
  }

  // Grid animation - for all posts
  if (gridRef.value) {
    const isInViewport = gridRef.value.getBoundingClientRect().top < window.innerHeight
    
    if (isInViewport) {
      // Animate the grid container itself to be visible
      gsap.fromTo(gridRef.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: 1.3 // Slightly before children if in viewport
        }
      );
      // If grid is in viewport, animate children with delay
      gsap.fromTo(gridRef.value.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 1.4 // Existing delay for children
        }
      )
    } else {
      // Animate the grid container itself to be visible with ScrollTrigger
      gsap.fromTo(gridRef.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.value,
            start: 'top 80%'
          }
        }
      );
      // If grid is off-screen, use ScrollTrigger for children
      gsap.fromTo(gridRef.value.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.value,
            start: 'top 80%' // Can use the same trigger
          }
        }
      )
    }
  }

  // Load more and pagination animations - use ScrollTrigger for bottom elements
  if (loadMoreRef.value) {
    gsap.fromTo(loadMoreRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: loadMoreRef.value,
          start: 'top 80%'
        }
      }
    )
  }

  if (paginationRef.value) {
    gsap.fromTo(paginationRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paginationRef.value,
          start: 'top 80%'
        }
      }
    )
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Standard property */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3; /* Standard property */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
