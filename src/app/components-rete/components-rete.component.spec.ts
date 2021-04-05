import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsReteComponent } from './components-rete.component';

describe('ComponentsReteComponent', () => {
  let component: ComponentsReteComponent;
  let fixture: ComponentFixture<ComponentsReteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsReteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsReteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
