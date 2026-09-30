<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
useSeoMeta({ title: '页面未找到' })
</script>

<template>
  <UApp>
    <div class="error-page">
      <span class="eyebrow">{{ error.statusCode || 404 }}</span><h1>好像走到了一条小岔路。</h1><p>这个页面还不存在，回首页继续逛逛吧。</p><button
        class="button button-dark"
        @click="clearError({ redirect: '/' })"
      >
        回到首页 <UIcon name="i-lucide-arrow-right" />
      </button>
    </div>
  </UApp>
</template>
