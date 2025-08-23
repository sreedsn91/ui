import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAddComponent } from './system-add.component';

describe('SystemAddComponent', () => {
  let component: SystemAddComponent;
  let fixture: ComponentFixture<SystemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
