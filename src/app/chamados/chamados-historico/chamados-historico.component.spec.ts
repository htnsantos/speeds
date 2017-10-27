import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosHistoricoComponent } from './chamados-historico.component';

describe('ChamadosHistoricoComponent', () => {
  let component: ChamadosHistoricoComponent;
  let fixture: ComponentFixture<ChamadosHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
