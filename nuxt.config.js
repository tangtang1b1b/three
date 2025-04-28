// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
  ssr: true,

  app: {
    router: {
      base: process.env.APP_URL || '/',
    },
    head: {
      title: process.env.APP_TITLE,
      htmlAttrs: {
        lang: process.env.APP_DEFAULT_LANG,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.APP_DESC },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: process.env.APP_TITLE },
        { property: 'og:description', content: process.env.APP_DESC },
        { property: 'og:site_name', content: process.env.APP_TITLE },
        { property: 'og:locale', content: process.env.APP_DEFAULT_LANG },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image', content: `${process.env.APP_URL}/og_image.jpg` },
        { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.APP_URL}/favicon.ico` },
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${process.env.APP_URL}/apple-touch-icon.png` },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: `${process.env.APP_URL}/android-chrome-192x192.png` },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: `${process.env.APP_URL}/android-chrome-512x512.png` },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&display=swap' },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: 'JavaScript is required' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  pinia: {
    autoImports: ['defineStore'],
  },

  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__',
      }),
    ],
  },

  i18n: {
    defaultLocale: 'zh',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'zh',
        iso: 'zh-TW',
        file: 'zh.json',
        name: '中文',
      },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    APP_TITLE: process.env.APP_TITLE,
    APP_DESC: process.env.APP_DESC,
    APP_URL: process.env.APP_URL,
    APP_API: process.env.APP_API,
    public: {
      APP_TITLE: process.env.APP_TITLE,
      APP_KEYWORDS: process.env.APP_KEYWORDS,
      APP_DESC: process.env.APP_DESC,
      APP_URL: process.env.APP_URL,
      APP_API: process.env.APP_API,
      API_TOKEN: process.env.API_TOKEN,
      GA_ID: process.env.GA_ID,
    },
  },

  devtools: { enabled: process.env.NODE_ENV === 'development' },
  compatibilityDate: '2025-01-23',
})