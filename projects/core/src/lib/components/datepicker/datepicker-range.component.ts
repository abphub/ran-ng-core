import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _moment from 'moment';
import { zh, en } from '../../constants/datepicker-locales';

const moment = _moment;

@Component({
    selector: 'ran-date-range-picker',
    template: `<p-calendar selectionMode="range" appendTo="body" [formControl]="formControl" [locale]='locale'></p-calendar>`,
})
export class DateRangePickerComponent implements OnInit {

    formControl = new FormControl();

    @Output() startTimeChange = new EventEmitter();
    @Output() endTimeChange = new EventEmitter();

    private _startTime: string;
    @Input()
    public get startTime(): string {
        return this._startTime;
    }
    public set startTime(value: string) {
        this._startTime = value;
        if (value) {
            this.patchValue();
        }
    }

    private _endTime: string;
    @Input()
    public get endTime(): string {
        return this._endTime;
    }
    public set endTime(value: string) {
        this._endTime = value;
        if (value) {
            this.patchValue();
        }
    }

    locale: any;

    constructor(
        private store: Store
    ) {
    }


    ngOnInit() {
        const localeValue = this.store.selectSnapshot(state => state.SessionState.language) || 'en';
        this.locale = localeValue === 'zh-Hans' ? zh : en;
        this.formControl.valueChanges.subscribe((value: Date[]) => {
            if (this.formControl.dirty) {
                for (let index = 0; index < value.length; index++) {
                    const item = value[index];
                    if (index) {
                        this._endTime = item ? item.toLocaleDateString() : '';
                    } else {
                        this._startTime = item.toLocaleDateString();
                    }
                }
                if (this._endTime && this._startTime) {
                    this.endTimeChange.emit(this._endTime);
                    this.startTimeChange.emit(this._startTime);
                }
            }
        });
    }

    patchValue() {
        const times: Date[] = [];

        if (this.startTime) {
            times.push(new Date(moment(this.startTime).format('L')));
        }

        if (this.endTime) {
            times.push(new Date(moment(this.endTime).format('L')));
        }

        this.formControl.patchValue(times);
    }
}
