<template>
  <div>
    <!-- Hero Section -->
    <section 
      ref="heroRef"
      class="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 relative overflow-hidden"
    >
      <!-- Background decorative elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 -right-12 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 -left-12 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
          <div ref="badgeRef" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 opacity-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Professional Resume
          </div>
          
          <h1 
            ref="titleRef"
            class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4 opacity-0"
          >
            {{ resumeData.personalInfo.name }}
          </h1>
          
          <p 
            ref="subtitleRef"
            class="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6 opacity-0"
          >
            {{ resumeData.personalInfo.title }}
          </p>
          
          <div ref="contactRef" class="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-300 mb-8 opacity-0">
            <div class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ resumeData.personalInfo.location }}
            </div>
            <a 
              :href="`mailto:${resumeData.personalInfo.email}`" 
              class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 transform hover:scale-105"
            >
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ resumeData.personalInfo.email }}
            </a>
            <a 
              :href="linksData.links.github?.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div ref="actionsRef" class="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <a
            href="/resume.pdf"
            download
            class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Resume
          </a>
          
          <a
            href="/contact"
            class="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 rounded-xl font-semibold hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
          >
            <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Let's Connect
          </a>
        </div>
      </div>
    </section>
    
    <!-- Profile Summary -->
    <section 
      ref="profileRef"
      class="py-20 bg-white dark:bg-gray-900"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About Me
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Professional Summary</h2>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-blue-100 dark:border-blue-800/50">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ resumeData.profile }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Experience Timeline -->
    <section 
      ref="experienceRef"
      class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM8 14v4a2 2 0 002 2h4a2 2 0 002-2v-4" />
            </svg>
            Career Journey
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Over 5 years of building scalable web solutions across healthcare, e-sports, and enterprise sectors
          </p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div class="space-y-12">
              <div 
                v-for="(exp, index) in resumeData.experience" 
                :key="index"
                :ref="el => { if (el) experienceItems[index] = el }"
                :class="[
                  'relative flex items-center',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                ]"
              >
                <!-- Timeline dot -->
                <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                
                <!-- Content -->
                <div :class="[
                  'w-full md:w-1/2 ml-16 md:ml-0',
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                ]">
                  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <!-- Header -->
                    <div class="mb-6">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ exp.position }}</h3>
                          <p class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">{{ exp.company }}</p>
                          <p v-if="exp.location" class="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {{ exp.location }}
                          </p>
                        </div>
                        <span class="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {{ exp.duration }}
                        </span>
                      </div>
                    </div>
                    
                    <!-- Achievements -->
                    <div v-if="exp.achievements && exp.achievements.length > 0" class="mb-6">
                      <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Key Achievements
                      </h4>
                      <ul class="space-y-3">
                        <li 
                          v-for="(achievement, achIndex) in exp.achievements" 
                          :key="achIndex"
                          class="flex items-start group"
                        >
                          <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <span class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ achievement }}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <!-- Tech Stack -->
                    <div v-if="exp.techStack && exp.techStack.length > 0">
                      <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Technologies Used
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="(tech, techIndex) in exp.techStack" 
                          :key="techIndex"
                          class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 transform hover:scale-105"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Section -->
    <section 
      ref="skillsRef"
      class="py-20 bg-white dark:bg-gray-900"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Technical Expertise
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Proficient across the full technology stack with expertise in modern frameworks and tools
          </p>
        </div>
        
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(skillGroup, category) in skillGroups" 
            :key="category"
            :ref="el => { if (el) skillItems.push(el) }"
            class="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category }}</h3>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="skill in skillGroup" 
                :key="skill.name"
                class="group"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ skill.name }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {{ skill.level }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-3 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out transform origin-left"
                    :style="`width: ${skill.level}%`"
                    :data-level="skill.level"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Education & Languages -->
    <section 
      ref="additionalRef"
      class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Education -->
          <div v-if="resumeData.education && resumeData.education.length > 0">
            <div class="text-center mb-8">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Academic Background</h3>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(edu, index) in resumeData.education" 
                :key="index"
                class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
              >
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ edu.degree }}</h4>
                <p class="text-blue-600 dark:text-blue-400 font-semibold mb-1">{{ edu.institution }}</p>
                <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span v-if="edu.location" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ edu.location }}
                  </span>
                  <span v-if="edu.duration" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 112 0v1m-6 0h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
                    </svg>
                    {{ edu.duration }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Languages -->
          <div v-if="resumeData.languages && resumeData.languages.length > 0">
            <div class="text-center mb-8">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Languages
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Language Proficiency</h3>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(lang, index) in resumeData.languages" 
                :key="index"
                class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ lang.language }}</h4>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    {{ lang.proficiency }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

interface Props {
  resumeData: any
  linksData: any
}

const props = defineProps<Props>()

let gsap: any
let ScrollTriggerPlugin: any

// Template refs
const heroRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const contactRef = ref<HTMLElement>()
const actionsRef = ref<HTMLElement>()
const profileRef = ref<HTMLElement>()
const experienceRef = ref<HTMLElement>()
const skillsRef = ref<HTMLElement>()
const additionalRef = ref<HTMLElement>()

const experienceItems = ref<HTMLElement[]>([])
const skillItems = ref<HTMLElement[]>([])

const { shouldAnimate } = useScrollAnimation()

// Process skills data
const skillGroups = computed(() => {
  const skills = props.resumeData.skills
  if (!skills) return {}
  
  const groups: Record<string, Array<{name: string, level: number}>> = {}
  
  Object.entries(skills).forEach(([category, skillList]) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')
    groups[categoryName] = (skillList as string[]).map(skill => ({
      name: skill,
      level: Math.floor(Math.random() * 20) + 80 // Random level between 80-100 for demo
    }))
  })
  
  return groups
})

const setupAnimations = () => {
  if (!gsap || !ScrollTriggerPlugin || !shouldAnimate.value) {
    // Show all elements immediately if animations disabled
    const elements = [badgeRef.value, titleRef.value, subtitleRef.value, contactRef.value, actionsRef.value]
    elements.forEach(el => {
      if (el) el.style.opacity = '1'
    })
    return
  }

  // Hero section animations
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top 80%'
    }
  })

  heroTimeline
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
    .fromTo(contactRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(actionsRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )

  // Experience items animation
  experienceItems.value.forEach((item, index) => {
    if (item) {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotationY: index % 2 === 0 ? -15 : 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%'
          }
        }
      )
    }
  })

  // Skills animation with stagger
  if (skillItems.value.length > 0) {
    gsap.fromTo(skillItems.value,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsRef.value,
          start: 'top 70%'
        }
      }
    )
  }

  // Animate skill bars
  const skillBars = document.querySelectorAll('[data-level]')
  skillBars.forEach((bar) => {
    const level = bar.getAttribute('data-level')
    gsap.fromTo(bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%'
        }
      }
    )
  })
}

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
</script>

<style scoped>
/* Custom animations for better performance */
.skill-bar {
  transform-origin: left center;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print styles */
@media print {
  .bg-gradient-to-br,
  .bg-gradient-to-r {
    background: white !important;
    color: black !important;
  }
  
  .shadow-lg,
  .shadow-xl,
  .shadow-2xl {
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
  }
}
</style>
