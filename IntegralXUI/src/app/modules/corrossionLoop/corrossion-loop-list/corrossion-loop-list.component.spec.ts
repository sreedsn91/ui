import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrossionLoopListComponent } from './corrossion-loop-list.component';

describe('CorrossionLoopListComponent', () => {
  let component: CorrossionLoopListComponent;
  let fixture: ComponentFixture<CorrossionLoopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrossionLoopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrossionLoopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
