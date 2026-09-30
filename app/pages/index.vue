<script setup lang="ts">
import { photos, projects } from '~/data/site'

const baseURL = useRuntimeConfig().app.baseURL
useSeoMeta({ title: '首页' })
const { data: posts } = await useAsyncData('home-posts', () => queryCollection('blog').order('date', 'DESC').limit(2).all())
</script>

<template>
  <div>
    <section class="home-hero">
      <p class="eyebrow">
        <span />A LITTLE CORNER OF THE INTERNET
      </p>
      <div class="hero-name">
        <span class="avatar-monogram">M<span>✳</span></span><span>你好，我是 ManHins <span class="wave">✳</span></span>
      </div>
      <h1>把喜欢的事，<br><span>慢慢记下来。</span></h1>
      <p class="hero-description">
        用照片收藏日常，用文字分享所爱。<br>也在这里，折腾一些有趣的小东西。
      </p>
      <div class="hero-actions">
        <NuxtLink
          class="button button-dark"
          to="/photography"
        >看看我的相册 <UIcon name="i-lucide-arrow-up-right" /></NuxtLink><NuxtLink
          class="text-link"
          to="/about"
        >认识一下 <UIcon name="i-lucide-arrow-right" /></NuxtLink>
      </div>
      <div class="hero-side-note">
        Life, in little pieces.<span>↙</span>
      </div>
    </section>
    <section
      class="photo-strip"
      aria-label="相册版式预览"
    >
      <NuxtLink
        v-for="(photo, index) in photos.slice(0, 4)"
        :key="photo.id"
        to="/photography"
        class="photo-print"
        :style="{ '--rotation': [-5, 3, -3, 5][index] + 'deg' }"
      >
        <img
          :src="baseURL + photo.src"
          :alt="photo.alt"
          width="280"
          height="280"
          :fetchpriority="index < 2 ? 'high' : 'auto'"
        >
        <span><span>{{ photo.title }}</span><span class="print-number">/ {{ photo.id }}</span></span>
      </NuxtLink>
    </section>
    <p class="demo-caption">
      <span class="tiny-dot" />相册版式预览 · 当前为模板示例影像，个人作品待更新
    </p>
    <section class="home-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            EXPLORE
          </p><h2>这里有什么</h2>
        </div><p class="section-aside">
          生活、想法和一点创造力。
        </p>
      </div>
      <div class="explore-grid">
        <NuxtLink
          to="/photography"
          class="explore-card"
        ><span class="card-icon"><UIcon name="i-lucide-camera" /></span><h3>光影之间</h3><p>把看见的风景，<br>变成可以重温的片刻。</p><span class="card-link">摄影相册 <UIcon name="i-lucide-arrow-up-right" /></span></NuxtLink>
        <NuxtLink
          to="/journal"
          class="explore-card"
        ><span class="card-icon"><UIcon name="i-lucide-book-open" /></span><h3>值得分享</h3><p>一些喜欢的东西，<br>和想留下来的想法。</p><span class="card-link">随记与收藏 <UIcon name="i-lucide-arrow-up-right" /></span></NuxtLink>
        <NuxtLink
          to="/lab"
          class="explore-card"
        ><span class="card-icon"><UIcon name="i-lucide-flask-conical" /></span><h3>好奇心实验室</h3><p>把小小的灵感，<br>做成真的能用的东西。</p><span class="card-link">试试小工具 <UIcon name="i-lucide-arrow-up-right" /></span></NuxtLink>
      </div>
    </section>
    <section class="home-section two-column">
      <div>
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">
              LATEST NOTES
            </p><h2>最近记录</h2>
          </div><NuxtLink
            class="text-link small"
            to="/journal"
          >全部 <UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
        </div><NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="note-item"
        ><span class="note-date">{{ post.date }} <span>· {{ post.category }}</span></span><h3>{{ post.title }} <UIcon name="i-lucide-arrow-up-right" /></h3><p>{{ post.description }}</p></NuxtLink>
      </div>
      <div>
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">
              BUILT WITH CURIOSITY
            </p><h2>代码里的另一面</h2>
          </div><a
            class="text-link small"
            href="https://github.com/ManHins"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub <UIcon name="i-lucide-arrow-up-right" /></a>
        </div><a
          v-for="project in projects"
          :key="project.name"
          class="project-row"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
        ><UIcon name="i-lucide-folder-git-2" /><div><h3>{{ project.name }}</h3><p>{{ project.description }}</p><small><span class="language-dot" />{{ project.language }}</small></div><UIcon name="i-lucide-arrow-up-right" /></a>
      </div>
    </section>
    <section class="closing-note">
      <span>✳</span><p>不急着定义自己。<br><strong>先记录，先尝试，先喜欢。</strong></p><NuxtLink
        to="/about"
        class="text-link"
      >更多关于我 <UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
    </section>
  </div>
</template>
