import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragfieldComponent } from './dragfield.component';

describe('DragfieldComponent', () => {
  let component: DragfieldComponent;
  let fixture: ComponentFixture<DragfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
