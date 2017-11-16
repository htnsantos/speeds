import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaChamadosDetalhesComponent } from './consulta-chamados-detalhes.component';

describe('ConsultaChamadosDetalhesComponent', () => {
  let component: ConsultaChamadosDetalhesComponent;
  let fixture: ComponentFixture<ConsultaChamadosDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaChamadosDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaChamadosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
