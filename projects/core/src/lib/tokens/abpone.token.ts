import { InjectionToken } from '@angular/core';
import { Abpone } from '../models/abpone';

export const ABPONE_CORE_OPTIONS = new InjectionToken<Abpone.Root>('ABPONE_CORE_OPTIONS');

export function coreOptionsFactory({ ...options }: Abpone.Root) {
    return {
        ...options,
    } as Abpone.Root;
}
