
import { Watermark, Layout, Divider, Typography, Link, BackTop, Button } from '@arco-design/web-react';
import { IconDoubleUp } from '@arco-design/web-react/icon';
import Header from './component/Header.tsx'
import UptimeRobot from './component/UptimeRobot.tsx'
import { Config } from '../constants.ts';

function App() {

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Watermark content={Config.SiteName}>
        <Layout style={{ background: 'var(--color-bg-2)' }}>

          <Layout.Header>
            <Header />
          </Layout.Header>

          <Layout.Content >
            <Layout.Sider breakpoint='lg'>
            </Layout.Sider>
            <div style={{ padding: '2em 0', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              {Config.ApiKeys.map((apiKey, index) => (
                <UptimeRobot key={index} apikey={apiKey} />
              ))}
            </div>
          </Layout.Content>

          <Layout.Footer>
            <Divider style={{ margin: '0' }} />
            <div style={{ padding: '1.45rem', textAlign: 'center' }}>
              <Typography.Paragraph bold>Copyright © 2020 - {currentYear}  <Link hoverable={false} href='https://jixiejidiguan.top'>画的个人记录</Link>. All Rights Reserved.</Typography.Paragraph>
            </div>
            <BackTop visibleHeight={600}>
              <Button size='large' type='outline' icon={<IconDoubleUp />} />
            </BackTop>
          </Layout.Footer>

        </Layout>
      </Watermark>
    </>
  )
}

export default App
