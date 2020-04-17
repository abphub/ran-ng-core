import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetDrawbarState, SetSidebarContentScoll, SetSidebarState } from '../actions/layout.action';
import { RanLayout } from '../models/layout';

@State<RanLayout.State>({
    name: 'RanLayoutState',
    defaults: { sidebarState: true, drawbarState: false, $scrollEvent: null } as RanLayout.State
})
export class RanLayoutState {

    @Selector()
    static getSidebarState({ sidebarState }: RanLayout.State): boolean {
        return sidebarState;
    }

    @Selector()
    static getDrawbarState({ drawbarState }: RanLayout.State): boolean {
        return drawbarState;
    }

    @Selector()
    static getSidebarContentScoll({ $scrollEvent }: RanLayout.State): Event {
        return $scrollEvent;
    }

    @Action(SetSidebarState)
    setSidebarState({ getState, patchState }: StateContext<RanLayout.State>, { payload }: SetSidebarState) {
        const { sidebarState } = getState();
        let _sidebarState = !sidebarState;
        if (payload !== undefined) {
            _sidebarState = payload;
        }
        patchState({ sidebarState: _sidebarState });
    }

    @Action(SetDrawbarState)
    setDrawbarState({ getState, patchState }: StateContext<RanLayout.State>) {
        const { drawbarState } = getState();
        patchState({ drawbarState: !drawbarState });
    }

    @Action(SetSidebarContentScoll)
    setSidebarContentScoll({ getState, patchState }: StateContext<RanLayout.State>, { payload }: SetSidebarContentScoll) {
        patchState({ $scrollEvent: payload });
    }
}
