import { InjectionToken, Injector, Provider, APP_INITIALIZER } from '@angular/core';

export const THEME_OPTIONS = new InjectionToken('THEME_OPTIONS');

export interface ThemeOptions {
    theme?: 'partyred' | 'blue' | 'light';
}

function themeFactory(injector: Injector) {
    const { theme } = injector.get<ThemeOptions>(THEME_OPTIONS);
    if (theme) {
        document.querySelector('body').setAttribute('theme', theme);
    }
    return () => { };
}

export const ThemeProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [Injector],
    useFactory: themeFactory
};
