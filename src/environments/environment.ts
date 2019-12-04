export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'ABP.hub',
    logoUrl: 'https://www.baidu.com/img/bd_logo1.png?where=super',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44385',
    clientId: 'Edms_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Edms',
    showDebugInformation: true,
    oidc: false,
    requireHttps: false,
  },
  apis: {
    default: {
      url: 'https://localhost:44385',
    },
  },
  localization: {
    defaultResourceName: 'Edms',
  },
};
