import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from '../../../services/api.service';
import { LoaderService } from '../../../shared/loader.service';

@Component({
  selector: 'app-listar-inscritos',
  standalone: false,
  templateUrl: './listar-inscritos.component.html',
  styleUrl: './listar-inscritos.component.scss'
})

export class ListarInscritosComponent implements OnInit {
  inscritos: any[] = [];
  eventoId!: number;
  filtroNome: string = '';
  inscritosFiltrados: any[] = [];
  totalPresentes = 0;
  totalArrecadado = 0;

  constructor(private route: ActivatedRoute, private api: ApiService, private loader: LoaderService) {}

  ngOnInit() {
      this.eventoId = Number(this.route.snapshot.paramMap.get('id'));
      this.carregarInscritos();
    }

  carregarInscritos() {
    this.loader.exibir();
    this.api.get<any[]>(`/inscricoes/evento/${this.eventoId}`).subscribe({
      next: (res) => {
        this.inscritos = res;
        this.inscritosFiltrados = res;
        this.calcularResumo();
        this.loader.esconder();
      },
      error: () => this.loader.esconder()
    });
  }

  calcularResumo() {
    this.totalPresentes = this.inscritos.filter(i => i.incCompareceu === 'S').length;
    this.totalArrecadado = this.inscritos.reduce((acc, curr) => acc + (Number(curr.evtValorPago) || 0), 0);
  }

  filtrar() {
    const termo = this.filtroNome.toLowerCase();
    this.inscritosFiltrados = this.inscritos.filter(i => 
      i.ptcNome.toLowerCase().includes(termo) || 
      i.ptcEmail.toLowerCase().includes(termo)
    );
  }

  alterarPresenca(inscrito: any) {
  const novoStatus = inscrito.incCompareceu === 'S' ? 'N' : 'S';
  
  this.api.put(`/inscricoes/${inscrito.incId}`, { 
    evtCompareceu: novoStatus,
    evtValorPago: inscrito.evtValorPago
  }).subscribe({
    next: () => {
      inscrito.incCompareceu = novoStatus; 
    },
    error: () => alert('Erro ao atualizar presença')
  });
  this.calcularResumo();
}

  getLabels(respostas: any) {
    return Object.keys(respostas || {});
  }
}
