import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { ITrail } from '../../../models/trail';
import { TrailActions } from '../../../state';
import { selectTrailDetails } from '../../../state/trail/trail.selectors';

@Component({
  selector: 'app-edit-trail',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trail.html',
  styleUrl: './edit-trail.css',
})
export class EditTrail {
  public trail$: Observable<Partial<ITrail>> = of({});
  private id: number | null = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['trailId'];
    if (this.id) {
      this.store.dispatch(TrailActions.loadTrailDetails({ id: this.id }));

      this.trail$ = this.store.select(selectTrailDetails).pipe(
        map(trail => trail ? { ...trail } : {})
      );
    }
  }

  /** Navigate to home page */
  goHome(): void {
    this.router.navigate(['']);
  }


  /** Redirect to home page */
  cancel(): void {
    if (this.id) {
      this.router.navigate(['trail', this.id]);
      return;
    }

    this.router.navigate(['']);
  }


  /** Reset end date to null */
  clearEndDate(form: NgForm) {
    form.controls['endDate'].setValue(null);
  }

  /** Create or update a trail */
  onSubmit(form: NgForm) {
    // todo add checks
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return;
    }

    // TODO make cleaner like in edit-entry.ts
    // const trail: ITrail = { ...form.value,
    //   startDate: new Date(form.value.startDate),
    //   endDate: form.value.endDate ? new Date(form.value.endDate) : undefined,
    //  };
    const { name, startDate, endDate, length, description, location, lengthType, gearListUrl } =
      form.value;
    var trail: ITrail = {
      name,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      length: Number(length),
      description,
      location,
      lengthType,
      gearListUrl,
    };

    if (this.id) {
      // update
      trail = { ...trail, id: this.id };
      this.store.dispatch(TrailActions.updateTrail({ trail }));
    } else {
      // create
      this.store.dispatch(TrailActions.createTrail({ trail }));
    }
  }
}
