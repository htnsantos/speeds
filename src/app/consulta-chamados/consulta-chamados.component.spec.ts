import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaChamadosComponent } from './consulta-chamados.component';

describe('ConsultaChamadosComponent', () => {
  let component: ConsultaChamadosComponent;
  let fixture: ComponentFixture<ConsultaChamadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaChamadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
