import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimlComponent } from './ciml.component';

describe('CimlComponent', () => {
  let component: CimlComponent;
  let fixture: ComponentFixture<CimlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CimlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
