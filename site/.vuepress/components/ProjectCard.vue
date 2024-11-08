// docs/.vuepress/components/ProjectCard.vue
<template>
  <div class="project-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="tech-stack">
      <span v-for="tech in techArray" :key="tech">{{ tech }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tech: {
      type: [Array, String],
      required: true
    }
  },
  computed: {
    techArray() {
      return this.tech
    }
  }
}
</script>