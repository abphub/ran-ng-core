import { Injectable } from '@angular/core';
import { Rest, RestService } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { IDownLoadFile, IFileDto } from './file';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private rest: RestService) { }

    downLoadFile(downLoadFile: IDownLoadFile): Observable<IFileDto> {
        const request: Rest.Request<IDownLoadFile> = {
            method: 'GET',
            url: `/api/app/file/downloadFile`,
            body: downLoadFile
        };

        return this.rest.request<IDownLoadFile, IFileDto>(request);
    }
}
