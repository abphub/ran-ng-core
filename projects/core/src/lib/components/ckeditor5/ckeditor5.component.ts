import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CkeditorService, CkeditorType } from './ckeditor5.service';
import { Ckeditor5ImageUploadAdapter } from './ckeditor5-image-upload-adapter';
import { Ckeditor5DownloadFile } from './ckeditor5-download-file';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';


const Editor = DecoupledEditor;

@Component({
    selector: 'ran-ckeditor5',
    template: `<div role="ckeditor" #ckeditor></div>`,
    styleUrls: ['./ckeditor5.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RanCkeditor5Component),
        multi: true
    }],
})
export class RanCkeditor5Component implements AfterViewInit, ControlValueAccessor {

    @ViewChild('ckeditor', { static: false })
    ckeditorElement: ElementRef;

    /**
     * ckeditor工具栏，可参考ckeditor文档自定义功能
     */
    @Input()
    toolbarConfig: string[];

    /**
     * 组件提供类型，不定义toolbarConfig的情况下使用
     * 优先级小于toolbarConfig
     */
    @Input()
    type: CkeditorType;

    /**
     * 非基础类型
     * 必须配置entityId和attachmentRuleName用于上传图片
     */
    @Input()
    entityId: string;
    @Input()
    attachmentRuleName: string;

    private ckeditor;
    onchange: (newData: any) => void;
    touched: () => void;

    data: string;

    constructor(
        private ckeditorService: CkeditorService,
        private http: HttpClient
    ) {
    }

    writeValue(value: string) {
        if (this.ckeditor) {
            this.ckeditor.setData(value || '<p></p>');
        } else {
            this.data = value || '<p></p>';
        }
    }

    registerOnChange(fn: (newData: any) => void): void {
        this.onchange = fn;
    }

    registerOnTouched(fn: any) {
        this.touched = fn;
    }

    ngAfterViewInit() {
        let toobarConfig = [];
        if (this.toolbarConfig && this.toolbarConfig.length) {
            toobarConfig = this.toolbarConfig;
        } else {
            const ckeditorType = this.ckeditorService.getConfig(this.type);
            toobarConfig = ckeditorType.config;
        }

        Editor.create(this.ckeditorElement.nativeElement, {
            language: 'zh-cn',
            toolbar: toobarConfig,
            mediaEmbed: {
                extraProviders: [
                    {
                        /**
                         * 为腾讯视频定义的插入视频规则
                         */
                        name: 'txp',
                        url: /^https:\/\/v\.qq\.com\/x\/cover\/(\w+)\/(\w+)\.html/,
                        html: match => {
                            return `<div class="ck_media__wrapper_txq">
                                    <iframe src="https:/v.qq.com/txp/iframe/player.html?vid=${match[2]}" frameborder="0" >
                                    </iframe>
                                </div>`;
                        }
                    },
                    {
                        /**
                         * 自定义组件上传规则，需要修改
                         * Default/articles/2018/11/06/bxtjyizv.o2f.mp4
                         * http://fx.kk66.cn:82/page/watchvideo?src=video-url
                         */
                        name: 'nuke',
                        url: /^Default\/(\w+)\/(\w+)\/(\w+)\/(\w+)/,
                        html: match => {
                            const basehref = '';
                            return `<div class="ck_media__wrapper_nuke">
                                    <video src="${basehref}/${match.input}"></video>
                                </div>`;
                        }
                    }
                ]
            }
        }).then(editor => {

            this.ckeditor = editor;
            /**
             * 设置初始值
             */
            editor.setData(this.data || '<p></p>');

            /**
             * 添加工具栏
             */
            editor.ui.view.editable.element.parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.view.editable.element
            );

            /**
             * 自定义上传图片
             */
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new Ckeditor5ImageUploadAdapter(loader, this.entityId, this.attachmentRuleName, this.http);
            };

            editor.plugins.get('Clipboard').on('inputTransformation', (event, data) => {

                /**
                 *  判断是否是从world中复制,如果是，则返回，默认走ckeditor自己封装的插件
                 */
                const dataTransfer = data.dataTransfer;
                const rtfContent = dataTransfer.getData('text/rtf');
                if (rtfContent) {
                    return;
                }
                const downloadFile = new Ckeditor5DownloadFile({
                    editor,
                    attachmentRuleName: this.attachmentRuleName,
                    entityId: this.entityId,
                    ckeditorData: data
                });
                event.stop();
                downloadFile.getBody().then(body => {
                    const modelFragment = editor.data.toModel(body);
                    editor.model.insertContent(modelFragment, editor.model.document.selection);
                });
            });

            editor.model.document.on('change:data', () => {
                if (this.onchange) {
                    this.data = editor.getData();
                    this.onchange(editor.getData());
                }
            });
        }).catch(error => {
            console.error(error);
        });
    }
}
