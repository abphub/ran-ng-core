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
    fileService: FileService;
}

export class Ckeditor5DownloadFile {

    type: CkeditorType;
    assetProviderKey: string;
    assetFolderName: string;
    fileService: FileService;
    dataTransfer: any;

    private editorModel: any;
    private editorView: any;

    constructor(data: ICkeditor5DownloadFile) {
        if (data.type !== 'base') {
            if (!data.assetProviderKey) {
                throw new Error('ckeditor5上传图片需要[assetProviderKey],请先配置');
            }

            if (!data.assetFolderName) {
                throw new Error('ckeditor5上传图片需要[assetFolderName],请先配置');
            }
        }

        console.log(1);

        this.assetProviderKey = data.assetProviderKey;
        this.assetFolderName = data.assetFolderName;
        this.dataTransfer = data.dataTransfer;
        this.fileService = data.fileService;
        this.editorModel = data.editor.model;
        this.editorView = data.editor.editing.view;
    }

    getBody(): Promise<any> {
        const htmlDocumentView = this.getFragment();

        console.log(htmlDocumentView);

        const imageElements = this.getImageElements(htmlDocumentView);

        const promises: Promise<void>[] = [];

        for (const item of imageElements) {
            const src = item.getAttribute('src');
            if (src) {
                promises.push(this.loadRemoteFile(src).then(result => {
                    this.editorModel.setAttribute('src', result.webUrl, item);
                }));
            }
        }

        return new Promise((resolve) => {
            Promise.all(promises).then(() => {
                resolve(htmlDocumentView);
            });
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
