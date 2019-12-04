export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'abphub',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44385',
    clientId: 'Commerce_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Commerce',
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
    defaultResourceName: 'Commerce',
  },
};
