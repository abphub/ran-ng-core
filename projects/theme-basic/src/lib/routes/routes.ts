import { ABP, eLayoutType } from '@abp/ng.core';

export const THEME_BASIC_ROUTES = [
  {
    name: '模板模块',
    path: 'theme',
    order: 3,
    layout: eLayoutType.application,
    children: [{
      name: '模板模块顶部菜单',
      parentName: '',
      children: [
        { path: 'sections', name: 'Site::Menu:Sections', order: 1, },
        { path: 'fields', name: 'Site::Menu:Fields', order: 2, },
        { path: 'entities', name: 'Site::Menu:Entities', order: 3 },
        { path: 'categories', name: 'Site::Menu:Categories', order: 5 },
      ]
    }]

  }
] as ABP.FullRoute[];
