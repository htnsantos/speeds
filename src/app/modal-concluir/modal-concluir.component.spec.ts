import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConcluirComponent } from './modal-concluir.component';

describe('ModalConcluirComponent', () => {
  let component: ModalConcluirComponent;
  let fixture: ComponentFixture<ModalConcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
