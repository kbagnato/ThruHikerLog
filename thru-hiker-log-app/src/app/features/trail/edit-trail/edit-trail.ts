import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrail } from '../../../models/trail';
import { TrailActions } from '../../../state';
import { selectTrailDetails } from '../../../state/trail/trail.selectors';

@Component({
  selector: 'app-edit-trail',
  imports: [CommonModule],
  templateUrl: './edit-trail.html',
  styleUrl: './edit-trail.css',
})
export class EditTrail {
  public trail$?: Observable<ITrail | null>;
  private id: number | null = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.trail$ = this.store.select(selectTrailDetails);
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.store.dispatch(TrailActions.loadTrailDetails({ id: this.id }));
    }
  }

  /** Navigate to home page */
  goHome(): void {
    this.router.navigate(['']);
  }
}
