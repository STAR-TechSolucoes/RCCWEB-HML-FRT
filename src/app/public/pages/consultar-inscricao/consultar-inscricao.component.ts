import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LoaderService } from '../../../shared/loader.service';

@Component({
  selector: 'app-consultar-inscricao',
  standalone: false,
  templateUrl: './consultar-inscricao.component.html',
  styleUrl: './consultar-inscricao.component.scss'
})
export class ConsultarInscricaoComponent {
  cpfConsulta: string = '';
  inscricoes: any[] = [];
  buscou: boolean = false;

  constructor(private api: ApiService, private loader: LoaderService) {}

  consultar() {
    if (this.cpfConsulta.length < 14) return;
    console.log('Consultando CPF:', this.cpfConsulta);
    this.loader.exibir();
    const cpfLimpo = this.cpfConsulta.replace(/\D/g, '');

    this.api.get<any[]>(`/public/consultar-inscricao/${cpfLimpo}`).subscribe({
      next: (res) => {
        this.inscricoes = res;
        this.buscou = true;
        this.loader.esconder();
      },
      error: (err) => {
        this.inscricoes = [];
        this.buscou = true;
        this.loader.esconder();
        alert(err.error?.message || 'Erro ao buscar dados.');
      }
    });
  }
}
