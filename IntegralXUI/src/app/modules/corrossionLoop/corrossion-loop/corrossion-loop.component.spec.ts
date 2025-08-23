import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrossionLoopComponent } from './corrossion-loop.component';

describe('CorrossionLoopComponent', () => {
  let component: CorrossionLoopComponent;
  let fixture: ComponentFixture<CorrossionLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrossionLoopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrossionLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
