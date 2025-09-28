import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Spinner } from "./features/spinner/spinner";
import { selectIsSpinning } from './state/core/core.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public isSpinning$?: Observable<boolean>;
  protected readonly title = signal('thru-hiker-log-app');

  constructor(
    private coreStore: Store
  ) { }

  ngOnInit() {
    this.isSpinning$ = this.coreStore.select(selectIsSpinning)
  }
}
