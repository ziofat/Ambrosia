export function normalizeTime(time: string) {
    const units = {
        1: ['min', 'mins', 'minute', 'minutes', '分钟', '分'],
        60: ['h', 'hr', 'hrs', 'hour', 'hours', '小时', '时'],
        1440: ['d', 'day', 'days', '天', '日'],
    };
    const digit = parseFloat(time);
    const unit = time.replace(/[0-9]/g, '').trim();
    const unitMatch = Object.keys(units).find((key) => units[key].includes(unit)) ?? '1';
    return digit * parseInt(unitMatch, 10);
}
