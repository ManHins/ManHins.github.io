<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <ClientOnly>
    <button
      class="icon-button theme-switch"
      :aria-label="colorMode.value === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
    >
      <UIcon
        v-if="colorMode.value === 'dark'"
        name="i-lucide-moon"
      /><UIcon
        v-else
        name="i-lucide-sun"
      />
    </button>
    <template #fallback>
      <span
        class="icon-button theme-switch"
        aria-hidden="true"
      ><UIcon name="i-lucide-sun" /></span>
    </template>
  </ClientOnly>
</template>
