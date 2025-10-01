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
  // load trail list
  on(TrailActions.loadTrails, (state) => ({ ...state, trailList: null })),
  on(TrailActions.loadTrailsSuccess, (state, { trails }) => ({
    ...state,
    trailList: trails,
  })),
  // TODO failure?

  // load trail details
  on(TrailActions.loadTrailDetails, (state) => ({ ...state, trail: null })),
  on(TrailActions.loadTrailDetailsSuccess, (state, { trail }) => ({
    ...state,
    trail: addDayNumbers(trail),
  })),

  // update trail
  on(TrailActions.updateTrail, (state) => ({ ...state })),
  on(TrailActions.updateTrailSuccess, (state) => ({ ...state })),
);

/** Add day numbers to each entry based on the trail start date */
function addDayNumbers(trail: ITrail): ITrail {
  if (!trail.startDate) return trail;
  if (!trail.entries || trail.entries.length === 0) return trail;

  const startDate = new Date(trail.startDate);
  const newEntries = trail.entries.map((entry) => {
    if (!entry.startTime) return { ...entry };
    const entryDate = new Date(entry.startTime);
    const daysFromStart = getDaysFromStart(startDate, entryDate);
    return { ...entry, daysFromStart: daysFromStart + 1 };
  });
  return { ...trail, entries: newEntries };
}

/** Calculate calendar days between two dates */
function getDaysFromStart(startDate: Date, entryDate: Date): number {
  // drop the time
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const entry = new Date(entryDate);
  entry.setHours(0, 0, 0, 0);

  const diffTime = entry.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // hours*minutes*seconds*milliseconds
}