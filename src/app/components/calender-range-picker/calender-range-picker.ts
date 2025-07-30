import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarMonthModule } from 'angular-calendar';
import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
import { CalendarCellContextDirective } from '../../directives/calender-cell-content';

@Component({
  selector: 'app-calender-range-picker',
  imports: [
    CalendarMonthModule,
    CommonModule,
    DatePipe,
    CalendarCellContextDirective,
  ],
  templateUrl: './calender-range-picker.html',
  styleUrl: './calender-range-picker.scss',
})
export class CalenderRangePicker implements OnInit {
  @Input('scale') scale: 'small' | 'medium' | 'large' = 'medium';
  @Output() footfallEmitted = new EventEmitter<
    { date: string; footfall: number }[]
  >();

  activeMonth: Date = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;
  footfall = new Map<string, number>();

  shortWeekdays: string[] = this.getShortWeekdays();

  getShortWeekdays(): string[] {
    const start = startOfWeek(new Date(), { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) =>
      format(addDays(start, i), 'EEE')
    ).map((label) => label.slice(0, 2));
  }

  ngOnInit(): void {
    this.generateFootfall();
  }

  navigateMonth(offset: number) {
    this.activeMonth = this.addMonths(this.activeMonth, offset);
    this.generateFootfall();
  }

  addMonths(date: Date, offset: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    return newDate;
  }

  getDayFootfall(date: Date): number {
    const key = date.toISOString().split('T')[0];
    return this.footfall.get(key) || 0;
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

  getMonthDates(monthDate: Date): Date[] {
    const dates: Date[] = [];
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }

    return dates;
  }

  generateFootfall() {
    this.footfall.clear();
    this.renderedMonths.forEach((monthDate) => {
      this.getMonthDates(monthDate).forEach((date) => {
        const key = date.toISOString().split('T')[0];
        const randomFootfall = Math.floor(Math.random() * 901) + 100; // 100–1000
        this.footfall.set(key, randomFootfall);
      });
    });
  }

  emitFootfallList() {
    const footfallArray: { date: string; footfall: number }[] = [];

    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    this.renderedMonths.forEach((monthDate) => {
      this.getMonthDates(monthDate).forEach((date) => {
        if (date >= start && date <= end) {
          const key = date.toISOString().split('T')[0];
          const count = this.footfall.get(key) || 0;
          footfallArray.push({ date: key, footfall: count });
        }
      });
    });

    this.footfallEmitted.emit(footfallArray);
  }

  public noShow(date: Date, month: Date): boolean {
    if (!date || !month) return false;

    return !(
      date.getFullYear() === month.getFullYear() &&
      date.getMonth() === month.getMonth()
    );
  }

  stopClick(e: Event) {
    e.stopPropagation();
  }
}
