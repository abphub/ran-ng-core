import { Injectable } from '@angular/core';
import { Rest, RestService } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { ILoadRemoteFile, IFileDto } from '../models/file';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    apiName = 'RanAssets';

    constructor(private rest: RestService) { }

    loadRemoteFile(body: ILoadRemoteFile): Observable<IFileDto> {
        const request: Rest.Request<ILoadRemoteFile> = {
            method: 'POST',
            url: `/api/assets/files/loadRemoteFile?url=${body.url}&providerKey=${body.providerKey}&folderToken=${body.folderToken}`,
        };

        return this.rest.request<ILoadRemoteFile, IFileDto>(request, { apiName: this.apiName });
    }
}
