import { Store } from '@ngxs/store';
import { Injector } from '@angular/core';
import * as  _moment from 'moment';
import { momentDifferentLocales } from '../constants/different-locales';
const moment = _moment;

function toJSON(this: _moment.Moment): string {
    return this.format('YYYY-MM-DDTHH:mm:ss') + 'Z';
}

export function momentInitializer(injector: Injector) {
    const fn = () => {
        const store: Store = injector.get(Store);

        const lang = store.selectSnapshot(state => state.SessionState.language) || 'en';

        return new Promise((resolve) => {
            // 设置全局语言
            moment.locale(momentDifferentLocales[lang] || 'en');
            // 重写toJSON方法
            moment.prototype.toJSON = toJSON;
            resolve();
        });
    };

    return fn;
}