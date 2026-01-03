import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoCidadeComponent } from './campo-cidade.component';

describe('CampoCidadeComponent', () => {
  let component: CampoCidadeComponent;
  let fixture: ComponentFixture<CampoCidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoCidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
