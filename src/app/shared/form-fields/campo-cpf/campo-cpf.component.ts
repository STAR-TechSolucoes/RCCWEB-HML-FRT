import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campo-cpf',
  templateUrl: './campo-cpf.component.html',
  styleUrls: ['./campo-cpf.component.scss'],
  standalone: false,
})
export class CampoCpfComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() required = false;

  formatarCpf() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.value = valor;
    this.valueChange.emit(this.value);
  }
}
