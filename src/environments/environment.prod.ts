export const environment = {
  production: true,
  hmr: false,
  application: {
    name: 'Assets',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44331',
    clientId: 'Assets_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Assets',
    showDebugInformation: true,
    oidc: false,
    requireHttps: false,
  },
  apis: {
    default: {
      url: 'https://localhost:44331',
    },
  },
  localization: {
    defaultResourceName: 'Assets',
  },
};
