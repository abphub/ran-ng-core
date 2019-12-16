import { ConfigState, Rest, RestService } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CkeditorType } from './../services/ckeditor5.service';

interface ICkeditor5ImageUploadParams {
    injector: Injector;
    type: CkeditorType;
    loader: any;
    assetProviderKey: string;
    assetFolderName: string;
}

export class Ckeditor5ImageUploadAdapter {

    private requestUrl: string;
    private loader: any;
    private store: Store;
    private rest: RestService;

    constructor(
        data: ICkeditor5ImageUploadParams
    ) {
        if (data.type !== 'base') {
            if (!data.assetProviderKey) {
                throw new Error('ckeditor5上传图片需要[assetProviderKey],请先配置');
            }

            if (!data.assetFolderName) {
                throw new Error('ckeditor5上传图片需要[assetFolderName],请先配置');
            }
        }
        this.loader = data.loader;
        this.store = data.injector.get(Store);
        this.rest = data.injector.get(RestService);
        this.requestUrl = `/api/assets/files/upload?providerKey=${data.assetProviderKey}&folderName=${data.assetFolderName}`;
    }

    upload() {
        return new Promise((resolve) => {
            this.loader.file.then((file => {

                const body = new FormData();
                body.append('file', file);

                const request: Rest.Request<FormData> = {
                    method: 'POST',
                    url: this.requestUrl,
                    body,
                };

                this.rest.request<FormData, { webUrl: string }>(request).subscribe(result => {
                    if (!result.webUrl) {
                        throw new Error('ckeditor5上传文件失败，请检查配置后重新上传');
                    }

                    resolve({
                        default: result.webUrl
                    });
                });
            }));
        });
    }
}
