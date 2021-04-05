import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvtReteComponent } from './uvt-rete.component';

describe('UvtReteComponent', () => {
  let component: UvtReteComponent;
  let fixture: ComponentFixture<UvtReteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvtReteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvtReteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
