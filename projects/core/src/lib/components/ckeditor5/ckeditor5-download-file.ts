
import DocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment';
import DomConverter from '@ckeditor/ckeditor5-engine/src/view/domconverter';
import { NBSP_FILLER } from '@ckeditor/ckeditor5-engine/src/view/filler';
import ViewMatcher from '@ckeditor/ckeditor5-engine/src/view/matcher';
import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter';
import { FileService } from './file.service';
import { IDownLoadFile, IFileDto } from './file';

interface ICkeditor5DownloadFile extends IDownLoadFile {
    entityId: string;
    attachmentRuleName: string;
    ckeditorData: { content: any, dataTransfer: any };
}

export class Ckeditor5DownloadFile implements ICkeditor5DownloadFile {

    private domConverter = new DomConverter({ blockFiller: NBSP_FILLER });
    entityId: string;
    attachmentRuleName: string;
    ckeditorData: { content: any, dataTransfer: any };
    fileService: FileService;

    constructor(data: ICkeditor5DownloadFile) {
        this.entityId = data.entityId;
        this.attachmentRuleName = data.attachmentRuleName;
        this.ckeditorData = data.ckeditorData;
    }

    getBody(): Promise<any> {
        const upcastWriter = new UpcastWriter();
        const htmlDocumentView = this.getFragment();
        const imageElements = this.getImageElements(htmlDocumentView, upcastWriter);

        const promises: Promise<void>[] = [];

        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < imageElements.length; index++) {
            const item = imageElements[index];
            const src = item.getAttribute('src');
            if (src) {
                promises.push(this.downloadFile(src).then(result => {
                    upcastWriter.setAttribute('src', result.webUrl, item);
                }));
            }
        }

        return new Promise((resolve) => {
            Promise.all(promises).then(() => {
                resolve(htmlDocumentView);
            });
        });
    }

    private downloadFile(src: string): Promise<IFileDto> {
        return new Promise<IFileDto>((resolve) => {
            this.fileService.downLoadFile(({
                attachmentRuleName: this.attachmentRuleName,
                entityId: this.entityId
            })).subscribe(result => {
                resolve(result);
            });
        });
    }

    private getFragment() {
        const htmlString = this.ckeditorData.dataTransfer.getData('text/html');
        const htmlDocument = new DOMParser().parseFromString(htmlString, 'text/html');

        const fragment = htmlDocument.createDocumentFragment();
        const nodes = htmlDocument.body.childNodes;

        while (nodes.length > 0) {
            fragment.appendChild(nodes[0]);
        }
        return this.domConverter.domToView(fragment);
    }


    private getImageElements(documentFragment: DocumentFragment, upcastWriter: UpcastWriter) {
        const range = upcastWriter.createRangeIn(documentFragment);
        const imageElementsMatcher = new ViewMatcher({
            name: 'img'
        });
        const imageElements = [];
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
