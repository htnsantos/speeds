import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarServicosComponent } from './modal-cadastrar-servicos.component';

describe('ModalCadastrarServicosComponent', () => {
  let component: ModalCadastrarServicosComponent;
  let fixture: ComponentFixture<ModalCadastrarServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastrarServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastrarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
