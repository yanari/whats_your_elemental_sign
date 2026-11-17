// Difference (ms) between the wall clock in `timeZone` and UTC at a given instant
const getOffset = (timestamp: number, timeZone: string) => {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).formatToParts(new Date(timestamp))

    const get = (type: string) => Number(parts.find(part => part.type === type)?.value)

    const wallClockAsUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))

    return wallClockAsUtc - timestamp
}

// '1997-03-03T01:00:00' + 'America/Sao_Paulo' -> the real instant of that birth time
export const zonedTimeToUtc = (localTime: string, timeZone: string) => {
    const wallClock = Date.parse(localTime + 'Z')
    const offset = getOffset(wallClock, timeZone)
    // second pass handles births close to a DST change
    const offsetAtResult = getOffset(wallClock - offset, timeZone)

    return new Date(wallClock - offsetAtResult)
}
