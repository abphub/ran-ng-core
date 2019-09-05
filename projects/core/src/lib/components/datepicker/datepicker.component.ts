import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

export type DatePicker = 'year' | 'month' | 'date' | 'time' | 'datetime';

export interface IDatePickerType {
    type: DatePicker;
    momentFormat?: string;
    LayDateFormat?: string;
}

@Component({
    selector: 'ran-datepicker',
    template: '<input type="text" class="form-control" #htmlInputElement>',
    styles: [
        ':host{display:block}'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RanDatePickerComponent),
        multi: true
    }]
})
export class RanDatePickerComponent implements AfterViewInit, ControlValueAccessor {

    @ViewChild('htmlInputElement', { static: true }) htmlInputElement: ElementRef<HTMLInputElement>;

    private _type: DatePicker = 'date';
    @Input()
    public get type(): DatePicker {
        return this._type;
    }
    public set type(value: DatePicker) {
        this._type = value;
        this.laydateRender();
    }

    @Input() max: moment_.Moment;
    @Input() min: moment_.Moment;

    formats: Array<IDatePickerType> = [{
        type: 'year', momentFormat: 'YYYY', LayDateFormat: 'yyyy'
    }, {
        type: 'month', momentFormat: 'YYYY-MM', LayDateFormat: 'yyyy-MM'
    }, {
        type: 'time', momentFormat: 'HH:mm', LayDateFormat: 'HH:mm'
    }, {
        type: 'date', momentFormat: 'YYYY-MM-DD', LayDateFormat: 'yyyy-MM-dd'
    }, {
        type: 'datetime', momentFormat: 'YYYY-MM-DD HH:mm', LayDateFormat: 'yyyy-MM-dd HH:mm'
    }];

    touched: () => void;
    onchange: <T>(newData: T) => void;

    date: moment_.Moment | number | string;
    laydatePlugin: any;

    ngAfterViewInit() {
        this.laydateRender();
    }

    writeValue(value: moment_.Moment | number | string): void {
        this.date = value;
        if (value) {
            const format = this.formats.find(n => n.type === this.type);
            console.log(format);
        }
    }

    laydateRender() {
        const format = this.formats.find(n => n.type === this.type);
        // this.laydatePlugin = laydate.render({
        //     type: this.type,
        //     format: format.LayDateFormat,
        //     elem: this.htmlInputElement.nativeElement,
        //     lang: 'cn',
        //     done: (value) => {
        //         /**
        //          * 处理moment相差八小时然后赋值
        //          */
        //         if (this.type === 'year') {
        //             this.date = value;
        //         } else {
        //             const _date = moment(value).format('YYYY-MM-DD HH:mm:ss') + 'Z';
        //             this.date = moment(_date);
        //         }

        //         if (this.onchange) {
        //             this.onchange(this.date);
        //         }
        //     }
        // });
    }

    registerOnTouched(fn: any) {
        this.touched = fn;
    }

    registerOnChange(fn: <T>(newData: T) => void): void {
        this.onchange = fn;
    }
}
