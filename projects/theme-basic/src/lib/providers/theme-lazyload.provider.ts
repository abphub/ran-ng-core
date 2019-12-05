import { LazyLoadService } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { forkJoin } from 'rxjs';
import styles from '../contants/styles';

export function lazyLoadFactory(injector: Injector) {
    const fn = () => {
        const lazyLoadService: LazyLoadService = injector.get(LazyLoadService);
        return forkJoin(lazyLoadService.load(null, 'style', styles, 'head', 'beforeend')).toPromise();
    };
    return fn;
}

