import { createReducer, on } from '@ngrx/store';
import { CoreActions } from '..';

export interface CoreState {
  isSpinning: boolean;
}

export const initialState: CoreState = {
  isSpinning: false,
};

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.enableSpinner, (state) => ({ ...state, isSpinning: true })),
  on(CoreActions.disableSpinner, (state) => ({ ...state, isSpinning: false }))
);
