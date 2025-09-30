import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { IEntry } from '../../../models/entry';
import { EntryActions } from '../../../state';
import { selectEntry } from '../../../state/entry/entry.selectors';

@Component({
  selector: 'app-edit-entry',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-entry.html',
  styleUrl: './edit-entry.css',
})
export class EditEntry {
  public entry$: Observable<Partial<IEntry>> = of({});
  private trailId: number | null = null;
  private entryId: number | null = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.trailId = this.route.snapshot.params['trailId'];
    this.entryId = this.route.snapshot.params['entryId'];
    if (this.trailId && this.entryId) {
      this.store.dispatch(EntryActions.loadEntryDetails({ trailId: this.trailId, entryId: this.entryId }));

      this.entry$ = this.store.select(selectEntry).pipe(
        map(entry => entry ? { ...entry } : {})
      );
    }
  }

  /**
   * Navigate to view trail page
   */
  goToViewTrail(): void {
    this.router.navigate(['trail', this.trailId]);
  }

  /** Reset end time to null */
  clearEndTime(form: NgForm): void {
    form.controls['endTime'].setValue(null);
  }

  /** Save entry - create or update */
  onSubmit(form: NgForm): void {
    // todo add checks
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return;
    }

    const entry: IEntry = { ...form.value, trailId: this.trailId, id: this.entryId };
    if (this.trailId && this.entryId) {
      this.store.dispatch(EntryActions.updateEntry({ entry }));
    } else if (this.trailId) {
      this.store.dispatch(EntryActions.createEntry({ entry }));

    } else {
      alert('Trail ID is missing. Cannot save entry.');
      return;
    }
  }

  /** Redirect to view trail page */
  cancel(): void {
    this.goToViewTrail();
  }
}
