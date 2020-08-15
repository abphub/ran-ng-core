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
            'bold', 'italic', 'underline', 'strikethrough', 'link', 'numberedList', 'bulletedList'
        ]
    }, {
        displayName: '经典',
        type: 'classic',
        config: [
            'undo', 'redo',
            'heading', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'link',
            'numberedList', 'bulletedList', 'alignment', 'blockQuote', '|',
            'indent', 'outdent', '|',
            'imageUpload', 'mediaEmbed', 'insertTable',
        ]
    }];

    getConfigs() {
        return this.ckeditorTypes;
    }

    getConfig(type: CkeditorType): ICkeditorType {
        if (typeof type === 'number' && !isNaN(type) && type <= this.ckeditorTypes.length - 1) {
            return this.ckeditorTypes[type];
        } else {
            const ckeditortype = this.ckeditorTypes.find(m => m.type === type);
            return ckeditortype ? ckeditortype : this.ckeditorTypes[0];
        }
    }
}
