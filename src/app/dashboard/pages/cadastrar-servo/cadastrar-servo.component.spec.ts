import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarServoComponent } from './cadastrar-servo.component';

describe('CadastrarServoComponent', () => {
  let component: CadastrarServoComponent;
  let fixture: ComponentFixture<CadastrarServoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarServoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarServoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
