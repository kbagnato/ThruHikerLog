import { createAction, props } from "@ngrx/store"
import { IEntry } from "../../models/entry";

export const createEntry = createAction('[Entry] Create entry',
  props<{ entry: IEntry }>()
);
export const createEntrySuccess = createAction('[Entry] Create entry success');
export const createEntryFailure = createAction('[Entry] Create entry failure',
  props<{ error: any }>()
);

export const loadEntriesByTrailId = createAction('[Entry] Load entries by trail id',
  props<{ id: number }>()
);
export const loadEntriesByTrailIdSuccess = createAction('[Entry] Load entries by trail id success',
  props<{ entries: IEntry[] }>()
);
export const loadEntriesByTrailIdFailure = createAction('[Entry] Load entries by trail id failure',
  props<{ error: any }>()
);