import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class RanJoinPipe implements PipeTransform {
  transform(array: Array<any>, parameter?: string): string {
    if (array === undefined) {
      throw new Error('Join pipe argument [array] not be undefined');
    }
    if (array.constructor !== Array) {
      throw new Error('Join pipe argument [array] must be an array');
    }

    if (parameter) {
      array = array.map(item => item[parameter]);
    }
    return array.join();
  }
}
