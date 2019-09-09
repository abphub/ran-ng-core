import { HttpClient } from '@angular/common/http';

export class Ckeditor5ImageUploadAdapter {

    private requestUrl: string;
    private loader: any;
    private http: HttpClient;

    constructor(
        loader: any,
        entityId: string,
        attachmentRuleName: string,
        http: HttpClient
    ) {
        if (!entityId) {
            throw new Error('暂无支持上传图片的EntityId,请先配置');
        }
        if (!attachmentRuleName) {
            throw new Error('暂无支持上传图片的attachmentRuleName,请先配置');
        }
        this.loader = loader;
        this.http = http;
        this.requestUrl = `/attachment/UploadFile?attachmentRuleName=ckeditor-content-image&entityId=${entityId}`;
    }

    upload() {
        return new Promise((resolve, reject) => {
            this.loader.file.then((file => {
                const data = new FormData();
                data.append('file', file);
                this.http.post(this.requestUrl, data).subscribe((response: { result: any }) => {
                    const result = response.result;
                    if (result.code !== 200 && result.code !== 204 && result.code !== 0) {
                        reject(result.message);
                        throw new Error(result.message);
                    }
                    resolve({
                        default: `${result.file.webUrl}`
                    });
                });
            }));
        });
    }
}
