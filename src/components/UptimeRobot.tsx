import { useEffect, useState } from 'react'
import { Card, Empty, Spin, Tooltip, Typography } from '@douyinfe/semi-ui'
import { IllustrationFailure, IllustrationNoContent, IllustrationFailureDark, IllustrationNoContentDark } from '@douyinfe/semi-illustrations'
import dayjs from 'dayjs'
import { formatDuration } from './Helper'
import { GetMonitors } from './UpRobot'
import { Config } from '../../Data'

interface Monitor { id: number; name: string; url: string; average: string; daily: Array<{ date: dayjs.Dayjs; uptime: string; down: { times: number; duration: number }; }>; total: { times: number; duration: number }; status: 'ok' | 'down' | 'unknow'; }

function UptimeRobot({ apikey, onUpdate }: { apikey: string; onUpdate?: (monitors: Monitor[]) => void }) {

    const statusMap = { ok: '正常', down: '无法访问', unknow: '未知' }
    const { CountDays, ShowLink } = Config
    const [monitors, setMonitors] = useState<Monitor[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await GetMonitors(apikey, CountDays)
                setMonitors(data)
                onUpdate?.(data)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : '获取监控数据失败'
                console.error('Error fetching monitors:', err)
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        };
        fetchData()
    }, [apikey, CountDays, onUpdate])

    if (loading) {
        return <Card><Spin style={{ height: '100px', }} size="large" tip="加载中..."><div></div></Spin></Card>
    }

    if (error) {
        return <Card><Empty image={<IllustrationFailure style={{ width: 150, height: 150 }} />} darkModeImage={<IllustrationFailureDark style={{ width: 150, height: 150 }} />} title={`错误: ${error}`} /></Card>
    }

    if (monitors.length === 0) {
        return <Card><Empty image={<IllustrationNoContent style={{ width: 150, height: 150 }} />} darkModeImage={<IllustrationNoContentDark style={{ width: 150, height: 150 }} />} title='无监控数据' /></Card>
    }

    return monitors.map((monitor) => {
        const timelineItems = (monitor.daily || []).map((data) => {
            const uptime = parseFloat(data.uptime)
            let text = `${data.date.format('YYYY-MM-DD ')}`

            if (uptime >= 100) {
                text += `可用率 ${data.uptime}%`
            } else if (uptime <= 0 && data.down.times === 0) {
                text += '无数据'
            } else {
                text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${data.uptime}%`
            }

            return (
                <Tooltip content={text}>
                    <span className='tags' style={{ backgroundColor: `${monitor.status === 'ok' ? 'var(--semi-color-success)' : 'var(--semi-color-danger)'}` }}></span>
                </Tooltip>
            )
        })

        const summaryText = monitor.total?.times ? `最近 ${CountDays} 天故障 ${monitor.total.times} 次，累计 ${formatDuration(monitor.total.duration)}，平均可用率 ${monitor.average}%` : `最近 ${CountDays} 天可用率 ${monitor.average}%`

        const lastUpdateDate = monitor.daily?.length > 0 ? monitor.daily[monitor.daily.length - 1].date.format('YYYY-MM-DD') : ''

        return (
            <Card shadows='hover' key={monitor.id} style={{ marginBottom: '12px', boxSizing: 'content-box' }}
                title={ShowLink ? <Typography.Title heading={5} link={{ href: monitor.url }} underline>{monitor.name}</Typography.Title> : monitor.name}
                headerExtraContent={<span style={{ color: `${monitor.status === 'ok' ? 'var(--semi-color-success)' : 'var(--semi-color-danger)'}` }}>{statusMap[monitor.status] || '未知'}</span>}
                footerLine={true}
                footerStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                footer={<>
                    <Typography.Text>今天</Typography.Text>
                    <Typography.Text>{summaryText}</Typography.Text>
                    <Typography.Text>{lastUpdateDate}</Typography.Text>
                </>}>
                <div className='tags-container'>{timelineItems}</div>
            </Card>
        )
    })
}

export default UptimeRobot
