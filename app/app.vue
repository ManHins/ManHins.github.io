<script setup lang="ts">
const baseURL = useRuntimeConfig().app.baseURL
useHead({ link: [{ rel: 'icon', type: 'image/svg+xml', href: baseURL + 'favicon.svg' }] })
useSeoMeta({
  titleTemplate: title => title ? title + ' · ManHins' : 'ManHins · 个人小站',
  description: 'ManHins 的个人小站。用照片记录生活，分享喜欢的事，也做一些有趣的小工具。',
  ogSiteName: 'ManHins', ogLocale: 'zh_CN'
})
</script>

<template>
  <UApp><NuxtLayout><NuxtPage /></NuxtLayout></UApp>
</template>
