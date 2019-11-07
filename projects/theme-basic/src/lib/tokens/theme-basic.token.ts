import { InjectionToken, Injector } from '@angular/core';

export const THEME_BASIC_OPTIONS = new InjectionToken('THEME_BASIC_OPTIONS');

export interface ThemeBasicOptions {
    theme?: 'partyred' | 'blue' | 'light';
}

export function themeBasicFactory(injector: Injector) {
    const { theme } = injector.get<ThemeBasicOptions>(THEME_BASIC_OPTIONS);
    if (theme) {
        document.querySelector('body').setAttribute('theme', theme);
    }
    return () => { };
}
