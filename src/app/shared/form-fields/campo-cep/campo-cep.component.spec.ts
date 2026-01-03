import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoCepComponent } from './campo-cep.component';

describe('CampoCepComponent', () => {
  let component: CampoCepComponent;
  let fixture: ComponentFixture<CampoCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoCepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
