import { ComponentType } from '@angular/cdk/overlay/index';
import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

type ModalClassTypes = 'modal-xs' | 'modal-sm' | 'modal-md' | 'modal-lg' | 'modal-fullscreen';

interface IModalParams<T = { [key: string]: string | number }> {
    modalClass?: ModalClassTypes;
    data?: T;
}

interface IModalConfig {
    modalClass: ModalClassTypes;
    config: MatDialogConfig<{}>;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private _config: Array<IModalConfig> = [{
        modalClass: 'modal-xs',
        config: {
            width: '45%',
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
            width: '80%',
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
        private dialog: MatDialog
    ) {
        console.log(dialog);
    }


    show<T, P>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, params: IModalParams<P> = {}) {

        if (!this.dialog) {
            console.log('material MatDialog Service no load');
        }

        const _modalClose = new EventEmitter<any>();

        const _config = this.getConfig(params.modalClass);

        const config = Object.assign(_config, { data: params.data });

        const modal = this.dialog.open(componentOrTemplateRef, config);

        modal.afterClosed().subscribe(result => {
            if (result !== true) {
                _modalClose.emit(result);
            }
        });

        return { close: _modalClose };
    }

    private getConfig(modalClass: string) {
        const modal = this._config.find(n => n.modalClass === modalClass)
        return modal ? modal.config : this._config[1].modalClass;
    }
}
