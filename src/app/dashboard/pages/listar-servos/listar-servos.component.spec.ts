import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServosComponent } from './listar-servos.component';

describe('ListarServosComponent', () => {
  let component: ListarServosComponent;
  let fixture: ComponentFixture<ListarServosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarServosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarServosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
