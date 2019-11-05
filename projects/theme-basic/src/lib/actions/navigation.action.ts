import { ABP } from '@abp/ng.core';


export class SetAppbarNavigationState {
    static readonly type = '[AppbarNavigation] Set';
    constructor(public payload: ABP.FullRoute[]) { }
}

export class SetTopbarNavigationState {
    static readonly type = '[TopbarNavigation] Set';
    constructor(public payload: ABP.Route[]) { }
}

export class SetSidebarNavigationState {
    static readonly type = '[SidebarNavigation] Set';
    constructor(public payload: ABP.Route[]) { }
}
