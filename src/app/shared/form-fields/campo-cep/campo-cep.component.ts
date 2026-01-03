import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-campo-cep',
  templateUrl: './campo-cep.component.html',
  styleUrls: ['./campo-cep.component.scss'],
  standalone: false,
})
export class CampoCepComponent {
  @Input() value = '';
  @Input() required = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() cidadeEncontrada = new EventEmitter<any>();

  constructor(private ngZone: NgZone, private modalService: ModalService) {}

  // dispara sempre que digita
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let cep = input.value.replace(/\D/g, '');

    if (cep.length > 8) cep = cep.substring(0, 8);

    // aplica a máscara
    if (cep.length > 5) {
      this.value = cep.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    } else {
      this.value = cep;
    }

    this.valueChange.emit(this.value);

    if (cep.length === 8) {
      this.buscarCidade(cep);
    } else {
      this.cidadeEncontrada.emit('');
    }
  }

  limpar() {
    this.value = '';
    this.valueChange.emit('');
    this.cidadeEncontrada.emit('');
  }

  private buscarCidade(cepDigits: string) {
    fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
      .then(res => res.json())
      .then(data => {
        this.ngZone.run(() => {
          if (!data?.erro) {
            const cidade = `${data.localidade} - ${data.uf}`;
            const logradouro = data.logradouro || '';
            const bairro = data.bairro || '';
            this.cidadeEncontrada.emit({cidade, logradouro, bairro});
          } else {
            this.cidadeEncontrada.emit('');
            this.modalService.erro('Erro', 'CEP não localizado.');
          }
        });
      })
      .catch(() => {
        this.ngZone.run(() => this.cidadeEncontrada.emit(''));
        this.modalService.erro('Erro', 'Não foi possível buscar a cidade para o CEP informado.');
      });
  }
}
