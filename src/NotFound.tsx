import '@douyinfe/semi-ui/react19-adapter'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Empty, Button } from '@douyinfe/semi-ui'
import { IllustrationNotFound, IllustrationNotFoundDark } from '@douyinfe/semi-illustrations'
import SemiTheme from './components/SemiThemer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ position: 'absolute', top: 0, right: 0, margin: 16 }}>
      <SemiTheme />
    </div>
    <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Empty
        image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationNotFoundDark style={{ width: 150, height: 150 }} />}
        title="404 Not Found"
        description="页面不存在">
        <div>
          <Button style={{ padding: '6px 24px', marginRight: 12 }} type="primary" onClick={() => window.location.href = '/'}>返回主页</Button>
          <Button style={{ padding: '6px 24px' }} theme="solid" type="primary" onClick={() => window.location.href = 'https://jixiejidiguan.top/A2zml/'}>爱莫能助</Button>
        </div>
      </Empty>
    </div>
  </StrictMode>,
)
