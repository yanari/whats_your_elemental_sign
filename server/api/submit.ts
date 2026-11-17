import { zonedTimeToUtc } from '~/utils/zonedTimeToUtc'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const latLng = body?.latLng || {}

    if (latLng.lat == null || latLng.lng == null || !(body.localTime || body.date)) {
        throw createError({ statusCode: 400, statusMessage: 'Missing date or location' })
    }

    const { backendUrl } = useRuntimeConfig(event)

    if (!backendUrl) {
        throw createError({ statusCode: 500, statusMessage: 'NUXT_BACKEND_URL is not configured' })
    }

    // birth time is the wall clock of the birth city, not of the user's browser
    const time = latLng.timezone && body.localTime
      ? zonedTimeToUtc(body.localTime, latLng.timezone).toISOString()
      : body.date

    const response = await $fetch(`${backendUrl}/horoscope`, {
      query: {
        time,
        latitude: latLng.lat,
        longitude: latLng.lng,
      },
      // the Render free tier can take ~60s to wake up
      timeout: 90000,
    })

    return { response }
})
