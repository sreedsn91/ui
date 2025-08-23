import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitAddComponent } from './circuit-add.component';

describe('CircuitAddComponent', () => {
  let component: CircuitAddComponent;
  let fixture: ComponentFixture<CircuitAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
