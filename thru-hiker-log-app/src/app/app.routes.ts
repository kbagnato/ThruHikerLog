import { Routes } from '@angular/router';
import { EditEntry } from './features/entry/edit-entry/edit-entry';
import { Home } from './features/home/home';
import { CreateTrail } from './features/trail/create-trail/create-trail';
import { EditTrail } from './features/trail/edit-trail/edit-trail';
import { ViewTrail } from './features/trail/view-trail/view-trail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'trail/create', component: CreateTrail },
  { path: 'trail/:trailId', component: ViewTrail },
  { path: 'trail/:trailId/edit', component: EditTrail },
  { path: 'trail/:trailId/add-entry', component: EditEntry },
  { path: 'trail/:trailId/entry/:entryId', component: EditEntry },
  // { path: 'trail/:trailId/entry/:entryId', component: ViewEntry },
  { path: '**', redirectTo: '' },
];
