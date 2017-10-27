import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosRecusadosComponent } from './chamados-recusados.component';

describe('ChamadosRecusadosComponent', () => {
  let component: ChamadosRecusadosComponent;
  let fixture: ComponentFixture<ChamadosRecusadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosRecusadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosRecusadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
