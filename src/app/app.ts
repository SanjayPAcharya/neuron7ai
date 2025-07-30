import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import {
  addMonths,
  isSameDay,
  isWithinInterval
} from 'date-fns';
import { CalendarMonthModule } from 'angular-calendar';
import { CalenderRangePicker } from './components/calender-range-picker/calender-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [NgClass, CommonModule, CalendarMonthModule, CalenderRangePicker]
})
export class AppComponent {
  activeMonth: Date = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;

  prices = new Map<string, number>([
    ['2025-07-27', 4439],
    ['2025-07-28', 4439],
    ['2025-07-29', 4439],
    ['2025-07-30', 4439],
    ['2025-07-31', 4439],
    ['2025-08-01', 4439],
    ['2025-08-02', 4439],
  ]);

  addMonths(date: Date, offset: number): Date {
    return addMonths(date, offset);
  }

  onDayClick(date: Date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (this.startDate && !this.endDate) {
      if (date < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = date;
      } else {
        this.endDate = date;
      }
    }
  }

  isStart(date: Date): boolean {
    return this.startDate ? isSameDay(date, this.startDate) : false;
  }

  isEnd(date: Date): boolean {
    return this.endDate ? isSameDay(date, this.endDate) : false;
  }

  isInRange(date: Date): boolean {
    if (this.startDate && this.endDate) {
      return isWithinInterval(date, { start: this.startDate, end: this.endDate });
    }
    return false;
  }

  getDayPrice(date: Date): number {
    const key = date.toISOString().split('T')[0];
    return this.prices.get(key) || 0;
  }
}
