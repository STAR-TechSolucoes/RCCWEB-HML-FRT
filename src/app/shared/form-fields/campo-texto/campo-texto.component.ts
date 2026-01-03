import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campo-texto',
  templateUrl: './campo-texto.component.html',
  styleUrls: ['./campo-texto.component.scss'],
  standalone: false,
})
export class CampoTextoComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() readonly = false;
  @Input() maxLength: number | null = null;
  @Input() value: any = '';
  @Input() disabled = false;
  @Input() apenasNumeros: boolean = false;


  @Output() valueChange = new EventEmitter<any>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let valor = target.value;

    if (this.apenasNumeros) {
      valor = valor.replace(/\D/g, '');
      target.value = valor;
    }

    this.value = valor;
    this.valueChange.emit(this.value);
  }
}
