import { ABP, eLayoutType } from '@abp/ng.core';
/**
 * test navigations.service
 * @deprecated since version 1..
 */
export const THEME_BASIC_ROUTES = {
  name: '::Menu:Theme',
  path: 'theme',
  order: 3,
  layout: eLayoutType.application,
  requiredPolicy: 'Assets.Folders',
  children: [{
    name: 'Site::Menu:Sections',
    parentName: '::Menu:Theme',
    path: 'light',
    children: [
      { path: 'theme-one', name: '::Menu:Theme:Light:One', order: 1 },
      { path: 'theme-two', name: '::Menu:Theme:Light:Two', order: 2, requiredPolicy: 'fasdfad', },
      { path: 'theme-three', name: '::Menu:Theme:Light:Three', order: 3, requiredPolicy: 'fasdfad', }
    ]
  }, {
    name: 'Site::Menu:Fields',
    parentName: '::Menu:Theme',
    path: 'dark',
    children: [
      { path: 'theme-one', name: '::Menu:Theme:Dark:One', order: 1, requiredPolicy: 'fasdfad', },
      { path: 'theme-two', name: '::Menu:Theme:Dark:Two', order: 2, requiredPolicy: 'fasdfad', },
      { path: 'theme-three', name: '::Menu:Theme:Dark:Three', order: 3, requiredPolicy: 'fasdfad' },
    ]
  }]
};
