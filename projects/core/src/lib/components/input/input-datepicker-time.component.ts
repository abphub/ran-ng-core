import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { ConfigState } from '@abp/ng.core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ran-date-time-picker',
    template: `<p-calendar [formControl]='formControl' [showTime]='true' [locale]="locale"></p-calendar>`,
})
export class InputDateTimePickerComponent implements OnInit {

    formControl = new FormControl();

    @Output() timeChange = new EventEmitter();

    private _time: string;
    @Input()
    public get time(): string {
        return this._time;
    }
    public set time(value: string) {
        this._time = value;
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
        this.formControl.patchValue(new Date(moment(this.time).format('L LTS')));
        this.formControl.valueChanges.subscribe((value: Date) => {
            if (this.formControl.dirty) {
                const time = moment(value).format('L LTS');
                this.timeChange.emit(time);
            }
        });
    }

}
