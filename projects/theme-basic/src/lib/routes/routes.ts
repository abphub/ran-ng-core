import { ABP, eLayoutType } from '@abp/ng.core';
/**
 *
 * @deprecated since version 1..
 */
export const THEME_BASIC_ROUTES = {
  routes: [{
    name: '::Menu:Theme',
    path: 'theme',
    order: 3,
    layout: eLayoutType.application,
    children: [{
      name: '::Menu:Theme:Light',
      parentName: '::Menu:Theme',
      path: 'light',
      children: [
        {
          path: 'theme-one',
          name: '::Menu:Theme:Light:One',
          order: 1,
          children: [
            {
              path: 'theme-one-two',
              name: '::Menu:Theme:Light:One:Tow',
            }
          ]
        },
        { path: 'theme-two', name: '::Menu:Theme:Light:Two', order: 2, },
        { path: 'theme-three', name: '::Menu:Theme:Light:Three', order: 3 },
      ]
    }, {
      name: '::Menu:Theme:Dark',
      parentName: '::Menu:Theme',
      path: 'dark',
      children: [
        { path: 'theme-one', name: '::Menu:Theme:Dark:One', order: 1, },
        { path: 'theme-two', name: '::Menu:Theme:Dark:Two', order: 2, },
        { path: 'theme-three', name: '::Menu:Theme:Dark:Three', order: 3 },
      ]
    }]
  }] as ABP.FullRoute[]
};
