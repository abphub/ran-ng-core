export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'Blogging',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44369',
    clientId: 'Blogging_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Blogging',
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
    defaultResourceName: 'Blogging',
  },
};
