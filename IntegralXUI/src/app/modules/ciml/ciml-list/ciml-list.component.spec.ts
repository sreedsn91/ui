import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimlListComponent } from './ciml-list.component';

describe('CimlListComponent', () => {
  let component: CimlListComponent;
  let fixture: ComponentFixture<CimlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CimlListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
