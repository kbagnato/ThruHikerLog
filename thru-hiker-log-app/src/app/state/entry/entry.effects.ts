import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { EntryActions } from '..';
import { EntryService } from '../../services/entry.service';

@Injectable()
export class EntryEffects {
  constructor(private actions$: Actions, private entryService: EntryService) {}

  createEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.createEntry),
      mergeMap((action) =>
        this.entryService.createEntry(action.entry).pipe(
          map(() => EntryActions.createEntrySuccess()),
          catchError((error) => of(EntryActions.createEntryFailure({ error })))
        )
      )
    )
  );

  loadEntries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntryActions.loadEntriesByTrailId),
      mergeMap((action) =>
        this.entryService.getEntryByTrailId(action.id).pipe(
          map((entries) => EntryActions.loadEntriesByTrailIdSuccess({ entries })),
          catchError((error) => of(EntryActions.loadEntriesByTrailIdFailure({ error })))
        )
      )
    );
  });
}
