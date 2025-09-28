import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrail } from './edit-trail';

describe('EditTrail', () => {
  let component: EditTrail;
  let fixture: ComponentFixture<EditTrail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
