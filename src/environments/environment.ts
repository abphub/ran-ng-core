export const environment = {
  production: false,
  hmr: false,
  application: {
    name: '燃点网络核心平台',
    logoUrl: 'http://ran.xyz/tenant-resources/Default/images/logo.png',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44369',
    clientId: 'Blogging_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Blogging',
    showDebugInformation: true,
    oidc: false,
    requireHttps: false,
  },
  apis: {
    default: {
      url: 'https://localhost:44369',
    },
  },
  localization: {
    defaultResourceName: 'Blogging',
  },
};
