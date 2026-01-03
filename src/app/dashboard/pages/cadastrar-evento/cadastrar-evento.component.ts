import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';
import { LoaderService } from '../../../shared/loader.service';

interface Evento {
  nome: string;
  descricao: string;
  qtdMaximaInscritos: number;
  logradouro: string;
  numero: number;
  bairro: string;
  cep: string;
  cidade: string;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  imagemBase64: string;
  observacoes: string;
}

interface Cidade {
  label: string;
  value: string;
}

@Component({
  selector: 'app-cadastrar-evento',
  standalone: false,
  templateUrl: './cadastrar-evento.component.html',
  styleUrl: './cadastrar-evento.component.scss'
})
export class CadastrarEventoComponent {

  constructor(private apiService: ApiService, private modalService: ModalService, private loaderService: LoaderService) { }

  evento: Evento = {
    nome: '',
    descricao: '',
    qtdMaximaInscritos: 0,
    logradouro: '',
    numero: 0,
    bairro: '',
    cep: '',
    cidade: '',
    dataHoraInicio: new Date(),
    dataHoraFim: new Date(),
    imagemBase64: '',
    observacoes: ''
  };

  cidades: Cidade[] = [];

  atualizarCidade(dados: any) {
    if (typeof dados === 'string') {
      this.evento.cidade = dados;
    } else {
      this.evento.cidade = dados.cidade;
      this.evento.logradouro = dados.logradouro;
      this.evento.bairro = dados.bairro;
      this.cidades = [{ label: dados.cidade, value: dados.cidade }];
    }
  }
}
