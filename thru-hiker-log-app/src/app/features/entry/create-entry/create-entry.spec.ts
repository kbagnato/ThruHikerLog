import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntry } from './create-entry';

describe('CreateEntry', () => {
  let component: CreateEntry;
  let fixture: ComponentFixture<CreateEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
