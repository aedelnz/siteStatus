import { useEffect, useState } from 'react';
import { Card, Empty, Link, Skeleton, Space, Spin, Tag, Tooltip, Typography } from '@arco-design/web-react';
import { GetMonitors } from './UpRobot';
import { formatDuration } from './Helper';
import { Config } from '../../constants';
import dayjs from 'dayjs';

interface Monitor {
  id: number;
  name: string;
  url: string;
  average: string;
  daily: Array<{
    date: dayjs.Dayjs;
    uptime: string;
    down: { times: number; duration: number };
  }>;
  total: { times: number; duration: number };
  status: 'ok' | 'down' | 'unknow';
}

function UptimeRobot({ apikey, onUpdate }: { apikey: string; onUpdate?: (monitors: Monitor[]) => void }) {
  const statusMap = { ok: '正常', down: '无法访问', unknow: '未知' };
  const { CountDays, ShowLink } = Config;
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetMonitors(apikey, CountDays);
        setMonitors(data);
        onUpdate?.(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '获取监控数据失败';
        console.error('Error fetching monitors:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apikey, CountDays, onUpdate]);

  if (loading) {
    return <Spin loading size={80}><Card><Skeleton text={{ rows: 12 }} /></Card></Spin>;
  }

  if (error) {
    return <Card style={{ padding: '3rem' }}><Empty description={`错误: ${error}`} /></Card>;
  }

  if (monitors.length === 0) {
    return <Card style={{ padding: '3rem' }}><Empty description='无监控数据' /></Card>;
  }

  return monitors.map((monitor) => {
    const timelineItems = (monitor.daily || []).map((data, index) => {
      const uptime = parseFloat(data.uptime);
      let status: 'ok' | 'down' | 'none' = 'none';
      let text = `${data.date.format('YYYY-MM-DD ')}`;

      if (uptime >= 100) {
        status = 'ok';
        text += `可用率 ${data.uptime}%`;
      } else if (uptime <= 0 && data.down.times === 0) {
        status = 'none';
        text += '无数据';
      } else {
        status = 'down';
        text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${data.uptime}%`;
      }

      return (
        <Tooltip key={index} mini content={text}>
          <Tag color={status === 'ok' ? '#00b42a' : '#ff4d4f'}>
            {status === 'none' ? '无数据' : statusMap[status as 'ok' | 'down' | 'unknow'] || '未知'}
          </Tag>
        </Tooltip>
      );
    });

    const summaryText = monitor.total?.times
      ? `最近 ${CountDays} 天故障 ${monitor.total.times} 次，累计 ${formatDuration(monitor.total.duration)}，平均可用率 ${monitor.average}%`
      : `最近 ${CountDays} 天可用率 ${monitor.average}%`;

    const lastUpdateDate = monitor.daily?.length > 0
      ? monitor.daily[monitor.daily.length - 1].date.format('YYYY-MM-DD')
      : '';

    return (
      <Card key={monitor.id} style={{ marginBottom: '12px' }}
        title={ShowLink ? <Link href={monitor.url} title={monitor.name}>{monitor.name}</Link> : monitor.name}
        extra={<span className={`status ${monitor.status}`}>{statusMap[monitor.status] || '未知'}</span>}>
        <Space wrap>{timelineItems}</Space>
        <Space size='large' style={{ width: '100%', justifyContent: 'space-between', marginTop: '16px' }}>
          <Typography.Text>今天</Typography.Text>
          <Typography.Text>{summaryText}</Typography.Text>
          <Typography.Text>{lastUpdateDate}</Typography.Text>
        </Space>
      </Card>
    );
  });
}

export default UptimeRobot;
