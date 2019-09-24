import { ABP } from '@abp/ng.core';
/**
 * setSidebarState
 */
export class SetMainNavigationState {
    static readonly type = '[MainNavgition] Set';
    constructor(public payload: ABP.FullRoute[]) { }
}

export class SetSidebarState {
    static readonly type = '[Sidebar] Set';
    constructor() { }
}

export class SetDrawbarState {
    static readonly type = '[Drawbar] Set';
    constructor() { }
}

export class SetSidebarContentScoll {
    static readonly type = '[SidebarContentScoll] Set';
    constructor(public payload: Event) { }
}

