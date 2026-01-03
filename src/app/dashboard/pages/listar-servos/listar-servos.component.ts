import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-listar-servos',
  standalone: false,
  templateUrl: './listar-servos.component.html',
  styleUrl: './listar-servos.component.scss'
})
export class ListarServosComponent implements OnInit {
  servos: any[] = [];
  filteredServos: any[] = [];
  loading = false;
  searchTerm = '';
  campoFiltro = 'nome';
  mostrarInativos = false;

  columns = [
    { key: 'usrNome', label: 'Nome', type: 'text' },
    { key: 'usrCidade', label: 'Cidade', type: 'text' },
    { key: 'usrGrupoOracao', label: 'Grupo de Oração', type: 'text' },
    { key: 'usrContato', label: 'Contato', type: 'phone' },
    { key: 'ministerios', label: 'Ministérios', type: 'array' },
    { key: 'usrAtivo', label: 'Status', type: 'status' }
  ];

  actions = [
    { key: 'edit', icon: 'bi-pencil-fill', label: 'Editar', class: 'btn-outline-primary' },
    { key: 'delete', icon: 'bi-trash-fill', label: 'Excluir', class: 'btn-outline-danger' }
  ];

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.fetchServos();
  }

  onGridAction(event: { key: string, row: any }) {
    if (event.key === 'edit') {
      this.editarServo(event.row.usrId);
    }
    if (event.key === 'delete') {
      this.confirmDelete(event.row.usrId);
    }
  }

  fetchServos() {
    this.loading = true;
    this.apiService.get<any[]>('/user').subscribe({
      next: (data) => {
        this.servos = Array.isArray(data) ? data : [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        const msg =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Erro ao carregar dados. Tente novamente.';
        this.modalService.erro('Erro', msg);
        this.loading = false;
        this.servos = [];
        this.filteredServos = [];
      }
    });
  }

  applyFilters() {
    const termo = (this.searchTerm || '').toLowerCase();

    let filtrados = this.servos.filter(servo =>
      this.mostrarInativos ? true : servo.usrAtivo === 1
    );

    if (!termo) {
      this.filteredServos = [...filtrados];
      return;
    }

    this.filteredServos = filtrados.filter(servo => {
      switch (this.campoFiltro) {
        case 'nome':
          return (servo.usrNome?.toLowerCase() || '').includes(termo);
        case 'cidade':
          return (servo.usrCidade?.toLowerCase() || '').includes(termo);
        case 'grupoOracao':
          return (servo.usrGrupoOracao?.toLowerCase() || '').includes(termo);
        case 'contato':
          return ((servo.usrContato || '').replace(/\D/g, '')).includes(termo.replace(/\D/g, ''));
        case 'ministerios':
          if (Array.isArray(servo.ministerios)) {
            return servo.ministerios.join(' ').toLowerCase().includes(termo);
          }
          return (servo.ministerios || '').toLowerCase().includes(termo);
        default:
          return false;
      }
    });
  }

  mascaraTelefone(valor: string): string {
    if (!valor) return '';
    valor = valor.replace(/\D/g, '');
    if (valor.length === 11) {
      return valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length === 10) {
      return valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return valor;
  }

  editarServo(id: number) {
    this.router.navigate(['/dashboard/cadastrar-servo'], {
      queryParams: { id }
    });
  }

  confirmDelete(id: number) {
    if (confirm('Deseja realmente excluir este servo?')) {
      alert('Funcionalidade de exclusão não implementada.');
    }
  }
}
