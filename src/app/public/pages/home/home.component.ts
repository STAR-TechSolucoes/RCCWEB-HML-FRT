import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

// Defina uma Interface para ter Autocomplete e Segurança
export interface Evento {
  evtId: number;
  evtNome: string;
  evtDescricao: string;
  evtCidade: string;
  evtDataHoraInicio: string;
  evtImagem?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  loading: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchEventos();
  }

  fetchEventos() {
    this.loading = true;
    this.api.get<Evento[]>('/public/eventos').subscribe({
      next: (res) => {
        this.eventos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar eventos', err);
        this.loading = false;
      }
    });
  }
}