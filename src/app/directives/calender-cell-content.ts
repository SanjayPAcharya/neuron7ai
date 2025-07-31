// this is to send data from months render to the date cell template
// because angular-calender does not send data implicitly
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[calendarCellContext]',
  standalone: true
})
export class CalendarCellContextDirective {
  @Input('calendarCellContext') set context(ctx: any) {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, ctx);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
