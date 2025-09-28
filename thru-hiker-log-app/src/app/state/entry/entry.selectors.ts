import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './entry.reducer';

export const selectEntryState = createFeatureSelector<EntryState>('entries');

export const selectEntriesByTrailId = createSelector(selectEntryState, (state) => state.entryList);
