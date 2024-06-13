// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['@syncfusion']
  },
  ssr: false,
  modules: [
    'floating-vue/nuxt'
  ],
  nitro: {
    experimental: {
      database: true
    }
  }
})
