import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimlAddComponent } from './ciml-add.component';

describe('CimlAddComponent', () => {
  let component: CimlAddComponent;
  let fixture: ComponentFixture<CimlAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CimlAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimlAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
