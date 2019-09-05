import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetSidebarState, SetDrawbarState } from '../actions/layout.action';
import { RanLayout } from '../models/layout';

@State<RanLayout.State>({
    name: 'RanLayoutState',
    defaults: { sidebarState: true, drawbarState: false } as RanLayout.State
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
