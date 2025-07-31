import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthModule } from 'angular-calendar';
import { CalenderRangePicker } from './components/calender-range-picker/calender-range-picker';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [CommonModule, CalendarMonthModule, CalenderRangePicker],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ transform: 'scaleY(0)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'scaleY(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'scaleY(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  isRangePickerOpen = false;
  selectedRange: any;

  toggleRangePicker() {
    this.isRangePickerOpen = !this.isRangePickerOpen;
  }

  showSelectedRange(data: any) {
    this.isRangePickerOpen = false;
    this.selectedRange = data;
  }
}
