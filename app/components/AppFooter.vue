<template>
  <footer class="site-footer">
    <div>
      <NuxtLink
        to="/"
        class="footer-brand"
      >ManHins<span>.</span></NuxtLink><p>记录生活，也保持好奇。</p>
    </div>
    <div class="footer-meta">
      <a
        href="https://github.com/ManHins"
        target="_blank"
        rel="noopener noreferrer"
      >在 GitHub 找到我 <UIcon name="i-lucide-arrow-up-right" /></a><small>© {{ new Date().getFullYear() }} ManHins · Built with Nuxt</small>
    </div>
  </footer>
</template>
