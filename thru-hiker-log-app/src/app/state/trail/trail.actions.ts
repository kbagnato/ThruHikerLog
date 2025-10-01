import { createAction, props } from "@ngrx/store";
import { ITrail } from "../../models/trail";

// load trails
export const loadTrails = createAction('[Trail] Load Trails');
export const loadTrailsSuccess = createAction(
  '[Trail] Load Trails Success',
  props<{ trails: ITrail[] }>()
);
export const loadTrailsFailure = createAction(
  '[Trail] Load Trails Failure',
  props<{ error: any }>()
);

// create trail
export const createTrail = createAction('[Trail] Create trail',
  props<{ trail: ITrail }>()
);
export const createTrailSuccess = createAction('[Trail] Create trail success');
export const createTrailFailure = createAction('[Trail] Create trail failure',
  props<{ error: any }>()
);

// load trail details
export const loadTrailDetails = createAction('[Trail] Load trail details',
  props<{ id: number }>()
);
export const loadTrailDetailsSuccess = createAction('[Trail] Load trail details success',
  props<{ trail: ITrail }>()
);
export const loadTrailDetailsFailure = createAction('[Trail] Load trail details failure',
  props<{ error: any }>()
);

// update trail
export const updateTrail = createAction('[Trail] Update trail',
  props<{ trail: ITrail }>()
);
export const updateTrailSuccess = createAction('[Trail] Update trail success');
export const updateTrailFailure = createAction('[Trail] Update trail failure',
  props<{ error: any }>()
);

// delete trail
export const deleteTrail = createAction('[Trail] Delete trail',
  props<{ id: number }>()
);
export const deleteTrailSuccess = createAction('[Trail] Delete trail success');
export const deleteTrailFailure = createAction('[Trail] Delete trail failure',
  props<{ error: any }>()
);