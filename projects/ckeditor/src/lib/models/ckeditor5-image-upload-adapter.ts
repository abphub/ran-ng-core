import { Rest, RestService, ConfigState } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';

export class Ckeditor5ImageUploadAdapter {

    private requestUrl: string;
    private loader: any;
    private store: Store;
    private rest: RestService;

    constructor(
        loader: any,
        injector: Injector,
        providerKey: string,
        providerName: string,
    ) {
        if (!providerKey) {
            throw new Error('暂无支持上传图片的providerKey,请先配置');
        }
        if (!providerName) {
            providerName = 'ckeditor-content-image';
        }

        this.loader = loader;
        this.store = injector.get(Store);
        this.rest = injector.get(RestService);

        this.requestUrl = `/api/assets/files/upload?providerKey=${providerKey}&folderName=${providerName}`;
    }

    upload() {
        return new Promise((resolve) => {
            this.loader.file.then((file => {

                const data = new FormData();
                data.append('file', file);

                const request: Rest.Request<FormData> = {
                    method: 'POST',
                    url: this.requestUrl,
                    body: data,
                };

                this.rest.request<FormData, { webUrl: string }>(request).subscribe(result => {
                    if (!result.webUrl) {
                        throw new Error('ckeditor5上传文件失败，请检查配置后重新上传');
                    }

                    resolve({
                        default: this.store.selectSnapshot(ConfigState.getApiUrl()) + result.webUrl
                    });
                });
            }));
        });
    }
}
