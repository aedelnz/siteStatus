import { useState } from 'react';
import { Layout, SideSheet, Typography, Nav, Button, Avatar } from '@douyinfe/semi-ui'
import { IconMenu } from '@douyinfe/semi-icons'
import SemiThemer from './components/SemiThemer'
import NavSub from './components/NavSub'
import UptimeRobot from './components/UptimeRobot'
import { Config } from '../Data'

const { Header, Footer, Sider, Content } = Layout
const { Text } = Typography

const App = () => {

  const [visible, setVisible] = useState(false)
  const change = () => setVisible(!visible)

  return (
    <Layout>
      <Header>
        <div>
          <Nav
            mode={'horizontal'}
            header={{ logo: <Avatar src="/favicon.png" size="default" shape="square" alt="图标" />, text: '网站状态' }}
            footer={<><SemiThemer /><Button id="button-sidesheet" type="tertiary" icon={<IconMenu />} onClick={change} /></>}
          />
        </div>
      </Header>
      <Layout>
        <Sider>
          <NavSub />
          <SideSheet title="网站状态" visible={visible} onCancel={change} placement="left" style={{ width: 'auto' }}>
            <NavSub />
          </SideSheet>
        </Sider>
        <Content>
          <div className='contents' style={{ boxSizing: 'content-box' }}>
            {Config.ApiKeys.map((apiKey, index) => (
              <UptimeRobot key={index} apikey={apiKey} />
            ))}
          </div>
          <Footer>
            <div>
              <span>Copyright © 2020-{new Date().getFullYear()} <Text link={{ href: 'https://jixiejidiguan.top/' }} underline>画的<span className="Highlight">个人记录</span></Text>. All Rights Reserved. </span>
            </div>
            <div>
              <span>基于<Typography.Text style={{ margin: '0 4px' }} link={{ href: 'https://dashboard.uptimerobot.com/' }} underline>UptimeRobot API</Typography.Text>提供的监控数据</span>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
