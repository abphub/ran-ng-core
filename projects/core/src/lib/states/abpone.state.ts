import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetAbponeState } from '../actions/abpone.action';
import { Abpone } from '../models/abpone';

@State<Abpone.ConfigState>({
    name: 'AbponeState',
    defaults: {} as Abpone.ConfigState
})
@Injectable()
export class AbponeState {

    @Selector()
    static getAbponeState(state: Abpone.ConfigState): Abpone.ConfigState {
        return state;
    }

    @Action(SetAbponeState)
    setAbponeState({ patchState }: StateContext<Abpone.ConfigState>, { payload }: SetAbponeState) {
        patchState(payload);
    }
}
