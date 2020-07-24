export const environment = {
  production: false,
  hmr: false,
  application: {
    name: '圆融翠宫',
    logoUrl: 'http://www.yuanrongcuigong.com/upLoad/slide/month_1903/201903091556312006.svg',
    tenatants: [{
      name: 'feelauto',
      displayName: '扉旅汽车',
      logoUrl: '/tenants/feelauto/images/logo.png'
    }, {
      name: 'lyauto',
      displayName: '临沂汽车网',
      logoUrl: '/tenants/lyauto/images/logo.png'
    }, {
      name: 'qiluauto',
      displayName: '齐鲁汽车网',
      logoUrl: '/tenants/qiluauto/images/logo.png'
    }, {
      name: 'auto',
      displayName: '中车网',
      logoUrl: '/tenants/auto/images/logo.png'
    }, {
      name: 'ccauto',
      displayName: '关东汽车网',
      logoUrl: '/tenants/ccauto/images/logo.png'
    }, {
      name: 'lyjdxx',
      displayName: '临沂市机电工程学校',
      logoUrl: '/tenants/lyjdxx/images/logo.png'
    }, {
      name: 'zhongrong',
      displayName: '中融',
      logoUrl: '/tenants/zhongrong/images/logo.png'
    }]
  },
  oAuthConfig: {
    issuer: 'http://192.168.1.138:44341',
    clientId: 'Edms_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Edms',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'http://192.168.1.138:44341',
    },
  },
  localization: {
    defaultResourceName: 'RanEdms',
  },
};

