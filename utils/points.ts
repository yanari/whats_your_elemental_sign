// A result is shared as its element points in a fixed order, e.g. f4e2a3w4.
// It carries no birth data, only what is needed to rebuild the result page.
const ORDER = [
    ['Fire', 'f'],
    ['Earth', 'e'],
    ['Air', 'a'],
    ['Water', 'w'],
] as const

const POINTS_REGEX = /^f(\d{1,2})e(\d{1,2})a(\d{1,2})w(\d{1,2})$/

export type ElementPoints = Record<string, number>

export const parsePoints = (code: unknown): ElementPoints | null => {
    const match = POINTS_REGEX.exec(String(code || '').toLowerCase())

    if (!match) {
        return null
    }

    const points = Object.fromEntries(ORDER.map(([element], i) => [element, Number(match[i + 1])]))
    const total = Object.values(points).reduce((acc, value) => acc + value, 0)

    return total > 0 ? points : null
}

export const encodePoints = (calculation: { name: string, points: number }[] = []) => {
    return ORDER.map(([element, letter]) => {
        const found = calculation.find(item => item.name === element)
        return letter + (found ? found.points : 0)
    }).join('')
}

// { Fire: 4, Earth: 2, Air: 3, Water: 4 } -> 'fw'
export const getDominantLetters = (points: ElementPoints) => {
    const highest = Math.max(...Object.values(points))

    return ORDER
        .filter(([element]) => points[element] === highest)
        .map(([, letter]) => letter)
        .join('')
}
