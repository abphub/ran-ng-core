export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'Assets',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44369',
    clientId: 'Assets_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Assets',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44369',
    },
  },
  localization: {
    defaultResourceName: 'Assets',
  },
};
