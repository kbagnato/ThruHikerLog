import { createAction, props } from "@ngrx/store";
import { ITrail } from "../../models/trail";

export const loadTrails = createAction('[Trail] Load Trails');
export const loadTrailsSuccess = createAction(
  '[Trail] Load Trails Success',
  props<{ trails: ITrail[] }>()
);
export const loadTrailsFailure = createAction(
  '[Trail] Load Trails Failure',
  props<{ error: any }>()
);
export const clearTrails = createAction('[Trail] Clear Trails');

export const createTrail = createAction('[Trail] Create trail',
  props<{ trail: ITrail }>()
);
export const createTrailSuccess = createAction('[Trail] Create trail success');
export const createTrailFailure = createAction('[Trail] Create trail failure',
  props<{ error: any }>()
);

export const loadTrailDetails = createAction('[Trail] Load trail details',
  props<{ id: number }>()
);
export const loadTrailDetailsSuccess = createAction('[Trail] Load trail details success',
  props<{ trail: ITrail }>()
);
export const loadTrailDetailsFailure = createAction('[Trail] Load trail details failure',
  props<{ error: any }>()
);