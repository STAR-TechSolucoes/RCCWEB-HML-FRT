import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoCpfComponent } from './campo-cpf.component';

describe('CampoCpfComponent', () => {
  let component: CampoCpfComponent;
  let fixture: ComponentFixture<CampoCpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoCpfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
