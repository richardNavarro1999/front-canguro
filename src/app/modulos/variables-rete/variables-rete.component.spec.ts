import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesReteComponent } from './variables-rete.component';

describe('VariablesReteComponent', () => {
  let component: VariablesReteComponent;
  let fixture: ComponentFixture<VariablesReteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablesReteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesReteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
