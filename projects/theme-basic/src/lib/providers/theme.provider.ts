import { APP_INITIALIZER, Injector, Provider } from '@angular/core';
import { ThemeBasicOptions, THEME_BASIC_OPTIONS } from '../tokens/theme-basic.token';

function themeFactory(injector: Injector) {
    const { theme } = injector.get<ThemeBasicOptions>(THEME_BASIC_OPTIONS);
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
