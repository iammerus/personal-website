<template>
  <article class="relative">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/5 relative overflow-hidden">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Breadcrumb -->
          <nav class="mb-8" aria-label="Breadcrumb">
            <ol class="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><span class="mx-2">/</span></li>
              <li><a href="/blog" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
              <li><span class="mx-2">/</span></li>
              <li class="text-gray-400 dark:text-gray-500 truncate">{{ post.data.title }}</li>
            </ol>
          </nav>

          <!-- Category Badge -->
          <div class="mb-6">
            <span class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ post.data.category }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight">
            {{ post.data.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center justify-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <img 
                :src="author.image" 
                :alt="author.name"
                class="w-8 h-8 rounded-full"
              />
              <span class="font-medium">{{ post.data.author }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time :datetime="post.data.publishDate.toISOString()">
                {{ formatDate(post.data.publishDate) }}
              </time>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ readingTime }} min read</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {{ post.data.description }}
          </p>

          <!-- Tags -->
          <div v-if="post.data.tags && post.data.tags.length > 0" class="flex flex-wrap justify-center gap-2 mb-8">
            <span
              v-for="tag in post.data.tags"
              :key="tag"
              class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Image -->
    <section v-if="post.data.image" class="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              :src="post.data.image" 
              :alt="post.data.title"
              class="w-full h-64 md:h-96 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <!-- Photo Attribution -->
          <div v-if="post.data.pexels_attribution" class="mt-4 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Photo by 
              <a 
                :href="post.data.pexels_attribution.photographer_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {{ post.data.pexels_attribution.photographer }}
              </a>
              on
              <a 
                :href="post.data.pexels_attribution.photo_url"
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Pexels
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <!-- Table of Contents (Sidebar) -->
            <aside class="lg:col-span-1">
              <div class="sticky top-8">
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                  <nav class="space-y-2">
                    <a 
                      v-for="heading in tableOfContents"
                      :key="heading.id"
                      :href="`#${heading.id}`"
                      :class="[
                        'block text-sm transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400',
                        heading.level === 2 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 ml-4',
                      ]"
                    >
                      {{ heading.text }}
                    </a>
                  </nav>
                </div>

                <!-- Author Info -->
                <div class="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div class="flex items-center gap-4 mb-4">
                    <img 
                      :src="author.image" 
                      :alt="author.name"
                      class="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 class="font-bold text-gray-900 dark:text-white">{{ author.name }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Author</p>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ author.bio }}</p>
                  <div class="flex gap-2">
                    <a 
                      href="/contact"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Main Content -->
            <main class="lg:col-span-3">
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <slot name="content" />
              </div>

              <!-- Social Sharing -->
              <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Share this article</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Found this helpful? Share it with others!</p>
                  </div>
                  <div class="flex gap-3">
                    <ShareButton 
                      platform="twitter"
                      :url="shareUrl"
                      :title="post.data.title"
                      class="bg-blue-500 hover:bg-blue-600 text-white"
                    />
                    <ShareButton 
                      platform="linkedin"
                      :url="shareUrl"
                      :title="post.data.title"
                      class="bg-blue-700 hover:bg-blue-800 text-white"
                    />
                    <ShareButton 
                      platform="facebook"
                      :url="shareUrl"
                      :title="post.data.title"
                      class="bg-blue-600 hover:bg-blue-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Related Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="relatedPost.featuredImage.src || relatedPost.featuredImage" 
                  :alt="relatedPost.data.title"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute top-4 left-4">
                  <span class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {{ relatedPost.data.category }}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  <a :href="`/blog/${relatedPost.id}`" class="hover:underline">
                    {{ relatedPost.data.title }}
                  </a>
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {{ relatedPost.data.description }}
                </p>
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <time :datetime="relatedPost.data.publishDate.toISOString()">
                    {{ formatDate(relatedPost.data.publishDate) }}
                  </time>
                  <span>{{ relatedPost.readingTime }} min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p class="text-blue-100 mb-8 text-lg">Get notified when I publish new articles about web development and software engineering.</p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              required
            />
            <button
              type="submit"
              class="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ShareButton from './ShareButton.vue'

interface BlogPost {
  id: string
  data: {
    title: string
    description: string
    publishDate: Date
    author: string
    category: string
    tags?: string[]
    image?: string
    pexels_attribution?: {
      photographer: string
      photographer_url: string
      photo_url: string
    }
  }
  featuredImage?: any
  readingTime?: number
}

interface Props {
  post: BlogPost
  relatedPosts?: BlogPost[]
  author: {
    name: string
    image: string
    bio: string
  }
  readingTime: number
}

const props = defineProps<Props>()

const shareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://melvinmupondori.com/blog/${props.post.id}`
})

const tableOfContents = ref([
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'the-challenge', text: 'The Challenge', level: 2 },
  { id: 'our-approach', text: 'Our Approach', level: 2 },
  { id: 'implementation', text: 'Implementation', level: 2 },
  { id: 'results', text: 'Results', level: 2 },
  { id: 'lessons-learned', text: 'Lessons Learned', level: 2 },
  { id: 'conclusion', text: 'Conclusion', level: 2 }
])

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

onMounted(() => {
  // Extract actual headings from content if available
  const headings = document.querySelectorAll('h2, h3')
  if (headings.length > 0) {
    tableOfContents.value = Array.from(headings).map((heading, index) => ({
      id: heading.id || `heading-${index}`,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1))
    }))
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6;
}

.prose h3 {
  @apply text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose p {
  @apply mb-6 leading-relaxed;
}

.prose ul, .prose ol {
  @apply mb-6 ml-6;
}

.prose li {
  @apply mb-2;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-900 dark:bg-gray-800 p-6 rounded-lg overflow-x-auto mb-6;
}

.prose pre code {
  @apply bg-transparent p-0 text-gray-100;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 mb-6;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}
</style>
