import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ran-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RanCheckboxComponent),
        multi: true
    }]
})
export class RanCheckboxComponent implements OnInit, ControlValueAccessor {

    touched: () => void;
    onchange: <T>(newData: T) => void;

    /**
     * value
     */
    @Input() public value: string | {};

    /**
     * 用于在对象中筛选
     */
    @Input() key: string | number;

    private _maxchecklength: number;
    @Input()
    public get maxchecklength(): number {
        return this._maxchecklength;
    }


    public set maxchecklength(value: number) {
        this._maxchecklength = value as number;
    }

    private models: any[] = [];

    constructor(
    ) {
    }

    ngOnInit() {
        if (typeof this.value !== 'number' && typeof this.value !== 'string' && !this.key) {
            console.warn('绑定的值如果不是number类型或字符串类型，则需要一个主键key');
        }
    }


    writeValue<T>(value: T[]): void {
        if (value && value.constructor === Array) {
            this.models = value;
        }
    }

    registerOnTouched(fn: any) {
        this.touched = fn;
    }


    registerOnChange(fn: <T>(newData: T) => void): void {
        this.onchange = fn;
    }

    change(): void {
        const modelIndex = this.getModelIndex();
        if (modelIndex > -1) {
            this.models.splice(modelIndex, 1);
        } else {
            if (this.maxchecklength && this.models.length === this.maxchecklength) {
                alert('超过最大选择限制');
                return;
            } else {
                this.models.push(this.value);
            }
        }
        if (this.onchange) {
            this.onchange(this.models);
        }
    }

    isChecked(): boolean {
        const modelIndex = this.getModelIndex();
        return modelIndex > -1 ? true : false;
    }

    isDisabled() {
        if (!this.isChecked()) {
            return this.models.length >= this.maxchecklength;
        }
    }

    getModelIndex() {
        let modelIndex = -1;

        /**
         * 如果value为number类型或字符串（guid）类型，则通过findIndex方法返回
         */
        if (typeof this.value === 'number' || typeof this.value === 'string') {
            modelIndex = this.models.findIndex(n => n === this.value);
        }

        /**
         * 如果value为对象类型且有主键，则通过主键查找
         */
        if (typeof this.value !== 'number' && typeof this.value !== 'string' && this.key) {

            const length = this.models.filter(n => n[this.key] === this.value[this.key]).length;

            if (length > 1) {
                console.error(`${this.key}在数组中不是唯一键值，请检查后更正`);
                return;
            }

            modelIndex = this.models.findIndex(n => n[this.key] === this.value[this.key]);
        }

        /**
         * 如果都不是，尴尬
         */

        if (typeof this.value !== 'number' && typeof this.value !== 'string' && !this.key) {

            for (let index = 0; index < this.models.length; index++) {

                const item = this.models[index];
                let _isEqual = true;

                /**
                 * 循环判断对象是否相等
                 */
                for (const key in item) {
                    if (this.value.hasOwnProperty(key) && item.hasOwnProperty(key)) {
                        if (this.value[key] !== item[key]) {
                            _isEqual = false;
                        }
                    }
                }
                if (_isEqual) {
                    modelIndex = index;
                    break;
                }
            }
        }

        return modelIndex;
    }
}
