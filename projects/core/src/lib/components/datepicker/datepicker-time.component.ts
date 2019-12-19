import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _moment from 'moment';
import { en, zh } from '../../constants/datepicker-locales';

const moment = _moment;

@Component({
    selector: 'ran-date-time-picker',
    template: `<p-calendar appendTo="body" [formControl]='formControl' [showTime]='showTime' [locale]="locale"></p-calendar>`,
})
export class DateTimePickerComponent implements OnInit {

    formControl = new FormControl();

    @Output() dateTimeChange = new EventEmitter();

    private _dateTime: string;
    @Input()
    public get dateTime(): string {
        return this._dateTime;
    }
    public set dateTime(value: string) {
        this._dateTime = value;
    }

    @Input() showTime = false;

    locale: any;

    constructor(
        private store: Store
    ) {
    }

    ngOnInit() {
        const localeValue = this.store.selectSnapshot(state => state.SessionState.language) || 'en';
        this.locale = localeValue === 'zh-Hans' ? zh : en;
        this.formControl.patchValue(new Date(moment(this.dateTime).format('L LTS')));
        this.formControl.valueChanges.subscribe((value: Date) => {
            if (this.formControl.dirty) {
                const dateTime = moment(value).format('L LTS');
                this.dateTimeChange.emit(dateTime);
            }
        });
    }

}
