import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitEditComponent } from './circuit-edit.component';

describe('CircuitEditComponent', () => {
  let component: CircuitEditComponent;
  let fixture: ComponentFixture<CircuitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
