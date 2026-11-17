// Open Graph / Twitter tags shared by every page that can be posted on social media.
// Everything is computed locally (no backend call) so crawlers get the tags instantly.
export const useShareSeo = (meta: MaybeRefOrGetter<{ title: string, description: string, path: string }>) => {
    const { origin } = useRequestURL()
    const ogImage = `${origin}/og-image.jpg`
    const imageAlt = 'Moon phases over a starry sky'

    const title = () => toValue(meta).title
    const description = () => toValue(meta).description

    useSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,

        description,
        ogDescription: description,
        twitterDescription: description,

        ogImage,
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogImageType: 'image/jpeg',
        ogImageAlt: imageAlt,
        twitterImage: ogImage,
        twitterImageAlt: imageAlt,

        // crawlers follow og:url as the canonical page
        ogUrl: () => origin + toValue(meta).path,
        ogSiteName: "What's Your Elemental Sign?",
        ogLocale: 'en_US',
        ogType: 'website',
        twitterCard: 'summary_large_image',
    })
}
