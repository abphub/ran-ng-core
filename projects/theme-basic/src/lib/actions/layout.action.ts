import { ABP } from '@abp/ng.core';
/**
 * setSidebarState
 */
export class SetMainNavgitionState {
    static readonly type = '[MainNavgition] Set';
    constructor(public payload: ABP.FullRoute) { }
}

export class SetSidebarState {
    static readonly type = '[Sidebar] Set';
    constructor() { }
}

export class SetDrawbarState {
    static readonly type = '[Drawbar] Set';
    constructor() { }
}

