import { parsePoints } from '~/utils/points'

// Rebuilds a shared result from its points code (e.g. f4e2a3w4)
export default defineEventHandler(async (event) => {
    const { p } = getQuery(event)

    if (!parsePoints(p)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid result code' })
    }

    const { backendUrl } = useRuntimeConfig(event)

    if (!backendUrl) {
        throw createError({ statusCode: 500, statusMessage: 'NUXT_BACKEND_URL is not configured' })
    }

    const response = await $fetch(`${backendUrl}/content`, {
        query: { p: String(p).toLowerCase() },
        // the Render free tier can take ~60s to wake up
        timeout: 90000,
    })

    return { response }
})
