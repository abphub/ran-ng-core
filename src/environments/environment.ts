export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'abphub',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44385',
    clientId: 'Edms_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'Edms',
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
    defaultResourceName: 'Edms',
  },
};
