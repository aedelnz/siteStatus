import { Divider, Typography, Link, BackTop, Button } from '@arco-design/web-react';
import { IconDoubleUp } from '@arco-design/web-react/icon';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <Divider style={{ margin: '0' }} />
            <div style={{ padding: '1.45rem', textAlign: 'center' }}>
                <Typography.Paragraph bold>Copyright © 2020 - {currentYear}  <Link hoverable={false} href='https://jixiejidiguan.top'>画的个人记录</Link>. All Rights Reserved.</Typography.Paragraph>
                <Typography.Text>基于 <Link hoverable={false} href='https://dashboard.uptimerobot.com/'>UptimeRobot API</Link> 提供的监控数据</Typography.Text>
            </div>
            <BackTop visibleHeight={600}>
                <Button size='large' type='outline' icon={<IconDoubleUp />} />
            </BackTop>
        </>
    );
};


export default Footer;