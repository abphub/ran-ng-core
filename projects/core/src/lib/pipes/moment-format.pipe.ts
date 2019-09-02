import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;

@Pipe({ name: 'momentFormat' })
export class MomentFormatPipe implements PipeTransform {
    transform(value: moment_.MomentInput, format: string) {
        if (!value) {
            return '';
        }

        return moment(value).format(format);
    }
}
