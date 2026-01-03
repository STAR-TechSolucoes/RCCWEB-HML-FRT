import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campo-telefone',
  templateUrl: './campo-telefone.component.html',
  styleUrls: ['./campo-telefone.component.scss'],
  standalone: false,
})
export class CampoTelefoneComponent {
  @Input() value = '';
  @Input() required = false;
  @Output() valueChange = new EventEmitter<string>();

  formatarTelefone() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length < 11)
      valor = valor.replace(/(\d{5})(\d{0,4})/, '$1-$2');
    else
      valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    this.value = valor;
    this.valueChange.emit(this.value);
  }
}
