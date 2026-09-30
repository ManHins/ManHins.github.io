<script setup lang="ts">
useSeoMeta({ title: '分享', description: 'ManHins 的随记、收藏和建站记录。' })
const { data: posts } = await useAsyncData('journal-posts', () => queryCollection('blog').order('date', 'DESC').all())
const resources = [
  { name: 'Nuxt Portfolio', description: '这个小站的设计起点。', url: 'https://github.com/nuxt-ui-templates/portfolio', icon: 'i-simple-icons-nuxt' },
  { name: 'GitHub Pages', description: '给个人网站一个公开的地址。', url: 'https://docs.github.com/pages', icon: 'i-simple-icons-github' },
  { name: 'FastAPI', description: '未来扩展 Python 小工具的备选。', url: 'https://fastapi.tiangolo.com/', icon: 'i-simple-icons-fastapi' }
]
</script>

<template>
  <div class="inner-page">
    <PageIntro
      eyebrow="NOTES & FINDS"
      title="值得留下来的。"
      description="随记、收藏，还有一些想分享给你的东西。"
    />
    <section class="journal-list">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        class="journal-entry"
      ><div class="journal-date">{{ post.date }}<span>{{ post.category }}</span></div><div><h2>{{ post.title }}</h2><p>{{ post.description }}</p></div><UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
    </section>
    <section class="home-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            BOOKMARKS
          </p><h2>建站时用到的参考</h2>
        </div>
      </div><div class="resource-grid">
        <a
          v-for="item in resources"
          :key="item.name"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="resource-card"
        ><UIcon :name="item.icon" /><h3>{{ item.name }} <UIcon name="i-lucide-arrow-up-right" /></h3><p>{{ item.description }}</p></a>
      </div>
    </section>
    <div class="quiet-note">
      <UIcon name="i-lucide-bookmark" /><p>书、电影、音乐和其他喜欢的事物，慢慢补进来。</p>
    </div>
  </div>
</template>
