import { Injectable } from '@angular/core';

export type CkeditorType = 'base' | 'classic' | 'document';

export interface ICkeditorType {
    displayName: string;
    type: CkeditorType;
    config: string[];
}

@Injectable({
    providedIn: 'root'
})
export class CkeditorService {

    private ckeditorTypes: Array<ICkeditorType> = [{
        displayName: 'base',
        type: 'base',
        config: [
            'heading', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'link', 'numberedList', 'bulletedList', 'insertTable', '|',
            'undo', 'redo',
        ]
    }, {
        displayName: 'classic',
        type: 'classic',
        config: [
            'undo', 'redo',
            'heading', '|',
            'fontSize', 'fontFamily', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'link',
            'numberedList', 'bulletedList', 'alignment', 'blockQuote', 'highlight', '|',
            'imageUpload', 'mediaEmbed', 'insertTable',
        ]
    }, {
        displayName: 'document',
        type: 'document',
        config: [
            'undo', 'redo',
            'heading', '|',
            'fontSize', 'fontFamily', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'link',
            'numberedList', 'bulletedList', 'alignment', 'blockQuote', 'highlight', '|',
            'imageUpload', 'mediaEmbed', 'insertTable',
        ]
    }];

    getConfig(type: CkeditorType): ICkeditorType {
        const ckeditortype = this.ckeditorTypes.find(m => m.type === type);
        return ckeditortype ? ckeditortype : this.ckeditorTypes[0];
    }
}
