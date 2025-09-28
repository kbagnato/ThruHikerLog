import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntryActions } from '../../../state';
import { IEntry } from '../../../models/entry';

@Component({
  selector: 'app-create-trail-entry',
  imports: [FormsModule],
  templateUrl: './create-entry.html',
  styleUrl: './create-entry.css',
})
export class CreateEntry {
  private id: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      alert("no trail id - can't create entry");
      this.router.navigate(['']);
    }
  }

  /** Reset end time to null */
  clearEndTime(form: NgForm): void {
    form.controls['endTime'].setValue(null);
  }

  /** Create entry and navigate back to trail details */
  onSubmit(form: NgForm): void {
    if (!this.id) {
      alert("no trail id - can't create entry");
      return;
    }

    if (!form.valid) {
      alert('Please fill out all required fields.');
      return;
    }

    const { name, startTime, endTime, startMileage, endMileage, notes } = form.value;
    const entry: IEntry = {
      trailId: this.id,
      name,
      startTime: (() => {
        // TODO hours are 5hr off - why?
        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      })(),
      endTime: (() => {
        const [hours, minutes] = endTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      })(),
      startMileage,
      endMileage,
      notes,
    };
    this.store.dispatch(EntryActions.createEntry({ entry }));
  }

  /** Navigate back to trail details without creating entry */
  cancel(): void {
    this.router.navigate(['trail', this.id!]);
  }
}
