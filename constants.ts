interface Config {
  SiteName: string;
  SubTitle: string;
  ApiKeys: string[];
  CountDays: number;
  ShowLink: boolean;
  Navi: {
    name: string;
    url: string;
  }[];
}

export const Config: Config = {
  // 显示标题
  SiteName: 'AE 站点状态',
  // 显示副标题
  SubTitle: '一个监听网站站点状态的展示列表',
  // UptimeRobot Api Keys
  // 支持 Monitor-Specific 和 Read-Only
  ApiKeys: [
    'ur1466828-96640b6a19c5204706e00c05',
  ],
  // 日志天数
  CountDays: 31,
  // 是否显示检测站点的链接
  ShowLink: true,
  // 导航链接
  Navi: [
    {
      name: '主站',
      url: 'https://jixiejidiguan.top',
    },
    {
      name: '导航站',
      url: 'https://jixiejidiguan.top/A2zml/',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/aedelnz/siteStatus',
    }
  ],

};
