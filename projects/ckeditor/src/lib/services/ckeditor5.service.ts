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
        displayName: '基本',
        type: 'base',
        config: [
            'undo', 'redo', '|', 'heading',
            'bold', 'italic', 'underline', 'strikethrough', 'link', 'numberedList', 'bulletedList', ,
        ]
    }, {
        displayName: '经典',
        type: 'classic',
        config: [
            'undo', 'redo',
            'heading', '|',
            'fontSize', 'fontFamily', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'link',
            'numberedList', 'bulletedList', 'alignment', 'blockQuote', 'highlight', '|',
            'imageUpload', 'mediaEmbed', 'insertTable',
        ]
    }];

    getConfigs() {
        return this.ckeditorTypes;
    }

    getConfig(type: CkeditorType): ICkeditorType {
        const ckeditortype = this.ckeditorTypes.find(m => m.type === type);
        return ckeditortype ? ckeditortype : this.ckeditorTypes[0];
    }
}
