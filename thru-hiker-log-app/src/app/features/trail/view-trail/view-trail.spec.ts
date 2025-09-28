import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrail } from './view-trail';

describe('ViewTrail', () => {
  let component: ViewTrail;
  let fixture: ComponentFixture<ViewTrail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTrail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
