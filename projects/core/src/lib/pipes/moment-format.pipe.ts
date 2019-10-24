import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({ name: 'momentFormat' })
export class MomentFormatPipe implements PipeTransform {
    transform(value: _moment.MomentInput, format: string) {
        if (!value) {
            return '';
        }

        return moment(value).format(format);
    }
}
