// export const environment = {
//   production: false,
//   hmr: false,
//   application: {
//     name: '网站内容管理系统',
//     logoUrl: '',
//   },
//   oAuthConfig: {
//     issuer: 'http://{TENANCY_NAME}.account.abpone.com',
//     clientId: 'Abpone_ConsoleTestApp',
//     dummyClientSecret: '1q2w3e*',
//     scope: 'Abpone',
//     showDebugInformation: true,
//     oidc: false,
//     requireHttps: false,
//   },
//   apis: {
//     default: {
//       url: 'http://{TENANCY_NAME}.account.abpone.com',
//     },
//     AbpIdentity: {
//       url: 'http://{TENANCY_NAME}.account.abpone.com',
//     },
//     AbpPermissionManagement: {
//       url: 'http://{TENANCY_NAME}.account.abpone.com',
//     },
//     AbpTenantManagement: {
//       url: 'http://{TENANCY_NAME}.account.abpone.com',
//     },
//     RanSite: {
//       url: 'http://{TENANCY_NAME}.siteapi.abpone.com',
//     },
//     RanField: {
//       url: 'http://{TENANCY_NAME}.siteapi.abpone.com',
//     },
//     RanAssets: {
//       url: 'http://{TENANCY_NAME}.assets.abpone.com',
//     }
//   },
// };
export const environment = {
  production: false,
  hmr: false,
  application: {
    name: '博客系统',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44377',
    clientId: 'Blogging_ConsoleTestApp',
    dummyClientSecret: '1q2w3e*',
    scope: 'Blogging',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
  },
  apis: {
    default: {
      rootNamespace: 'Ran.Blogging',
      url: 'https://localhost:44377',
    },
    RanBlogging: {
      url: 'https://localhost:44360',
    },
    RanAssets: {
      url: 'https://localhost:44360',
    },
  },
};
