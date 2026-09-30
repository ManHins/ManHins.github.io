<script setup lang="ts">
defineProps<{ eyebrow: string, title: string, description: string }>()
</script>

<template>
  <section class="page-intro">
    <p class="eyebrow">
      <span />{{ eyebrow }}
    </p><h1>{{ title }}</h1><p class="page-description">
      {{ description }}
    </p>
  </section>
</template>
