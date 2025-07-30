import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderRangePicker } from './calender-range-picker';

describe('CalenderRangePicker', () => {
  let component: CalenderRangePicker;
  let fixture: ComponentFixture<CalenderRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalenderRangePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderRangePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
