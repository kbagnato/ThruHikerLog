import { createReducer, on } from '@ngrx/store';
import { EntryActions } from '..';
import { IEntry } from '../../models/entry';

export interface EntryState {
  entryList: IEntry[] | null;
  entry: IEntry | null;
  error: any; // TODO used?
}

export const initialState: EntryState = {
  entryList: null,
  entry: null,
  error: null,
};

export const entryReducer = createReducer(
  initialState,
  // load entries by trail id
  on(EntryActions.loadEntriesByTrailId, (state) => ({ ...state, entryList: null })),
  on(EntryActions.loadEntriesByTrailIdSuccess, (state, { entries }) => ({
    ...state,
    entryList: entries,
  })),
  on(EntryActions.loadEntriesByTrailIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // create entry
  on(EntryActions.createEntry, (state) => ({ ...state })),
  on(EntryActions.createEntrySuccess, (state) => ({ ...state })),
  on(EntryActions.createEntryFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // load single entry
  on(EntryActions.loadEntryDetails, (state) => ({ ...state, entry: null })),
  on(EntryActions.loadEntryDetailsSuccess, (state, { entry }) => ({
    ...state,
    entry,
  })),
  on(EntryActions.loadEntryDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // update entry
  on(EntryActions.updateEntry, (state) => ({ ...state })),
  on(EntryActions.updateEntrySuccess, (state) => ({ ...state })),
  on(EntryActions.updateEntryFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // delete entry
  on(EntryActions.deleteEntry, (state) => ({ ...state })),
  on(EntryActions.deleteEntrySuccess, (state) => ({ ...state })),
  on(EntryActions.deleteEntryFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
