import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoPublicaComponent } from './inscricao-publica.component';

describe('InscricaoPublicaComponent', () => {
  let component: InscricaoPublicaComponent;
  let fixture: ComponentFixture<InscricaoPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscricaoPublicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscricaoPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
