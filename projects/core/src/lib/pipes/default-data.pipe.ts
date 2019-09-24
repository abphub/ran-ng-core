import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defaultData' })
export class DefaultDataPipe implements PipeTransform {
    transform(data: any, parameter?: string): any {
        return data ? data : '-';
    }
}
