import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TrailState } from "./trail.reducer";

export const selectTrailState = createFeatureSelector<TrailState>('trail');

export const selectAllTrails = createSelector(
  selectTrailState,
  (state) => state.trailList
);
export const selectTrailDetails = createSelector(
  selectTrailState,
  (state) => state.trail
)