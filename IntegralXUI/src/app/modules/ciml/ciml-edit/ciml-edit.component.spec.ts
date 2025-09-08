import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimlEditComponent } from './ciml-edit.component';

describe('CimlEditComponent', () => {
  let component: CimlEditComponent;
  let fixture: ComponentFixture<CimlEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CimlEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
