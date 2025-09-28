import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrail } from '../../models/trail';
import { TrailActions } from '../../state';
import { selectAllTrails } from '../../state/trail/trail.selectors';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public trails$?: Observable<ITrail[] | null>;
  public selectedTrailId: number | null = null;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.trails$ = this.store.select(selectAllTrails);
    this.store.dispatch(TrailActions.loadTrails());
  }

  /** Redirect to create page */
  onCreate(): void {
    this.router.navigate(['/trail/create']);
  }

  /** Toggle selected trail id */
  toggleDropdown(trailId: number) {
    this.selectedTrailId = this.selectedTrailId === trailId ? null : trailId;
  }

  /** Navigate to edit page for the selected trail */
  editTrail(trail: ITrail): void {
    this.selectedTrailId = null;
    this.router.navigate(['/trail', trail.id]);
  }

  /** Placeholder for delete action */
  deleteTrail(trail: ITrail) {
    this.selectedTrailId = null;
    alert('you wanna delete ' + trail.name + '?');
  }
}
