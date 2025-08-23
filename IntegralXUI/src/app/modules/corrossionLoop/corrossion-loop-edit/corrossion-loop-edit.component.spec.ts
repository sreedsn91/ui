import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrossionLoopEditComponent } from './corrossion-loop-edit.component';

describe('CorrossionLoopEditComponent', () => {
  let component: CorrossionLoopEditComponent;
  let fixture: ComponentFixture<CorrossionLoopEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrossionLoopEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrossionLoopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
