import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TrailActions } from '../../../state';

@Component({
  selector: 'app-create-trail',
  imports: [FormsModule],
  templateUrl: './create-trail.html',
  styleUrl: './create-trail.css',
})
export class CreateTrail {
  constructor(private router: Router, private trailStore: Store) { }

  /** Reset end date to null */
  clearEndDate(form: NgForm) {
    form.controls['endDate'].setValue(null);
  }

  /** Create a trail and redirect to its page */
  onSubmit(form: NgForm) {
    // todo add checks
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return;
    }

    const { name, startDate, endDate, length, description, location, lengthType, gearListUrl } =
      form.value;
    const trail = {
      name,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      length: Number(length),
      description,
      location,
      lengthType,
      gearListUrl,
    };

    this.trailStore.dispatch(TrailActions.createTrail({ trail }));
  }

  /** Redirect to home page */
  cancel(): void {
    this.router.navigate(['']);
  }
}
