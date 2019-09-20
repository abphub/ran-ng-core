import { ABP } from '@abp/ng.core';

// tslint:disable-next-line:no-namespace
export namespace RanLayout {
    export interface State {
        mainNavigation?: ABP.FullRoute;
        sidebarState?: boolean;
        drawbarState?: boolean;
    }
}

