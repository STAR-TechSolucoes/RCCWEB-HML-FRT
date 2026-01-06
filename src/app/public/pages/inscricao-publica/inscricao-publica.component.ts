import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-inscricao-publica',
  standalone: false,
  templateUrl: './inscricao-publica.component.html',
  styleUrl: './inscricao-publica.component.scss'
})
export class InscricaoPublicaComponent implements OnInit {
  evento: any;
  respostas: any = {}; // Objeto que vai guardar os campos dinâmicos

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // Chamando a nova rota pública que você criou no passo 3
    this.api.get<any>(`/public/eventos/${id}`).subscribe(res => {
      this.evento = res;
    });
  }

  confirmarInscricao() {
    const payload = {
      evtId: this.evento.evtId,
      // Aqui enviamos as respostas que o usuário preencheu no formulário dinâmico
      respostas: this.respostas 
    };
    
    this.api.post('/public/inscrever', payload).subscribe({
      next: () => alert('Inscrição realizada com sucesso!'),
      error: () => alert('Erro ao realizar inscrição.')
    });
  }
}