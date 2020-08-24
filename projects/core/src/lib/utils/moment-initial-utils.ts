import { Store } from '@ngxs/store';
import { Injector } from '@angular/core';
import * as  _moment from 'moment';
import { momentDifferentLocales } from '../constants/different-locales';
const moment = _moment;

export function momentInitializer(injector: Injector) {
    const fn = () => {
        const store: Store = injector.get(Store);

        const lang = store.selectSnapshot(state => state.SessionState.language) || 'en';

        return new Promise((resolve) => {
            // 设置全局语言
            moment.locale(momentDifferentLocales[lang] || 'en');
            resolve();
        });
    };

    return fn;
}