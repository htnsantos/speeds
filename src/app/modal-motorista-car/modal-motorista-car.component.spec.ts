import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotoristaCarComponent } from './modal-motorista-car.component';

describe('ModalMotoristaCarComponent', () => {
  let component: ModalMotoristaCarComponent;
  let fixture: ComponentFixture<ModalMotoristaCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMotoristaCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMotoristaCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
