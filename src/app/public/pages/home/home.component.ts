import { Component, HostListener, OnInit } from '@angular/core';
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

  isMenuOpen = false; 

  constructor(private api: ApiService) {}

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.nav-item.dropdown')) {
      this.isMenuOpen = false;
    }
  }

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