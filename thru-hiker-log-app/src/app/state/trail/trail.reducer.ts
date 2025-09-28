import { createReducer, on } from '@ngrx/store';
import { TrailActions } from '..';
import { ITrail } from '../../models/trail';

export interface TrailState {
  trailList: ITrail[] | null;
  trail: ITrail | null;
  error: any;
}

export const initialState: TrailState = {
  trailList: null,
  trail: null,
  error: null,
};

export const trailReducer = createReducer(
  initialState,
  on(TrailActions.loadTrails, (state) => ({ ...state, trailList: null })),
  on(TrailActions.loadTrailsSuccess, (state, { trails }) => ({
    ...state,
    trailList: trails,
  })),
  on(TrailActions.clearTrails, (state) => ({
    ...state,
    trailList: null,
  })),
  // TODO failure?
  on(TrailActions.loadTrailDetails, (state) => ({ ...state, trail: null })),
  on(TrailActions.loadTrailDetailsSuccess, (state, { trail }) => ({ ...state, trail }))
);
