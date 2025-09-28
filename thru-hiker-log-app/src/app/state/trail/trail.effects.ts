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
  ) {}

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
          map(() => TrailActions.createTrailSuccess()),
          catchError((error) => of(TrailActions.createTrailFailure({ error })))
        )
      )
    )
  );

  createTrailSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.createTrailSuccess),
      map(() => CoreActions.disableSpinner())
    )
  );

  navigateToTrail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrailActions.createTrailSuccess),
        tap(() => this.router.navigate(['']))
      ),
    { dispatch: false }
  );

  getTrailDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrailActions.loadTrailDetails),
      tap(() => CoreActions.enableSpinner()),
      mergeMap((action) =>
        this.trailService.getTrailDetails(action.id).pipe(
          map(
            (trail) => TrailActions.loadTrailDetailsSuccess({ trail }),
            catchError((error) => of(TrailActions.loadTrailDetailsFailure({ error })))
          )
        )
      )
    )
  );
}
