import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsInputComponent } from './objects-input.component';

describe('ObjectsInputComponent', () => {
  let component: ObjectsInputComponent;
  let fixture: ComponentFixture<ObjectsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
