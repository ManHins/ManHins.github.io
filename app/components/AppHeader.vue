<template>
  <header class="site-header">
    <NuxtLink
      to="/"
      class="wordmark"
      aria-label="ManHins 首页"
    >m<span>.</span></NuxtLink>
    <nav
      class="nav-pill"
      aria-label="主导航"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :exact-active-class="link.to === '/' ? 'active' : ''"
        :active-class="link.to !== '/' ? 'active' : ''"
      >{{ link.label }}</NuxtLink>
      <span class="nav-divider" /><ColorModeButton />
    </nav>
    <a
      class="header-github"
      href="https://github.com/ManHins"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="访问 ManHins 的 GitHub"
    ><UIcon name="i-simple-icons-github" /></a>
  </header>
</template>
