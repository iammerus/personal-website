<template>
  <article class="relative">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Breadcrumb -->
          <nav class="mb-8" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><span class="mx-2">/</span></li>
              <li><a href="/portfolio" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><span class="mx-2">/</span></li>
              <li class="text-gray-400 dark:text-gray-500 truncate">{{ project.title }}</li>
            </ol>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Project Info -->
            <div>
              <!-- Category Badge -->
              <div class="mb-6">
                <span class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {{ mapProjectCategory(project) }}
                </span>
              </div>

              <!-- Title -->
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight">
                {{ project.title }}
              </h1>

              <!-- Meta Information -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Company</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ project.company }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Role</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ project.role }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ project.duration }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ project.experience || 'Professional Project' }}</p>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {{ project.description }}
              </p>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4 mb-8">
                <a
                  v-if="project.hasProjectLink && project.projectLink"
                  :href="project.projectLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Project
                </a>
                <ShareButton 
                  platform="linkedin"
                  :url="shareUrl"
                  :title="`Check out this project: ${project.title}`"
                  class="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>

            <!-- Project Image -->
            <div class="relative">
              <div class="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  :src="project.featuredImage" 
                  :alt="project.title"
                  class="w-full h-64 md:h-80 object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics Section -->
    <section v-if="project.metrics && project.metrics.length > 0" class="py-16 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Key Results & Impact</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="metric in project.metrics"
              :key="metric.value"
              class="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50"
            >
              <div class="text-4xl md:text-6xl font-bold text-green-600 dark:text-green-400 mb-4">{{ metric.value }}</div>
              <p class="text-gray-700 dark:text-gray-300 text-lg">{{ metric.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Details -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-12">
              <!-- Problem Statement -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  The Challenge
                </h2>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ project.problem }}</p>
              </div>

              <!-- Solution -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  My Contributions
                </h2>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ project.contributions }}</p>
              </div>

              <!-- Outcomes -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Results & Impact
                </h2>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ project.outcomes }}</p>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
              <!-- Tech Stack -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in project.skills"
                    :key="skill"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Project Links -->
              <div v-if="project.hasProjectLink" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Project Links
                </h3>
                <div class="space-y-3">
                  <a
                    v-if="project.projectLink"
                    :href="project.projectLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">View Repository</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Source code on GitHub</p>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Share Project -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Project
                </h3>
                <div class="flex gap-3">
                  <ShareButton 
                    platform="twitter"
                    :url="shareUrl"
                    :title="`Check out this project: ${project.title}`"
                    class="bg-blue-500 hover:bg-blue-600 text-white"
                  />
                  <ShareButton 
                    platform="linkedin"
                    :url="shareUrl"
                    :title="`Check out this project: ${project.title}`"
                    class="bg-blue-700 hover:bg-blue-800 text-white"
                  />
                  <ShareButton 
                    platform="facebook"
                    :url="shareUrl"
                    :title="`Check out this project: ${project.title}`"
                    class="bg-blue-600 hover:bg-blue-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects -->
    <section v-if="relatedProjects.length > 0" class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Related Projects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="relatedProject in relatedProjects"
              :key="relatedProject.id"
              class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="relatedProject.featuredImage" 
                  :alt="relatedProject.title"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute top-4 right-4">
                  <span class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {{ mapProjectCategory(relatedProject) }}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  <a :href="`/portfolio/${relatedProject.id}`" class="hover:underline">
                    {{ relatedProject.title }}
                  </a>
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {{ relatedProject.description }}
                </p>
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ relatedProject.company }}</span>
                  <span>{{ relatedProject.duration }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Interested in Similar Work?</h2>
          <p class="text-blue-100 mb-8 text-lg">Let's discuss how I can help bring your project ideas to life with the same level of expertise and attention to detail.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              class="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </a>
            <a
              href="/portfolio"
              class="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ShareButton from './ShareButton.vue'

interface ProjectMetric {
  value: string
  description: string
}

interface Project {
  id: string
  title: string
  company: string
  role: string
  duration: string
  experience?: string
  skills: string[]
  description: string
  problem: string
  contributions: string
  outcomes: string
  metrics?: ProjectMetric[]
  hasProjectLink?: boolean
  projectLink?: string
  featuredImage: string
}

interface Props {
  project: Project
  relatedProjects?: Project[]
}

const props = defineProps<Props>()

const shareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://melvinmupondori.com/portfolio/${props.project.id}`
})

// Map project data to appropriate categories
const mapProjectCategory = (project: Project): string => {
  if (project.company) {
    const company = project.company.toLowerCase()
    if (company.includes('dental') || company.includes('healthcare')) return 'Healthcare'
    if (company.includes('gfinity')) return 'E-sports'
    if (company.includes('open source')) return 'Open Source'
  }
  
  if (project.title) {
    const title = project.title.toLowerCase()
    if (title.includes('clinical') || title.includes('healthcare') || title.includes('dental')) return 'Healthcare'
    if (title.includes('premier') || title.includes('league') || title.includes('gaming')) return 'E-sports'
    if (title.includes('platform') || title.includes('system')) return 'SaaS'
    if (title.includes('redflag') || title.includes('zeki')) return 'Open Source'
  }
  
  return 'Web Apps'
}
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
</style>
