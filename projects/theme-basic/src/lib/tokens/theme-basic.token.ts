import { InjectionToken } from '@angular/core';

export const THEME_BASIC_OPTIONS = new InjectionToken('THEME_BASIC_OPTIONS');

export interface ThemeBasicOptions {
    theme?: 'partyred' | 'blue' | 'light';
}
