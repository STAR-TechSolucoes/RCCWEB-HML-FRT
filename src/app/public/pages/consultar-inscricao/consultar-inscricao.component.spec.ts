import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInscricaoComponent } from './consultar-inscricao.component';

describe('ConsultarInscricaoComponent', () => {
  let component: ConsultarInscricaoComponent;
  let fixture: ComponentFixture<ConsultarInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
