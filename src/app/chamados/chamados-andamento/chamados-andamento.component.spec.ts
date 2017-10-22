import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosAndamentoComponent } from './chamados-andamento.component';

describe('ChamadosAndamentoComponent', () => {
  let component: ChamadosAndamentoComponent;
  let fixture: ComponentFixture<ChamadosAndamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosAndamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosAndamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
