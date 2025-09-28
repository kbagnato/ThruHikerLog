import { Routes } from '@angular/router';
import { CreateEntry } from './features/entry/create-entry/create-entry';
import { Home } from './features/home/home';
import { CreateTrail } from './features/trail/create-trail/create-trail';
import { EditTrail } from './features/trail/edit-trail/edit-trail';
import { ViewTrail } from './features/trail/view-trail/view-trail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'trail/create', component: CreateTrail },
  { path: 'trail/:id', component: ViewTrail },
  { path: 'trail/:id/edit', component: EditTrail },
  { path: 'trail/:id/add-entry', component: CreateEntry },
];
