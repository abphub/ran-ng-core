import { ABP } from '@abp/ng.core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetDrawbarState, SetMainNavgitionState, SetSidebarState } from '../actions/layout.action';
import { RanLayout } from '../models/layout';

@State<RanLayout.State>({
    name: 'RanLayoutState',
    defaults: { sidebarState: true, drawbarState: false, mainNavigation: {} } as RanLayout.State
})
export class RanLayoutState {

    @Selector()
    static getMainNavigationState({ mainNavigation }: RanLayout.State): ABP.FullRoute {
        return mainNavigation;
    }

    @Selector()
    static getSidebarState({ sidebarState }: RanLayout.State): boolean {
        return sidebarState;
    }

    @Selector()
    static getDrawbarState({ drawbarState }: RanLayout.State): boolean {
        return drawbarState;
    }

    @Action(SetMainNavgitionState)
    setMainNavigationState({ getState, patchState }: StateContext<RanLayout.State>, { payload }: SetMainNavgitionState) {
        console.log(payload);
        patchState({ mainNavigation: payload });
    }

    @Action(SetSidebarState)
    setSidebarState({ getState, patchState }: StateContext<RanLayout.State>) {
        const { sidebarState } = getState();
        patchState({ sidebarState: !sidebarState });
    }

    @Action(SetDrawbarState)
    setDrawbarState({ getState, patchState }: StateContext<RanLayout.State>) {
        const { drawbarState } = getState();
        patchState({ drawbarState: !drawbarState });
    }
}
