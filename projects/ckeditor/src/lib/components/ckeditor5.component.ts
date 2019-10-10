import { AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import { Ckeditor5DownloadFile } from '../models';
import { Ckeditor5ImageUploadAdapter } from '../models/ckeditor5-image-upload-adapter';
import { MEDIA_PROVIDERS } from '../models/ckeditor5-media-providers';
import { CkeditorService, CkeditorType } from '../services/ckeditor5.service';
import { Ckeditor5ToolbarComponent } from './ckeditor5-toolbar.component';


const DocumentEditor = DecoupledEditor;

const CKEDITOR_NG_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Ckeditor5Component),
    multi: true
};

@Component({
    selector: 'ran-ckeditor5',
    templateUrl: './ckeditor5.component.html',
    styleUrls: ['./ckeditor5.component.scss'],
    providers: [CKEDITOR_NG_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
})
export class Ckeditor5Component implements AfterViewInit, ControlValueAccessor {

    @ViewChild('ckeditor', { static: false })
    ckeditorElement: ElementRef<HTMLDivElement>;

    /**
     * 组件提供类型，不定义toolbarConfig的情况下使用
     * 优先级小于toolbarConfig
     */
    @Input()
    type: CkeditorType;

    @Input()
    toolbarComponent: Ckeditor5ToolbarComponent | HTMLDivElement;

    /**
     * ckeditor工具栏，可参考ckeditor文档自定义功能
     */
    @Input()
    toolbarConfig: string[];

    /**
     * 上传路径
     */
    @Input()
    uploadBaseUrl: string;

    /**
     * 含有上传图片功能的ckeditor5需要配置providerKey用于上传图片
     */
    @Input()
    assetProviderKey: string;

    /**
     * 上传规则
     * 如果未配置，则默认为ckeditor-content-image
     * 如果配置，则上传时按照配置之后的上传，
     */
    @Input()
    assetfolderName: string;

    onchange: (newData: any) => void;
    touched: () => void;

    data: string;

    ckeditor;
    loading = false;

    constructor(
        private injector: Injector,
        private ckeditorService: CkeditorService,
    ) {
    }

    writeValue(value: string) {
        if (this.ckeditor) {
            this.ckeditor.setData(value || '<p></p>');
        } else {
            this.data = value || '<p></p>';
        }
    }

    ngAfterViewInit() {
        DocumentEditor.create(this.ckeditorElement.nativeElement, {
            language: 'zh-cn',
            toolbar: this.getToobarConfig(),
            mediaEmbed: {
                extraProviders: MEDIA_PROVIDERS
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
            if (this.toolbarComponent) {
                this.toolbarComponent.appendChild(editor.ui.view.toolbar.element);
            } else {
                editor.ui.view.editable.element.parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.view.editable.element
                );
            }

            /**
             * 自定义上传图片
             */
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new Ckeditor5ImageUploadAdapter({
                    loader,
                    injector: this.injector,
                    type: this.type,
                    assetFolderName: this.assetfolderName,
                    assetProviderKey: this.assetProviderKey
                });
            };

            editor.plugins.get('Clipboard').on('inputTransformation', (event, data) => {

                this.loading = true;

                const dataTransfer = data.dataTransfer;
                const rtfContent = dataTransfer.getData('text/rtf');
                if (rtfContent) {
                    this.loading = false;
                    return;
                }

                const downloadFile = new Ckeditor5DownloadFile({
                    type: this.type,
                    editor,
                    assetProviderKey: this.assetProviderKey,
                    assetFolderName: this.assetfolderName,
                    dataTransfer: data.dataTransfer,
                    injector: this.injector
                });
                downloadFile.getBody(() => {
                    event.stop();
                }).then(body => {
                    this.loading = false;
                    if (body) {
                        const modelFragment = editor.data.toModel(body);
                        editor.model.insertContent(modelFragment, editor.model.document.selection);
                    } else {
                        console.log(event);
                    }
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

    private getToobarConfig(): string[] {
        let toobarConfig = [];
        if (this.toolbarConfig && this.toolbarConfig.length) {
            toobarConfig = this.toolbarConfig;
        } else {
            const ckeditorType = this.ckeditorService.getConfig(this.type);
            toobarConfig = ckeditorType.config;
        }

        return toobarConfig;
    }

    registerOnChange(fn: (newData: any) => void): void {
        this.onchange = fn;
    }

    registerOnTouched(fn: any) {
        this.touched = fn;
    }
}
