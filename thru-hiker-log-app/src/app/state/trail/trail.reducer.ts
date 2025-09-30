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
  on(TrailActions.loadTrailDetailsSuccess, (state, { trail }) => ({
    ...state,
    trail: calculateDayNumbers(trail),
  })),

  // update trail
  on(TrailActions.updateTrail, (state) => ({ ...state })),
  on(TrailActions.updateTrailSuccess, (state) => ({ ...state })),
);

// calculate day number for each entry
function calculateDayNumbers(trail: ITrail): ITrail {
  if (!trail.startDate) return trail;
  if (!trail.entries || trail.entries.length === 0) return trail;

  const start = new Date(trail.startDate);
  const newEntries = trail.entries.map((entry) => {
    if (!entry.startTime) return { ...entry };
    const entryDate = new Date(entry.startTime);
    const diffTime = Math.abs(entryDate.getTime() - start.getTime());
    const dayNumber = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return { ...entry, dayNumber };
  });
  return { ...trail, entries: newEntries };
}
