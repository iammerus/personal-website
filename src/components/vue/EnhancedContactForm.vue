<template>
  <div
    ref="formContainer"
    class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 opacity-0"
  >
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Send Message
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Let's Start a Conversation
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        Fill out the form below and I'll get back to you as soon as possible
      </p>
    </div>

    <form
      ref="formRef"
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <!-- Name Field -->
      <div class="space-y-2" ref="nameField">
        <label 
          for="name" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name *
        </label>
        <div class="relative group">
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-500"
            :class="[
              errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              isValid.name ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : ''
            ]"
            placeholder="Your full name"
            @blur="validateField('name')"
            @input="clearError('name')"
            @focus="handleFieldFocus"
          />
          <div v-if="isValid.name" class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {{ errors.name }}
        </p>
      </div>

      <!-- Email Field -->
      <div class="space-y-2" ref="emailField">
        <label 
          for="email" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address *
        </label>
        <div class="relative group">
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-500"
            :class="[
              errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              isValid.email ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : ''
            ]"
            placeholder="your.email@example.com"
            @blur="validateField('email')"
            @input="clearError('email')"
            @focus="handleFieldFocus"
          />
          <div v-if="isValid.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <p v-if="errors.email" class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {{ errors.email }}
        </p>
      </div>

      <!-- Subject Field -->
      <div class="space-y-2" ref="subjectField">
        <label 
          for="subject" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Subject *
        </label>
        <div class="relative group">
          <select
            id="subject"
            v-model="form.subject"
            required
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-500 appearance-none cursor-pointer"
            :class="[
              errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              isValid.subject ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : ''
            ]"
            @change="validateField('subject')"
            @focus="handleFieldFocus"
          >
            <option value="">Select a subject</option>
            <option value="collaboration">💼 Collaboration Opportunity</option>
            <option value="job">🚀 Job Opportunity</option>
            <option value="project">🛠️ Project Discussion</option>
            <option value="consulting">💡 Consulting Inquiry</option>
            <option value="general">💬 General Inquiry</option>
            <option value="other">🤔 Other</option>
          </select>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg v-if="!isValid.subject" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <p v-if="errors.subject" class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {{ errors.subject }}
        </p>
      </div>

      <!-- Message Field -->
      <div class="space-y-2" ref="messageField">
        <label 
          for="message" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message *
        </label>
        <div class="relative group">
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="6"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-vertical group-hover:border-gray-300 dark:group-hover:border-gray-500"
            :class="[
              errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              isValid.message ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : ''
            ]"
            placeholder="Tell me about your project, opportunity, or what you'd like to discuss... 

I'd love to hear about:
• Your project goals and timeline
• Technical requirements or challenges
• Your budget and expectations
• Any specific questions you have

