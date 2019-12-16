import { ConfigState } from '@abp/ng.core';
import { Store } from '@ngxs/store';
import { Injector } from '@angular/core';
import ViewMatcher from '@ckeditor/ckeditor5-engine/src/view/matcher';
import { FileService } from '../services/file.service';
import { CkeditorType } from './../services/ckeditor5.service';
import { IFileDto } from './file';


interface ICkeditor5DownloadFile {
    type: CkeditorType;
    editor: any;
    assetProviderKey: string;
    assetFolderName: string;
    dataTransfer: any;
    injector: Injector;
}

export class Ckeditor5DownloadFile {

    type: CkeditorType;
    assetProviderKey: string;
    assetFolderName: string;
    dataTransfer: any;

    private editorView: any;
    private fileService: FileService;
    private baseUrl: string;


    constructor(data: ICkeditor5DownloadFile) {
        if (data.type !== 'base') {
            if (!data.assetProviderKey) {
                throw new Error('ckeditor5上传图片需要[assetProviderKey],请先配置');
            }

            if (!data.assetFolderName) {
                throw new Error('ckeditor5上传图片需要[assetFolderName],请先配置');
            }
        }
        this.assetProviderKey = data.assetProviderKey;
        this.assetFolderName = data.assetFolderName;
        this.dataTransfer = data.dataTransfer;
        this.editorView = data.editor.editing.view;
        this.fileService = data.injector.get(FileService);
    }

    getBody(callback: () => void): Promise<any> {
        const htmlDocumentView = this.getFragment();
        const imageElements = this.getImageElements(htmlDocumentView);
        const promises: Promise<void>[] = [];

        for (const item of imageElements) {
            const src = item.getAttribute('src');

            if (src) {
                promises.push(this.loadRemoteFile(src).then(result => {
                    item._setAttribute('src', result.webUrl);
                }));
            }
        }

        return new Promise((resolve) => {
            if (promises.length) {
                callback();
                Promise.all(promises).then(() => {
                    resolve(htmlDocumentView);
                });
            } else {
                resolve(false);
            }
        });
    }

    private loadRemoteFile(src: string): Promise<IFileDto> {
        return new Promise<IFileDto>((resolve) => {
            this.fileService.loadRemoteFile(({
                url: src,
                providerKey: this.assetProviderKey,
                folderName: this.assetFolderName
            })).subscribe(result => {
                resolve(result);
            });
        });
    }

    private getFragment() {
        const htmlString = this.dataTransfer.getData('text/html');
        const htmlDocument = new DOMParser().parseFromString(htmlString, 'text/html');
        const fragment = htmlDocument.createDocumentFragment();
        const nodes = htmlDocument.body.childNodes;

        while (nodes.length > 0) {
            fragment.appendChild(nodes[0]);
        }
        return this.editorView.domConverter.domToView(fragment);
    }


    private getImageElements(fragment: DocumentFragment) {

        const imageElements = [];

        const range = this.editorView.createRangeIn(fragment);

        const imageElementsMatcher = new ViewMatcher({
            name: 'img'
        });

        for (const value of range) {
            if (imageElementsMatcher.match(value.item)) {
                const src = value.item.getAttribute('src');
                if (src) {
                    imageElements.push(value.item);
                }
            }
        }
        return imageElements;
    }
}
