import { Abpone } from '../models/abpone';

/**
 * setAbponeState
 */
export class SetAbponeState {
    static readonly type = '[AbponeState] Set';
    constructor(public payload?: Abpone.ConfigState) { }
}
