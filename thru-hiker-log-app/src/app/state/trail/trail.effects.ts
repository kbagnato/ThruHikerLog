import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CoreActions, TrailActions } from '..';
import { TrailService } from '../../services/trail.service';

@Injectable()
export class TrailEffects {
  constructor(
    private actions$: Actions,
    private trailService: TrailService,
    private router: Router,
    private coreState: Store
  ) { }

  loadTrails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrailActions.loadTrails),
      mergeMap(() =>
        this.trailService.getAllTrails().pipe(
          map((trails) => TrailActions.loadTrailsSuccess({ trails })),
          catchError((error) => of(TrailActions.loadTrailsFailure({ error })))
        )
      )
    );
  });

  createTrail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.createTrail),
      tap(() => this.coreState.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.trailService.createTrail(action.trail).pipe(
          map(() => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            this.router.navigate(['']);
            return TrailActions.createTrailSuccess();
          }),
          catchError((error) => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            return of(TrailActions.createTrailFailure({ error }));
          })
        )
      )
    )
  );

  getTrailDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.loadTrailDetails),
      // tap(() => CoreActions.enableSpinner()), // TODO keep? or use skeletons?
      mergeMap((action) =>
        this.trailService.getTrailDetails(action.id).pipe(
          map(
            (trail) => TrailActions.loadTrailDetailsSuccess({ trail })),
          catchError((error) => of(TrailActions.loadTrailDetailsFailure({ error })))
        )
      )
    )
  );

  updateTrail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.updateTrail),
      tap(() => this.coreState.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.trailService.updateTrail(action.trail).pipe(
          map(() => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            this.router.navigate(['trail', action.trail.id]);
            return TrailActions.updateTrailSuccess();
          }),
          catchError((error) => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            return of(TrailActions.updateTrailFailure({ error }));
          }),
        )
      ),
    )
  );

  deleteTrail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.deleteTrail),
      tap(() => this.coreState.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.trailService.deleteTrail(action.id).pipe(
          map(() => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            this.router.navigate(['']);
            return TrailActions.deleteTrailSuccess();
          }
          ),
          catchError((error) => {
            this.coreState.dispatch(CoreActions.disableSpinner());
            return of(TrailActions.deleteTrailFailure({ error }))
          })
        )
      )
    )
  );
}
