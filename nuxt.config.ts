// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@stefanobartoletti/nuxt-social-share',
    ],
    runtimeConfig: {
        // overridden at runtime by NUXT_BACKEND_URL (or BACKEND_URL as fallback)
        backendUrl: process.env.BACKEND_URL || '',
    },
    routeRules: {
        // results live in localStorage, so this page can only render in the browser
        '/result': { ssr: false },
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
})
