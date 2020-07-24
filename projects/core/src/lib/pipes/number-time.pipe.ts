import { Pipe, PipeTransform } from '@angular/core';



/**
 * 根据数字转换为时间格式，比如60为1s,600为10s
 * ！！！以秒为基础转换
 */
@Pipe({ name: 'numberToTime' })
export class NumberToTimePipe implements PipeTransform {

    TIME_UNITS = [{
        key: 'ms',
        unit: 1000,
        name: '毫秒'
    }, {
        key: 's',
        unit: 60,
        name: '秒'
    }, {
        key: 'm',
        unit: 60,
        name: '分'
    }, {
        key: 'h',
        unit: 24,
        name: '时'
    }, {
        key: 'd',
        unit: 30,
        name: '天'
    }, {
        key: 'M',
        unit: 12,
        name: '月'
    }, {
        key: 'Y',
        unit: undefined,
        name: '年'
    }];

    transform(data: number, ...parameter: string[]): string {
        const _result = this.convert(data * 1000);
        const result: string[] = [];
        for (let index = 0; index < _result.length; index++) {
            const timeUnit = this.TIME_UNITS[index];
            result.push(_result[index] + timeUnit.name);
        }

        return result.length > 2 ? result.reverse().slice(0, 2).join('') : result.reverse().join('');
    }

    convert(value: number, timeUnitIndex = 0, result: number[] = []) {
        const timeUnit = this.TIME_UNITS[timeUnitIndex];
        if (timeUnit && value > timeUnit.unit) {
            result.push(Math.floor(value % timeUnit.unit));
            return this.convert(value / timeUnit.unit, ++timeUnitIndex, result);
        } else {
            result.push(Math.floor(value));
            return result;
        }
    }
}
