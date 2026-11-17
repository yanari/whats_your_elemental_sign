import { getElementNames } from '~/utils/elements'

const ELEMENT_LETTERS_REGEX = /^[feaw]{1,4}$/

// dominantLetters: 'fw' for Fire and Water; anything invalid falls back to the generic texts
export const getShareMeta = (dominantLetters?: unknown) => {
    if (typeof dominantLetters === 'string' && ELEMENT_LETTERS_REGEX.test(dominantLetters)) {
        const { text } = getElementNames(dominantLetters)

        return {
            title: `My chart is ruled by ${text} — it kind of explains everything.`,
            description: 'Discover what elements rule your chart and what it reveals about you 🌌 Made by github.com/yanari',
        }
    }

    return {
        title: "What's Your Elemental Sign? 🔮",
        description: 'Discover the element that rules your birth chart — are you Fire, Earth, Air or Water? Built by github.com/yanari',
    }
}
