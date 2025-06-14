<template>
  <form
    ref="formRef"
    class="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
    @submit.prevent="handleSubmit"
  >
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Send a Message
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        I'll get back to you as soon as possible
      </p>
    </div>

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

    <!-- Submit Button -->
    <div class="pt-4">
      <InteractiveButton
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        :loading="isSubmitting"
        class="w-full"
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
    </div>

    <!-- Success/Error Messages -->
    <div v-if="submitStatus === 'success'" class="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-800 dark:text-green-200 font-medium">
          Message sent successfully! I'll get back to you soon.
        </p>
      </div>
    </div>

    <div v-if="submitStatus === 'error'" class="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200 font-medium">
          There was an error sending your message. Please try again or contact me directly.
        </p>
      </div>
    </div>
  </form>
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

// Refs
const formRef = ref<HTMLFormElement>()

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
  
  if (!isFormValid.value) {
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
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)
    
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(() => {
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

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .form-appear {
    animation: none;
  }
  
  input,
  textarea,
  select,
  button {
    transition: none !important;
  }
}
</style>
