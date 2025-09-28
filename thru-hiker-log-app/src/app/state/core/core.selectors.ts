import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreState } from "./core.reducer";

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectIsSpinning = createSelector(
  selectCoreState,
  (state) => state.isSpinning
)