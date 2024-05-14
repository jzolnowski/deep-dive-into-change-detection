import { enableProdMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
  ],
}).catch(err => console.log(err));
