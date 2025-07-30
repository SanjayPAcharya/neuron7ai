import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addMonths, isSameDay, isWithinInterval } from 'date-fns';
import { CalendarMonthModule } from 'angular-calendar';
import { CalenderRangePicker } from './components/calender-range-picker/calender-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [CommonModule, CalendarMonthModule, CalenderRangePicker],
})
export class AppComponent {
  isRangePickerOpen = true;
  selectedRange: any;

  toggleRangePicker() {
    this.isRangePickerOpen = !this.isRangePickerOpen;
  }

  showSelectedRange(data: any) {
    console.log(data);
    this.selectedRange = data;
  }
}