The more details you provide, the better I can help!"
            @blur="validateField('message')"
            @input="clearError('message')"
            @focus="handleFieldFocus"
          ></textarea>
          <div v-if="isValid.message" class="absolute right-3 top-3">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <p v-if="errors.message" class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {{ errors.message }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 ml-auto" :class="{ 'text-red-500 dark:text-red-400': form.message.length > 1000 }">
            {{ form.message.length }}/1000
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-4" ref="submitButton">
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-lg"
        >
          <span v-if="!isSubmitting" class="flex items-center justify-center gap-3">
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Send Message
          </span>
          <span v-else class="flex items-center justify-center gap-3">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        </button>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="submitStatus === 'success'" class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700 rounded-xl">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800 dark:text-green-200">Message sent successfully!</h3>
            <p class="text-sm text-green-700 dark:text-green-300 mt-1">I'll get back to you within 24 hours. Thank you for reaching out!</p>
          </div>
        </div>
      </div>

      <div v-if="submitStatus === 'error'" class="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-2 border-red-200 dark:border-red-700 rounded-xl">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Oops! Something went wrong.</h3>
            <p class="text-sm text-red-700 dark:text-red-300 mt-1">Please try again or contact me directly at mel@mups.co.zw</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

let gsap: any
let ScrollTriggerPlugin: any

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form validation
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isValid = reactive({
  name: false,
  email: false,
  subject: false,
  message: false
})

// Form state
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

// Refs
const formContainer = ref<HTMLElement>()
const formRef = ref<HTMLFormElement>()
const nameField = ref<HTMLElement>()
const emailField = ref<HTMLElement>()
const subjectField = ref<HTMLElement>()
const messageField = ref<HTMLElement>()
const submitButton = ref<HTMLElement>()

const { shouldAnimate } = useScrollAnimation()

// Validation rules
const validationRules = {
  name: (value: string) => {
    if (!value.trim()) return 'Name is required'
    if (value.trim().length < 2) return 'Name must be at least 2 characters'
    if (value.trim().length > 50) return 'Name must be less than 50 characters'
    return ''
  },
  email: (value: string) => {
    if (!value.trim()) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return ''
  },
  subject: (value: string) => {
    if (!value) return 'Please select a subject'
    return ''
  },
  message: (value: string) => {
    if (!value.trim()) return 'Message is required'
    if (value.trim().length < 20) return 'Please provide more details (at least 20 characters)'
    if (value.length > 1000) return 'Message must be less than 1000 characters'
    return ''
  }
}

// Computed
const isFormValid = computed(() => {
  return Object.values(isValid).every(valid => valid) && 
         Object.values(errors).every(error => !error)
})

// Methods
const validateField = (field: keyof typeof form) => {
  const error = validationRules[field](form[field])
  errors[field] = error
  isValid[field] = !error && form[field].trim() !== ''
}

const clearError = (field: keyof typeof form) => {
  if (errors[field]) {
    errors[field] = ''
  }
}

const handleFieldFocus = () => {
  // Add subtle animation on field focus if needed
}

const validateForm = () => {
  (Object.keys(form) as Array<keyof typeof form>).forEach(field => {
    validateField(field)
  })
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  Object.keys(isValid).forEach(key => {
    isValid[key as keyof typeof isValid] = false
  })
  submitStatus.value = 'idle'
}

const handleSubmit = async () => {
  validateForm()
  
  if (!isFormValid.value) {
    // Animate invalid fields
    if (gsap && shouldAnimate.value) {
      const invalidFields = []
      if (errors.name) invalidFields.push(nameField.value)
      if (errors.email) invalidFields.push(emailField.value)
      if (errors.subject) invalidFields.push(subjectField.value)
      if (errors.message) invalidFields.push(messageField.value)
      
      gsap.to(invalidFields, {
        x: [-10, 10, -5, 5, 0],
        duration: 0.5,
        ease: 'power2.out'
      })
    }
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For now, we'll just show success message
    // In a real implementation, you would send this to your backend
    console.log('Form submitted:', form)
    
    submitStatus.value = 'success'
    
    // Success animation
    if (gsap && shouldAnimate.value) {
      gsap.fromTo(formContainer.value,
        { scale: 1 },
        { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 }
      )
    }
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 5000)
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
    
    // Error animation
    if (gsap && shouldAnimate.value) {
      gsap.to(formContainer.value, {
        x: [-5, 5, -3, 3, 0],
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

const setupAnimations = () => {
  if (!gsap || !ScrollTriggerPlugin || !shouldAnimate.value) {
    // Show form immediately if animations are disabled
    if (formContainer.value) {
      formContainer.value.style.opacity = '1'
    }
    return
  }

  // Form container entrance animation
  if (formContainer.value) {
    gsap.fromTo(formContainer.value,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formContainer.value,
          start: 'top 80%'
        }
      }
    )
  }

  // Stagger animation for form fields
  const fields = [nameField.value, emailField.value, subjectField.value, messageField.value, submitButton.value]
  gsap.fromTo(fields,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: formContainer.value,
        start: 'top 70%'
      }
    }
  )
}

// Lifecycle
onMounted(async () => {
  // Dynamically import GSAP only on client-side
  if (typeof window !== 'undefined') {
    const { gsap: gsapImport } = await import('gsap')
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
    
    gsap = gsapImport
    ScrollTriggerPlugin = ScrollTrigger
    gsap.registerPlugin(ScrollTriggerPlugin)
    
    setupAnimations()
  } else {
    // Show form immediately on server-side
    if (formContainer.value) {
      formContainer.value.style.opacity = '1'
    }
  }
})
</script>

<style scoped>
/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark textarea::-webkit-scrollbar-track {
  background: #374151;
}

.dark textarea::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Enhanced select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.dark select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%259ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}
</style>
