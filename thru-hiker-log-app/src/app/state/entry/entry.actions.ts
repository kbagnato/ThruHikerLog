import { createAction, props } from '@ngrx/store';
import { IEntry } from '../../models/entry';

// create new entry
export const createEntry = createAction('[Entry] Create entry', props<{ entry: IEntry }>());
export const createEntrySuccess = createAction('[Entry] Create entry success');
export const createEntryFailure = createAction(
  '[Entry] Create entry failure',
  props<{ error: any }>()
);

// load all entries by trail id
export const loadEntriesByTrailId = createAction(
  '[Entry] Load entries by trail id',
  props<{ id: number }>()
);
export const loadEntriesByTrailIdSuccess = createAction(
  '[Entry] Load entries by trail id success',
  props<{ entries: IEntry[] }>()
);
export const loadEntriesByTrailIdFailure = createAction(
  '[Entry] Load entries by trail id failure',
  props<{ error: any }>()
);

// load single entry
export const loadEntryDetails = createAction(
  '[Entry] Load entry details',
  props<{ trailId: number; entryId: number }>()
);
export const loadEntryDetailsSuccess = createAction(
  '[Entry] Load entry details success',
  props<{ entry: IEntry }>()
);
export const loadEntryDetailsFailure = createAction('[Entry] Load entry details failure', props<{ error: any }>());

// update entry
export const updateEntry = createAction('[Entry] Update entry', props<{ entry: IEntry }>());
export const updateEntrySuccess = createAction('[Entry] Update entry success');
export const updateEntryFailure = createAction(
  '[Entry] Update entry failure',
  props<{ error: any }>()
);

// delete entry
export const deleteEntry = createAction(
  '[Entry] Delete entry',
  props<{ trailId: number; entryId: number }>()
);
export const deleteEntrySuccess = createAction('[Entry] Delete entry success');
export const deleteEntryFailure = createAction(
  '[Entry] Delete entry failure',
  props<{ error: any }>()
);
