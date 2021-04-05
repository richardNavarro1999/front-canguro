import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesReteComponent } from './novedades-rete.component';

describe('NovedadesReteComponent', () => {
  let component: NovedadesReteComponent;
  let fixture: ComponentFixture<NovedadesReteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesReteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesReteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
