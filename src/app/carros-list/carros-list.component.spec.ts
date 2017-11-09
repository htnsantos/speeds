import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosListComponent } from './carros-list.component';

describe('CarrosListComponent', () => {
  let component: CarrosListComponent;
  let fixture: ComponentFixture<CarrosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
