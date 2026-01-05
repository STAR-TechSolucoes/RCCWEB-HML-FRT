import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';
import { LoaderService } from '../../../shared/loader.service';
import { Router } from '@angular/router';

interface Evento {
  evtId: number;
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
  evtImagem: string;
}

@Component({
  selector: 'app-listar-eventos',
  standalone: false,
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.scss'
})
export class ListarEventosComponent implements OnInit {
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  filtro: string = '';

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarEventos();
  }

    editarEvento(id: number) {
      this.router.navigate(['/dashboard/cadastrar-evento'], {
        queryParams: { id }
      });
    } 

  carregarEventos() {
    this.loaderService.exibir();
    this.apiService.get<Evento[]>('/eventos').subscribe({
      next: (dados) => {
        this.eventos = dados;
        this.eventosFiltrados = dados;
        this.loaderService.esconder();
      },
      error: (err) => {
        this.loaderService.esconder();
        console.error('Erro ao carregar eventos:', err);
        this.modalService.erro('Erro', 'Não foi possível carregar a lista de eventos.');
      }
    });
  }

  filtrar() {
    const termo = this.filtro.toLowerCase();
    this.eventosFiltrados = this.eventos.filter(e => 
      (e.evtNome && e.evtNome.toLowerCase().includes(termo)) || 
      (e.evtCidade && e.evtCidade.toLowerCase().includes(termo))
    );
  }

  confirmarExclusao(evento: Evento) {
    if (confirm(`Tem certeza que deseja excluir o evento "${evento.evtNome}"?`)) {
      this.excluir(evento.evtId);
    }
  }

  excluir(id: number) {
    this.loaderService.exibir();
    this.apiService.delete<any>(`/eventos/${id}`).subscribe({
      next: () => {
        this.loaderService.esconder();
        this.modalService.sucesso('Excluído', 'Evento removido com sucesso.');
        this.carregarEventos();
      },
      error: (err) => {
        this.loaderService.esconder();
        this.modalService.erro('Erro', 'Erro ao excluir o evento.');
      }
    });
  }
}