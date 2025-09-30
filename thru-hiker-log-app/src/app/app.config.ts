import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { coreReducer } from './state/core/core.reducer';
import { EntryEffects } from './state/entry/entry.effects';
import { entryReducer } from './state/entry/entry.reducer';
import { TrailEffects } from './state/trail/trail.effects';
import { trailReducer } from './state/trail/trail.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ trail: trailReducer, core: coreReducer, entry: entryReducer }),
    provideEffects([TrailEffects, EntryEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
