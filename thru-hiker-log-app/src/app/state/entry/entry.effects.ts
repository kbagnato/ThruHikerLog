import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CoreActions, EntryActions } from '..';
import { EntryService } from '../../services/entry.service';

@Injectable()
export class EntryEffects {
  constructor(
    private actions$: Actions,
    private entryService: EntryService,
    private store: Store,
    private router: Router
  ) { }

  createEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.createEntry),
      tap(() => this.store.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.entryService.createEntry(action.entry).pipe(
          map(() => {
            this.store.dispatch(CoreActions.disableSpinner());
            return EntryActions.createEntrySuccess()
          }),
          catchError((error) => {
            this.store.dispatch(CoreActions.disableSpinner());
            return of(EntryActions.createEntryFailure({ error }))
          })
        )
      )
    )
  );

  loadEntries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntryActions.loadEntriesByTrailId),
      mergeMap((action) =>
        this.entryService.getEntriesByTrailId(action.id).pipe(
          map((entries) => EntryActions.loadEntriesByTrailIdSuccess({ entries })),
          catchError((error) => of(EntryActions.loadEntriesByTrailIdFailure({ error })))
        )
      )
    );
  });

  loadEntryDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.loadEntryDetails),
      mergeMap((action) =>
        this.entryService.getEntryDetails(action.trailId, action.entryId).pipe(
          map((entry) => EntryActions.loadEntryDetailsSuccess({ entry })),
          catchError((error) => of(EntryActions.loadEntryDetailsFailure({ error })))
        )
      )
    )
  );

  updateEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.updateEntry),
      tap(() => this.store.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.entryService.updateEntry(action.entry).pipe(
          map(() => {
            this.store.dispatch(CoreActions.disableSpinner());
            this.router.navigate(['trail', action.entry.trailId]);
            return EntryActions.updateEntrySuccess()
          }),
          catchError((error) => {
            this.store.dispatch(CoreActions.disableSpinner());
            return of(EntryActions.updateEntryFailure({ error }))
          })
        )
      )
    )
  );

  deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.deleteEntry),
      tap(() => this.store.dispatch(CoreActions.enableSpinner())),
      mergeMap((action) =>
        this.entryService.deleteEntry(action.trailId, action.entryId).pipe(
          map(() => {
            this.store.dispatch(CoreActions.disableSpinner());
            return EntryActions.loadEntriesByTrailId({ id: action.trailId });
          }),
          catchError((error) => {
            this.store.dispatch(CoreActions.disableSpinner());
            return of(EntryActions.deleteEntryFailure({ error }))
          })
        )
      )
    )
  );
}
