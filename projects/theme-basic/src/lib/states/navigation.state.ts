import { State, Selector, StateContext, Action } from '@ngxs/store';
import { SetSidebarNavigationState, SetAppbarNavigationState, SetTopbarNavigationState } from '../actions/navigation.action';
import { RanNavigation } from '../models/navigation';
import { ABP } from '@abp/ng.core';

@State<RanNavigation.State>({
    name: 'RanNavigationState',
    defaults: { appbarNavations: [], topbarNavigations: [], sidebarNavigations: [] } as RanNavigation.State
})
export class RanNavigationState {

    @Selector()
    static getAppbarNavigationState({ appbarNavations }: RanNavigation.State): ABP.FullRoute[] {
        return appbarNavations;
    }

    @Selector()
    static getTopbarNavigationState({ topbarNavigations }: RanNavigation.State): ABP.Route[] {
        return topbarNavigations;
    }

    @Selector()
    static getSidebarNavigationState({ sidebarNavigations }: RanNavigation.State): ABP.Route[] {
        return sidebarNavigations;
    }

    @Action(SetAppbarNavigationState)
    setAppbarNavigationState({ patchState }: StateContext<RanNavigation.State>, { payload }: SetAppbarNavigationState) {
        patchState({ appbarNavations: payload });
    }

    @Action(SetTopbarNavigationState)
    setTopbarNavigationState({ patchState }: StateContext<RanNavigation.State>, { payload }: SetTopbarNavigationState) {
        patchState({ topbarNavigations: payload });
    }

    @Action(SetSidebarNavigationState)
    setSidebarNavigationState({ patchState }: StateContext<RanNavigation.State>, { payload }: SetSidebarNavigationState) {
        patchState({ sidebarNavigations: payload });
    }
}
