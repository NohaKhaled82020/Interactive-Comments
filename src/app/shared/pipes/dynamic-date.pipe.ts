import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DynamicDate',
})
export class DynamicDatePipe implements PipeTransform {
  transform(value: string): unknown {
    const date = new Date(value);
    const today = new Date().getDate();
    const day = date.getDate();
    if (today === day) {
      return new DatePipe('en-US').transform(date, 'shortTime');
    } else if (today - day === 1) {
      return `Yesterday ${new DatePipe('en-US').transform(date, 'h:mm a')}`;
    } else if (today - day <= 5) {
      return `${new DatePipe('en-US').transform(date, 'EEEE')} ${new DatePipe(
        'en-US'
      ).transform(date, 'h:mm a')}`;
    }
    return new DatePipe('en-US').transform(date, 'short');
  }
}
