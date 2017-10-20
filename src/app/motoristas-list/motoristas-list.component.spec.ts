import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristasListComponent } from './motoristas-list.component';

describe('MotoristasListComponent', () => {
  let component: MotoristasListComponent;
  let fixture: ComponentFixture<MotoristasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoristasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
