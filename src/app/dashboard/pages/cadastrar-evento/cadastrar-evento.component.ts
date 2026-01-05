import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';
import { LoaderService } from '../../../shared/loader.service';

interface Evento {
  evtId?: number;
  evtNome: string;
  evtDescricao: string;
  evtQtdMaxInscritos: number;
  evtLogradouro: string;
  evtNumero: string;
  evtBairro: string;
  evtCep: string;
  evtCidade: string;
  evtDataHoraInicio: string;
  evtDataHoraFim: string;
  evtObs: string;
  evtImagem: string; // ALTERADO: Agora bate com o banco de dados
}

@Component({
  selector: 'app-cadastrar-evento',
  standalone: false,
  templateUrl: './cadastrar-evento.component.html',
  styleUrl: './cadastrar-evento.component.scss'
})
export class CadastrarEventoComponent implements OnInit {
  cidades: any[] = [];
  evento: Evento = this.getNovoEvento();
  modoEdicao = false;

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.carregarEvento(Number(id));
    }
  }

  carregarEvento(id: number) {
    this.loaderService.exibir();
    this.apiService.get<any>(`/eventos/${id}`).subscribe({
      next: (res) => {
        this.loaderService.esconder();
        // Como o banco retorna 'evtImagem' e nossa interface agora é 'evtImagem',
        // o spread operator (...) funciona perfeitamente sem mapeamento manual.
        this.evento = { ...res };
        
        if (this.evento.evtCidade) {
          this.cidades = [{ label: this.evento.evtCidade, value: this.evento.evtCidade }];
        }
      },
      error: () => {
        this.loaderService.esconder();
        this.modalService.erro('Erro', 'Não foi possível carregar os dados do evento.');
      }
    });
  }

  private getNovoEvento(): Evento {
    return {
      evtNome: '', evtDescricao: '', evtQtdMaxInscritos: 0,
      evtLogradouro: '', evtNumero: '', evtBairro: '',
      evtCep: '', evtCidade: '', evtDataHoraInicio: '',
      evtDataHoraFim: '', evtObs: '', evtImagem: '' // Inicializado vazio
    };
  }

  atualizarCidade(dados: any) {
    if (typeof dados === 'string') {
      this.evento.evtCidade = dados;
    } else {
      this.evento.evtCidade = `${dados.localidade || dados.cidade} - ${dados.uf || ''}`;
      this.evento.evtLogradouro = dados.logradouro || '';
      this.evento.evtBairro = dados.bairro || '';
      this.evento.evtCep = dados.cep || this.evento.evtCep;
      this.cidades = [{ label: this.evento.evtCidade, value: this.evento.evtCidade }];
    }
  }

  cadastrar(form: NgForm) {
    if (!this.evento.evtNome || !this.evento.evtDataHoraInicio) {
      this.modalService.aviso('Atenção', 'Preencha os campos obrigatórios.');
      return;
    }

    this.loaderService.exibir();

    // Payload simplificado: enviamos o objeto evento completo
    const payload = {
      ...this.evento,
      evtQtdMaxInscritos: Number(this.evento.evtQtdMaxInscritos)
    };

    const request = this.modoEdicao 
      ? this.apiService.put<any>(`/eventos/${this.evento.evtId}`, payload)
      : this.apiService.post<any>('/eventos', payload);

    request.subscribe({
      next: () => {
        this.loaderService.esconder();
        this.modalService.sucesso('Sucesso', this.modoEdicao ? 'Evento atualizado!' : 'Evento criado!');
        this.router.navigate(['/dashboard/listar-eventos']);
      },
      error: (err) => {
        this.loaderService.esconder();
        this.modalService.erro('Erro', err.error?.message || 'Erro ao salvar.');
      }
    });
  }
}