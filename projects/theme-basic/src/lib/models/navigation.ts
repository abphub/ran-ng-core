import { ABP } from '@abp/ng.core';

export namespace RanNavigation {
    export interface State {
        appbarNavations?: ABP.FullRoute[];
        topbarNavigations?: ABP.Route[];
        sidebarNavigations?: ABP.Route[];
    }
}
