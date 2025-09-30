import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './entry.reducer';

export const selectEntryState = createFeatureSelector<EntryState>('entry');

export const selectEntriesByTrailId = createSelector(selectEntryState, (state) => state.entryList);

export const selectEntry = createSelector(selectEntryState, (state) => state.entry);
