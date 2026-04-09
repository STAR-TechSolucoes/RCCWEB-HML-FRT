import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInscritosComponent } from './listar-inscritos.component';

describe('ListarInscritosComponent', () => {
  let component: ListarInscritosComponent;
  let fixture: ComponentFixture<ListarInscritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarInscritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
