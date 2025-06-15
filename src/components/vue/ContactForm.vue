<template>
  <div
    ref="formContainer"
    class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 sticky top-8"
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
    <div class="space-y-2">
      <label 
        for="name" 
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Full Name *
      </label>
      <div class="relative">
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="[
            errors.name ? 'border-red-500 focus:ring-red-500' : '',
            isValid.name ? 'border-green-500' : ''
          ]"
          placeholder="Your full name"
          @blur="validateField('name')"
          @input="clearError('name')"
        />
        <div v-if="isValid.name" class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.name }}
      </p>
    </div>

    <!-- Email Field -->
    <div class="space-y-2">
      <label 
        for="email" 
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Email Address *
      </label>
      <div class="relative">
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="[
            errors.email ? 'border-red-500 focus:ring-red-500' : '',
            isValid.email ? 'border-green-500' : ''
          ]"
          placeholder="your.email@example.com"
          @blur="validateField('email')"
          @input="clearError('email')"
        />
        <div v-if="isValid.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <p v-if="errors.email" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.email }}
      </p>
    </div>

    <!-- Subject Field -->
    <div class="space-y-2">
      <label 
        for="subject" 
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Subject *
      </label>
      <div class="relative">
        <select
          id="subject"
          v-model="form.subject"
          required
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="[
            errors.subject ? 'border-red-500 focus:ring-red-500' : '',
            isValid.subject ? 'border-green-500' : ''
          ]"
          @change="validateField('subject')"
        >
          <option value="">Select a subject</option>
          <option value="collaboration">Collaboration Opportunity</option>
          <option value="job">Job Opportunity</option>
          <option value="project">Project Discussion</option>
          <option value="consulting">Consulting Inquiry</option>
          <option value="general">General Inquiry</option>
          <option value="other">Other</option>
        </select>
        <div v-if="isValid.subject" class="absolute right-10 top-1/2 transform -translate-y-1/2">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <p v-if="errors.subject" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.subject }}
      </p>
    </div>

    <!-- Message Field -->
    <div class="space-y-2">
      <label 
        for="message" 
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Message *
      </label>
      <div class="relative">
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="6"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
          :class="[
            errors.message ? 'border-red-500 focus:ring-red-500' : '',
            isValid.message ? 'border-green-500' : ''
          ]"
          placeholder="Tell me about your project, opportunity, or what you'd like to discuss..."
          @blur="validateField('message')"
          @input="clearError('message')"
        ></textarea>
        <div v-if="isValid.message" class="absolute right-3 top-3">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p v-if="errors.message" class="text-sm text-red-600 dark:text-red-400">
          {{ errors.message }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {{ form.message.length }}/1000
        </p>
      </div>
    </div>

    <!-- Honeypot field for spam protection (hidden) -->
    <input
      type="text"
      name="_gotcha"
      style="display: none !important;"
      tabindex="-1"
      autocomplete="off"
    />

    <!-- Submit Button -->
    <div class="pt-4">
      <InteractiveButton
        type="submit"
        :disabled="!canSubmit || isSubmitting"
        :loading="isSubmitting"
        class="w-full"
        :class="{ 'opacity-50': !canSubmit }"
      >
        <template #icon>
          <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </template>
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </InteractiveButton>
      
      <!-- Rate limiting feedback -->
      <div v-if="nextSubmissionTime && !canSubmit" class="mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg">
        <p class="text-amber-800 dark:text-amber-200 text-sm text-center">
          ⏱️ Please wait {{ nextSubmissionTime }} minute{{ nextSubmissionTime > 1 ? 's' : '' }} before submitting again
        </p>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <Transition name="message" appear>
      <div v-if="submitStatus === 'success'" class="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg transition-all duration-300">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="text-green-800 dark:text-green-200 font-medium mb-1">
              ✨ Message sent successfully!
            </p>
            <p class="text-green-700 dark:text-green-300 text-sm">
              Thank you for reaching out! I'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="message" appear>
      <div v-if="submitStatus === 'error'" class="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg transition-all duration-300">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <div>
            <p class="text-red-800 dark:text-red-200 font-medium mb-1">
              ⚠️ Unable to send message
            </p>
            <p class="text-red-700 dark:text-red-300 text-sm mb-2">
              There was an error sending your message. Please try again or contact me directly.
            </p>
            <p class="text-red-600 dark:text-red-400 text-xs">
              Email: <a href="mailto:mel@mups.co.zw" class="underline hover:no-underline">mel@mups.co.zw</a>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import InteractiveButton from './InteractiveButton.vue'

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
const lastSubmissionTime = ref<number>(0)
const submissionCount = ref(0)

// Refs
const formRef = ref<HTMLFormElement>()

// Rate limiting constants
const RATE_LIMIT_MINUTES = 5 // Minimum minutes between submissions
const MAX_SUBMISSIONS_PER_HOUR = 3

// Validation rules
const validationRules = {
  name: (value: string) => {
    if (!value.trim()) return 'Name is required'
    if (value.trim().length < 2) return 'Name must be at least 2 characters'
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
    if (value.trim().length < 10) return 'Message must be at least 10 characters'
    if (value.length > 1000) return 'Message must be less than 1000 characters'
    return ''
  }
}

// Computed
const isFormValid = computed(() => {
  return Object.values(isValid).every(valid => valid) && 
         Object.values(errors).every(error => !error)
})

const canSubmit = computed(() => {
  const now = Date.now()
  const timeSinceLastSubmission = now - lastSubmissionTime.value
  const minutesSinceLastSubmission = timeSinceLastSubmission / (1000 * 60)
  
  return isFormValid.value && 
         !isSubmitting.value && 
         minutesSinceLastSubmission >= RATE_LIMIT_MINUTES &&
         submissionCount.value < MAX_SUBMISSIONS_PER_HOUR
})

const nextSubmissionTime = computed(() => {
  if (canSubmit.value) return null
  
  const timeSinceLastSubmission = Date.now() - lastSubmissionTime.value
  const minutesRemaining = RATE_LIMIT_MINUTES - (timeSinceLastSubmission / (1000 * 60))
  
  return Math.ceil(minutesRemaining)
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
  
  if (!canSubmit.value) {
    if (nextSubmissionTime.value) {
      console.warn(`Please wait ${nextSubmissionTime.value} minutes before submitting again`)
    }
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Prepare FormData for FormSpree
    const formData = new FormData()
    formData.append('name', form.name.trim())
    formData.append('email', form.email.trim())
    formData.append('subject', form.subject)
    formData.append('message', form.message.trim())
    
    // FormSpree configuration fields
    formData.append('_replyto', form.email.trim()) // Set reply-to email
    formData.append('_subject', `New Contact Form Submission: ${form.subject}`) // Custom subject
    formData.append('_cc', '') // Add CC if needed
    formData.append('_language', 'en') // Set language
    
    // Add timestamp and user agent for tracking
    formData.append('_timestamp', new Date().toISOString())
    formData.append('_user_agent', navigator.userAgent)
    
    // Submit to FormSpree
    const response = await fetch('https://formspree.io/f/mdkzzeyj', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    if (response.ok) {
      submitStatus.value = 'success'
      
      // Update rate limiting trackers
      lastSubmissionTime.value = Date.now()
      submissionCount.value += 1
      
      // Store in localStorage for persistence across sessions
      localStorage.setItem('contactFormLastSubmission', lastSubmissionTime.value.toString())
      localStorage.setItem('contactFormSubmissionCount', submissionCount.value.toString())
      
      // Reset form after successful submission
      setTimeout(() => {
        resetForm()
      }, 3000)
    } else {
      // Handle FormSpree specific errors
      if (data.errors) {
        console.error('FormSpree validation errors:', data.errors)
        // You could show specific field errors here if needed
      }
      throw new Error(data.error || 'Form submission failed')
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
    
    // Show more specific error messages
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error - please check your connection')
    }
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Restore rate limiting state from localStorage
  const storedLastSubmission = localStorage.getItem('contactFormLastSubmission')
  const storedSubmissionCount = localStorage.getItem('contactFormSubmissionCount')
  
  if (storedLastSubmission) {
    lastSubmissionTime.value = parseInt(storedLastSubmission, 10)
  }
  
  if (storedSubmissionCount) {
    const count = parseInt(storedSubmissionCount, 10)
    const hourAgo = Date.now() - (60 * 60 * 1000)
    
    // Reset count if more than an hour has passed
    if (lastSubmissionTime.value < hourAgo) {
      submissionCount.value = 0
      localStorage.removeItem('contactFormSubmissionCount')
    } else {
      submissionCount.value = count
    }
  }
  
  // Add form animation on mount
  if (formRef.value) {
    formRef.value.style.opacity = '0'
    formRef.value.style.transform = 'translateY(20px)'
    
    setTimeout(() => {
      if (formRef.value) {
        formRef.value.style.transition = 'all 0.6s ease-out'
        formRef.value.style.opacity = '1'
        formRef.value.style.transform = 'translateY(0)'
      }
    }, 100)
  }
})
</script>

<style scoped>
/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation for form appearance */
.form-appear {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
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

/* Message transition animations */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.message-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.message-enter-to,
.message-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .form-appear,
  .message-enter-active,
  .message-leave-active {
    animation: none;
    transition: none !important;
  }
  
  input,
  textarea,
  select,
  button {
    transition: none !important;
  }
}
</style>
