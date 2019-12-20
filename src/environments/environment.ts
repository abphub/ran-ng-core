export const environment = {
  production: false,
  hmr: false,
  application: {
    name: '圆融翠宫',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44385',
    clientId: 'Commerce_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Commerce',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
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

