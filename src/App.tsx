
import { Watermark, Layout } from '@arco-design/web-react';
import Header from './component/Header.tsx'
import UptimeRobot from './component/UptimeRobot.tsx'
import Footer from './component/Footer.tsx'
import { Config } from '../constants.ts';

function App() {

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
            <Footer />
          </Layout.Footer>

        </Layout>
      </Watermark>
    </>
  )
}

export default App
