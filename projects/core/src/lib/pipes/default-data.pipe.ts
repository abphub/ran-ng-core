import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defaultData' })
export class RanDefaultDataPipe implements PipeTransform {
    transform(data: any, parameter?: string): any {
        return data ? data : '-';
    }
}
