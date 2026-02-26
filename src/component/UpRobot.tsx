import dayjs from 'dayjs';
import { formatNumber } from './Helper';
interface Log {
    type: number;
    datetime: number;
    duration: number;
}

interface UptimeRobotMonitor {
    id: number;
    friendly_name: string;
    url: string;
    custom_uptime_ranges: string;
    logs: Log[];
    status: number;
}
interface PostDataBody {
    api_key: string;
    format: string;
    logs: number;
    log_types: string;
    logs_start_date: number;
    logs_end_date: number;
    custom_uptime_ranges: string;
}


export async function GetMonitors(apikey: string, days: number) {
    // 生成日期范围
    const dates: dayjs.Dayjs[] = [];
    const today = dayjs().startOf('day');
    for (let d = 0; d < days; d++) {
        dates.push(today.subtract(d, 'day'));
    }

    // 生成时间范围字符串
    const ranges = dates.map(date => `${date.unix()}_${date.add(1, 'day').unix()}`);
    const start = dates[dates.length - 1].unix();
    const end = dates[0].add(1, 'day').unix();
    ranges.push(`${start}_${end}`);

    const objectToFormData = (obj: PostDataBody): string => {
        return Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');
    }
    // API 请求数据
    const postdata = {
        api_key: apikey,
        format: 'json',
        logs: 1,
        log_types: '1-2',
        logs_start_date: start,
        logs_end_date: end,
        custom_uptime_ranges: ranges.join('-'),
    };

    const response = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: objectToFormData(postdata),
        signal: AbortSignal.timeout(30000), // 设置 30 秒超时
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.stat !== 'ok') {
        throw data.error;
    }

    // 处理监控数据
    return data.monitors.map((monitor: UptimeRobotMonitor) => {
        const ranges = monitor.custom_uptime_ranges.split('-');
        const lastRange = ranges.pop();
        const average = formatNumber(lastRange || '0');

        // 初始化每日数据
        const daily = dates.map((date, index) => ({
            date,
            uptime: formatNumber(ranges[index]),
            down: { times: 0, duration: 0 },
        }));

        // 创建日期到索引的映射
        const dateToIndexMap = Object.fromEntries(
            dates.map((date, index) => [date.format('YYYYMMDD'), index])
        );

        // 计算故障数据
        const total = monitor.logs.reduce((acc, log) => {
            if (log.type === 1) {
                const dateKey = dayjs.unix(log.datetime).format('YYYYMMDD');
                const index = dateToIndexMap[dateKey];

                if (index !== undefined) {
                    acc.duration += log.duration;
                    acc.times += 1;
                    daily[index].down.duration += log.duration;
                    daily[index].down.times += 1;
                }
            }
            return acc;
        }, { times: 0, duration: 0 });

        // 确定状态
        let status: 'ok' | 'down' | 'unknow' = 'unknow';
        if (monitor.status === 2) status = 'ok';
        if (monitor.status === 9) status = 'down';

        return {
            id: monitor.id,
            name: monitor.friendly_name,
            url: monitor.url,
            average,
            daily,
            total,
            status,
        };
    });
}
