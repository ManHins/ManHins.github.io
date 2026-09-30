<script setup lang="ts">
import { projects, resumeFile } from '~/data/site'

useSeoMeta({ title: '关于我', description: '认识 ManHins，查看公开项目与简历信息。' })
const baseURL = useRuntimeConfig().app.baseURL
</script>

<template>
  <div class="inner-page">
    <PageIntro
      eyebrow="A LITTLE ABOUT ME"
      title="你好，我是 ManHins。"
      description="喜欢摄影，喜欢分享，也喜欢动手做点有趣的东西。"
    />
    <section class="about-intro">
      <div class="about-monogram">
        M<span>✳</span>
      </div><div>
        <h2>很高兴在这里遇见你。</h2><p>这是我的个人小站，把摄影、喜欢的事物和小工具放在一起。你可以从一张照片、一篇记录，或者一个 GitHub 项目开始认识我。</p><a
          href="https://github.com/ManHins"
          class="button button-dark"
          target="_blank"
          rel="noopener noreferrer"
        ><UIcon name="i-simple-icons-github" />访问我的 GitHub <UIcon name="i-lucide-arrow-up-right" /></a>
      </div>
    </section>
    <section class="home-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            OPEN SOURCE
          </p><h2>公开项目</h2>
        </div>
      </div><div class="about-projects">
        <a
          v-for="project in projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-row"
        ><UIcon name="i-lucide-folder-git-2" /><div><h3>{{ project.name }}</h3><p>{{ project.description }}</p><small><span class="language-dot" />{{ project.language }}</small></div><UIcon name="i-lucide-arrow-up-right" /></a>
      </div>
    </section>
    <section class="resume-section">
      <div class="card-icon">
        <UIcon name="i-lucide-file-user" />
      </div><div>
        <p class="eyebrow">
          RÉSUMÉ
        </p><h2>经历与简历</h2><p>完整的个人介绍与简历正在整理，之后会更新在这里。</p>
      </div><a
        v-if="resumeFile"
        class="button button-outline"
        :href="baseURL + resumeFile"
        download
      >下载简历 <UIcon name="i-lucide-download" /></a><span
        v-else
        class="status-pill"
      >待更新</span>
    </section>
  </div>
</template>
