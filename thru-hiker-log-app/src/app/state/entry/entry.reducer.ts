import { createReducer, on } from "@ngrx/store";
import { EntryActions } from "..";
import { IEntry } from "../../models/entry";

export interface EntryState {
  entryList: IEntry[] | null;
  error: any;
}

export const initialState: EntryState = {
  entryList: null,
  error: null
};

export const entryReducer = createReducer(
  initialState,
  on(EntryActions.loadEntriesByTrailId, (state) => ({ ...state, entryList: null })),
  on(EntryActions.loadEntriesByTrailIdSuccess, (state, { entries }) => ({
    ...state,
    entryList: entries
  })),
  on(EntryActions.loadEntriesByTrailIdFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
);