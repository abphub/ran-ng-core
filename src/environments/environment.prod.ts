export const environment = {
  production: true,
  hmr: false,
  application: {
    name: 'Blogging',
    logoUrl: '',
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
