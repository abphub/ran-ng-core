import { InjectionToken, Injector, Provider, APP_INITIALIZER } from '@angular/core';

export const THEME_OPTIONS = new InjectionToken('THEME_OPTIONS');

export interface ThemeOptions {
    theme?: 'partyred' | 'blue' | 'light';
}

export function themeFactory(injector: Injector) {
    const { theme } = injector.get<ThemeOptions>(THEME_OPTIONS);
    if (theme) {
        document.querySelector('body').setAttribute('theme', theme);
    }
    return () => { };
}
