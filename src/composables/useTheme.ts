import { ref, computed, watch } from 'vue'
import { useStorage, usePreferredDark } from '@vueuse/core'

export type Theme = 'light' | 'dark' | 'auto'

export function useTheme() {
  const storedTheme = useStorage<Theme>('theme', 'auto')
  const prefersDark = usePreferredDark()
  
  const theme = ref<Theme>(storedTheme.value)
  
  const isDark = computed(() => {
    if (theme.value === 'auto') {
      return prefersDark.value
    }
    return theme.value === 'dark'
  })
  
  const toggleTheme = () => {
    switch (theme.value) {
      case 'light':
        theme.value = 'dark'
        break
      case 'dark':
        theme.value = 'auto'
        break
      case 'auto':
        theme.value = 'light'
        break
    }
  }
  
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }
  
  // Apply theme to document
  watch(
    [isDark, theme],
    ([dark]) => {
      if (typeof document !== 'undefined') {
        const root = document.documentElement
        if (dark) {
          root.classList.add('dark')
          root.setAttribute('data-theme', 'dark')
        } else {
          root.classList.remove('dark')
          root.setAttribute('data-theme', 'light')
        }
      }
    },
    { immediate: true }
  )
  
  // Sync with storage
  watch(theme, (newTheme) => {
    storedTheme.value = newTheme
  })
  
  return {
    theme,
    isDark,
    toggleTheme,
    setTheme
  }
}
