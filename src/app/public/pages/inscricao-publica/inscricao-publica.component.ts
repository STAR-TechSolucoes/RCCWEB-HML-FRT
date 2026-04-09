import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-inscricao-publica',
  standalone: false,
  templateUrl: './inscricao-publica.component.html',
  styleUrl: './inscricao-publica.component.scss'
})
export class InscricaoPublicaComponent implements OnInit {
  evento: any;

  ptcNome: string = '';
  ptcCpf: string = '';
  ptcEmail: string = '';
  ptcDataNascimento: string = '';

  respostasDinamicas: any = {}; 

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private modal: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get<any>(`/public/eventos/${id}`).subscribe(res => {
      this.evento = res;
    });
  }

  confirmarInscricao() {

    const payload = {
      evtId: this.evento.evtId,
      ptcNome: this.ptcNome,
      ptcCpf: this.ptcCpf,
      ptcEmail: this.ptcEmail,
      ptcDataNascimento: this.ptcDataNascimento,
      incRespostas: this.respostasDinamicas
    };

    if (!this.ptcNome || !this.ptcCpf) {
      alert('Por favor, preencha seu nome e CPF.');
      return;
    }

    this.api.post('/public/inscrever', payload).subscribe({
            next: (res: any) => {
                this.modal.sucesso('Sucesso!', 'Sua inscrição foi confirmada.');
                
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 2000);
            },
            error: (err) => {
                this.modal.erro('Erro', err.error?.message || 'Falha na inscrição');
            }
        });
  }
}