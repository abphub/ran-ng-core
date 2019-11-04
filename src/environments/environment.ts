export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'abphub',
    logoUrl: 'http://ran.xyz/tenant-resources/Default/images/logo.png',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44369',
    clientId: 'Site_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Site',
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
