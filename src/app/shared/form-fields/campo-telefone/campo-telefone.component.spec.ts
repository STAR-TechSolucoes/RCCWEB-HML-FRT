import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTelefoneComponent } from './campo-telefone.component';

describe('CampoTelefoneComponent', () => {
  let component: CampoTelefoneComponent;
  let fixture: ComponentFixture<CampoTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoTelefoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
