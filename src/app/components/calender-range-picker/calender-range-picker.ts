import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarMonthModule } from 'angular-calendar';
import {
  isSameDay,
  isWithinInterval,
} from 'date-fns';

@Component({
  selector: 'app-calender-range-picker',
  imports: [CalendarMonthModule, CommonModule, DatePipe],
  templateUrl: './calender-range-picker.html',
  styleUrl: './calender-range-picker.scss',
})
export class CalenderRangePicker {
  @Input('scale') scale: 'small' | 'medium' | 'large' = 'medium';

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

  navigateMonth(offset: number) {
    this.activeMonth = this.addMonths(this.activeMonth, offset);
  }

  addMonths(date: Date, offset: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    return newDate;
  }

  getDayPrice(date: Date): number {
    const key = date.toISOString().split('T')[0];
    return this.prices.get(key) || 0;
  }

  isStart(date: Date): boolean {
    return this.startDate ? isSameDay(date, this.startDate) : false;
  }

  isEnd(date: Date): boolean {
    return this.endDate ? isSameDay(date, this.endDate) : false;
  }

  isInRange(date: Date): boolean {
    if (this.startDate && this.endDate) {
      return isWithinInterval(date, {
        start: this.startDate,
        end: this.endDate,
      });
    }
    return false;
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

  get renderedMonths(): Date[] {
    return [0, 1].map((offset) => this.addMonths(this.activeMonth, offset));
  }
}
