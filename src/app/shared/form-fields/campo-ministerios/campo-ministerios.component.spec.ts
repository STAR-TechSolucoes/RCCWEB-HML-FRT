import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoMinisteriosComponent } from './campo-ministerios.component';

describe('CampoMinisteriosComponent', () => {
  let component: CampoMinisteriosComponent;
  let fixture: ComponentFixture<CampoMinisteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoMinisteriosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoMinisteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
