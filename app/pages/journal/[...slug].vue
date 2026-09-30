<script setup lang="ts">
const route = useRoute()
const path = route.path.replace(/\/$/, '')
const { data: post } = await useAsyncData('post:' + path, () => queryCollection('blog').path(path).first())
if (!post.value) throw createError({ statusCode: 404, statusMessage: '这篇记录还不存在' })
useSeoMeta({ title: post.value.title, description: post.value.description })
</script>

<template>
  <article
    v-if="post"
    class="article-page"
  >
    <NuxtLink
      to="/journal"
      class="text-link small"
    ><UIcon name="i-lucide-arrow-left" />返回分享</NuxtLink>
    <header class="article-header">
      <p class="eyebrow">
        {{ post.date }} / {{ post.category }}
      </p><h1>{{ post.title }}</h1><p>{{ post.description }}</p>
    </header>
    <ContentRenderer
      :value="post"
      class="article-body"
    />
    <NuxtLink
      to="/journal"
      class="text-link article-back"
    >看看其他分享 <UIcon name="i-lucide-arrow-right" /></NuxtLink>
  </article>
</template>
