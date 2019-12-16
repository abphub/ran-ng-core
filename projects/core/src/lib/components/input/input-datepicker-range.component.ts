import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngxs/store';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ran-date-range-picker',
    template: `<p-calendar selectionMode="range" appendTo="body" [formControl]="formControl" [locale]='locale'></p-calendar>`,
})
export class InputDateRangePickerComponent implements OnInit {

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
        // this.startTimeChange.emit(value);s
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
        // this.endTimeChange.emit(value);
    }

    locale: any;

    en: any;
    zh: any;

    constructor(
        private store: Store
    ) {
    }


    ngOnInit() {
        this.en = {
            firstDayOfWeek: 0,
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            // tslint:disable-next-line:max-line-length
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.zh = {
            firstDayOfWeek: 0,
            dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周日', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            // tslint:disable-next-line:max-line-length
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            today: '今天',
            clear: '清空',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        const localeValue = this.store.selectSnapshot(state => state.SessionState.language) || 'en';
        this.locale = localeValue === 'zh-Hans' ? this.zh : this.en;
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
