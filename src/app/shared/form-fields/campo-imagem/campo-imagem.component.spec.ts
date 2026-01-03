import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoImagemComponent } from './campo-imagem.component';

describe('CampoImagemComponent', () => {
  let component: CampoImagemComponent;
  let fixture: ComponentFixture<CampoImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoImagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
