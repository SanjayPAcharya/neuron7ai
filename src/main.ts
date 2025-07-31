import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
     provideAnimations(),
    importProvidersFrom(
      CommonModule,
      CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    )
  ]
}).catch(err => console.error(err));

