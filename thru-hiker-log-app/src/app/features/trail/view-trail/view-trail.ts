import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrail } from '../../../models/trail';
import { TrailActions } from '../../../state';
import { selectTrailDetails } from '../../../state/trail/trail.selectors';

@Component({
  selector: 'app-view-trail',
  imports: [CommonModule],
  templateUrl: './view-trail.html',
  styleUrl: './view-trail.css',
})
export class ViewTrail {
  public trail$?: Observable<ITrail | null>;
  private id: number | null = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.trail$ = this.store.select(selectTrailDetails);
    this.id = this.route.snapshot.params['trailId'];
    if (this.id) {
      this.store.dispatch(TrailActions.loadTrailDetails({ id: this.id }));
    }
  }

  /**
   * Navigate to home page
   */
  goHome(): void {
    this.router.navigate(['']);
  }

  /** Navigate to add entry page for the selected trail */
  goToAddEntry() {
    this.router.navigate(['trail', this.id!, 'add-entry']);
  }

  /** Navigate to edit entry page for the selected trail and entry */
  goToEditEntry(entryId: number) {
    this.router.navigate(['trail', this.id!, 'entry', entryId]);
  }

  /** Navigate to edit trail page for the selected trail */
  goToEditTrail() {
    this.router.navigate(['trail', this.id, 'edit']);
  }

  /** Delete an entry */
  deleteEntry(entryId: number) {
    alert('delete entry - todo');
  }
}
