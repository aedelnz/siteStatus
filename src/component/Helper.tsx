export function formatNumber(value: number | string) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return (Math.floor(num * 100) / 100).toString();
}

export function formatDuration(seconds: number | string) {
    let s = parseInt(seconds.toString());
    let m = 0;
    let h = 0;
    if (s >= 60) {
        m = parseInt((Number(s) / 60).toString());
        s = parseInt((Number(s) % 60).toString());
        if (m >= 60) {
            h = parseInt((Number(m) / 60).toString());
            m = parseInt((Number(m) % 60).toString());
        }
    }
    let text = `${s} 秒`;
    if (m > 0) text = `${m} 分 ${text}`;
    if (h > 0) text = `${h} 小时 ${text}`;
    return text;
}
