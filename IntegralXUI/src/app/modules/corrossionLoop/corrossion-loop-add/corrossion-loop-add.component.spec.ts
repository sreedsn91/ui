import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrossionLoopAddComponent } from './corrossion-loop-add.component';

describe('CorrossionLoopAddComponent', () => {
  let component: CorrossionLoopAddComponent;
  let fixture: ComponentFixture<CorrossionLoopAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrossionLoopAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrossionLoopAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
