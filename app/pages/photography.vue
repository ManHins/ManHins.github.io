<script setup lang="ts">
import {
  photos
} from '~/data/site'

useSeoMeta({ title: '摄影', description: 'ManHins 的相册。用影像收藏日常，个人摄影作品即将更新。'
})
const baseURL = useRuntimeConfig().app.baseURL
const category = ref('全部')
const categories = ['全部', ...new Set(photos.map(photo => photo.category))]
const filtered = computed(() => photos.filter(photo => category.value === '全部' || photo.category === category.value))
const selected = ref<(typeof photos)[number] | null>(null)
const dialog = useTemplateRef('lightbox')
async function openPhoto(photo: (typeof photos)[number]) {
  selected.value = photo
  await nextTick()
  dialog.value?.showModal()
}
function closePhoto() {
  dialog.value?.close()
}
function handleBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) closePhoto()
}
function stepPhoto(direction: number) {
  const index = filtered.value.findIndex(photo => photo.id === selected.value?.id)
  selected.value = filtered.value[(index + direction + filtered.value.length) % filtered.value.length] ?? null
}
function handleKey(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    stepPhoto(1)
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    stepPhoto(-1)
  }
}
</script>

<template>
  <div class="inner-page">
    <PageIntro
      eyebrow="THROUGH MY LENS"
      title="一些想留住的瞬间。"
      description="按下快门，让平常的一刻多停留一会儿。"
    />
    <div class="gallery-notice">
      <UIcon name="i-lucide-info" /><p>相册正在准备中。以下为 Nuxt Portfolio 模板示例影像，用于预览排版，并非本人摄影作品。</p>
    </div>
    <div class="gallery-toolbar">
      <div
        class="filter-pills"
        aria-label="相册分类"
      >
        <button
          v-for="item in categories"
          :key="item"
          :class="{ selected: category === item }"
          :aria-pressed="category === item"
          @click="category = item"
        >
          {{ item }}
        </button>
      </div><span>{{ filtered.length }} 张示例影像</span>
    </div>
    <div class="photo-grid">
      <button
        v-for="photo in filtered"
        :key="photo.id"
        class="gallery-photo"
        @click="openPhoto(photo)"
      >
        <div class="gallery-image">
          <img
            :src="baseURL + photo.src"
            :alt="photo.alt"
            loading="lazy"
            width="480"
            height="540"
          ><span class="photo-enlarge"><UIcon name="i-lucide-expand" /></span><span
            v-if="photo.demo"
            class="sample-badge"
          >示例影像</span>
        </div><span class="photo-info"><strong>{{ photo.title }}</strong><span>{{ photo.category }} / {{ photo.id }}</span></span>
      </button>
    </div>
    <dialog
      ref="lightbox"
      class="lightbox"
      aria-labelledby="lightbox-title"
      @keydown="handleKey"
      @click="handleBackdrop"
    >
      <div
        v-if="selected"
        class="lightbox-content"
      >
        <button
          class="lightbox-close icon-button"
          aria-label="关闭大图"
          autofocus
          @click="closePhoto"
        >
          <UIcon name="i-lucide-x" />
        </button><img
          :src="baseURL + selected.src"
          :alt="selected.alt"
        ><div class="lightbox-caption">
          <div>
            <h2 id="lightbox-title">
              {{ selected.title }}
            </h2><p>{{ selected.demo ? '模板示例影像 · 非本人作品' : selected.category }}</p>
          </div><div class="lightbox-controls">
            <button
              class="icon-button"
              aria-label="上一张照片"
              @click="stepPhoto(-1)"
            >
              <UIcon name="i-lucide-arrow-left" />
            </button><button
              class="icon-button"
              aria-label="下一张照片"
              @click="stepPhoto(1)"
            >
              <UIcon name="i-lucide-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
