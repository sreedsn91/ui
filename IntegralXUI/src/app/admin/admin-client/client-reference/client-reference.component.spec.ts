import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReferenceComponent } from './client-reference.component';

describe('ClientReferenceComponent', () => {
  let component: ClientReferenceComponent;
  let fixture: ComponentFixture<ClientReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
