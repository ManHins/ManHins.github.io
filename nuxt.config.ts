export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content'],
  devtools: { enabled: false },
  app: { baseURL: process.env.NUXT_APP_BASE_URL || '/', head: { htmlAttrs: { lang: 'zh-CN' } } },
  css: ['~/assets/css/main.css'],
  colorMode: { preference: 'light', fallback: 'light' },
  content: { experimental: { sqliteConnector: 'native' } },
  ui: { fonts: false },
  compatibilityDate: '2026-06-30',
  nitro: { prerender: { routes: ['/', '/photography', '/journal', '/lab', '/about'], crawlLinks: true } },
  eslint: { config: { stylistic: { commaDangle: 'never', braceStyle: '1tbs' } } },
  icon: { clientBundle: { scan: true }, provider: 'none' }
})
