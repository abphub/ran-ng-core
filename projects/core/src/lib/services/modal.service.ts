import { ComponentType } from '@angular/cdk/overlay/index';
import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

type modalClassTypes = 'modal-xs' | 'modal-sm' | 'modal-md' | 'modal-lg' | 'modal-fullscreen';

interface IModalParams {
    modalClass?: modalClassTypes;
    data?: {};
}

interface IModalConfig {
    modalClass: modalClassTypes;
    config: MatDialogConfig<{}>;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private _config: Array<IModalConfig> = [{
        modalClass: 'modal-xs',
        config: {
            width: '50%',
            autoFocus: false
        }
    }, {
        modalClass: 'modal-sm',
        config: {
            width: '60%',
            autoFocus: false,
            disableClose: true
        }
    }, {
        modalClass: 'modal-md',
        config: {
            width: '70%',
            autoFocus: false,
            disableClose: true
        }
    }, {
        modalClass: 'modal-lg',
        config: {
            width: '90%',
            autoFocus: false,
            disableClose: true
        }
    }, {
        modalClass: 'modal-fullscreen',
        config: {
            width: '96%',
            height: '96%',
            maxWidth: '100%',
            maxHeight: '100%',
            autoFocus: false,
            disableClose: true,
        }
    }];

    constructor(
        private _matDialog: MatDialog
    ) {
    }


    show<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, params: IModalParams = {}) {

        const _modalClose = new EventEmitter<any>();

        const _modalClass = params.modalClass || 'modal-xs';
        const _config = this.getConfig(_modalClass);
        /**
         * 合并对象
         */
        const config = Object.assign(_config, { data: params.data });

        const modal = this._matDialog.open(componentOrTemplateRef, config);

        modal.afterClosed().subscribe(result => {
            if (result !== true) {
                _modalClose.emit(result);
            }
        });

        return { close: _modalClose };
    }

    private getConfig(modalClass: string) {
        return this._config.find(n => n.modalClass === modalClass).config;
    }
}
