import { ABP } from '@abp/ng.core';


// tslint:disable-next-line:no-namespace
export namespace Home {
    export type ITenantApplicationResponse = ABP.PagedItemsResponse<ITenantApplication>;

    export interface ITenantApplication {
        /// <summary>
        /// 名字
        /// </summary>
        applicationName: string;
        /// <summary>
        /// 有效期
        /// </summary>
        expireDate: string;

        /// <summary>
        /// 图标
        /// </summary>
        icon: string;


        url: string;

    }
}
