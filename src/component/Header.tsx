import { useEffect, useState } from 'react';
import { Affix, Divider, PageHeader, Button, Space, Menu, Dropdown } from '@arco-design/web-react';
import { IconList } from '@arco-design/web-react/icon';
import { Config } from '../../constants';


const Header = () => {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    document.title = Config.SiteName;
    document.querySelector('meta[name="description"]')?.setAttribute('content', Config.SubTitle);
  }, []);

  useEffect(() => {
    // 断点判断：lg 屏幕尺寸通常为 1024px 及以上
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      const isLarge = width >= 992;
      setIsLg(isLarge);
    };
    // 初始检查
    checkBreakpoint();
    // 监听窗口大小变化
    window.addEventListener('resize', checkBreakpoint);

    // 清理函数
    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, []);

  return (
    <>
      <Affix>
        <div style={{ background: 'var(--color-bg-2)' }}>
          <PageHeader
            title={Config.SiteName}
            subTitle={isLg ? Config.SubTitle : ''}
            extra={isLg ? (<Space>{Config.Navi.map((item) => (<Button type='text' key={item.url} href={item.url}>{item.name}</Button>))}</Space>) : (<Dropdown position='br' droplist={<Menu>{Config.Navi.map((item) => (<Menu.Item key={item.url} onClick={() => window.open(item.url)}>{item.name}</Menu.Item>))}</Menu>}><Button icon={<IconList />} /></Dropdown>)}
          />
          <Divider style={{ margin: '0' }} />
        </div>
      </Affix>
    </>
  );
};

export default Header;
