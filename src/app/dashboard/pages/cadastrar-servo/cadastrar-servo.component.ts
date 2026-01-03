import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';
import { LoaderService } from '../../../shared/loader.service';
import { ActivatedRoute } from '@angular/router';

interface Servo {
  nome: string;
  nomusu: string;
  email: string;
  senha: string;
  confirmaSenha: string;
  grupoOracao: string;
  cpf: string;
  cep: string;
  cidade: string;
  contato: string;
  ativo: number;
  ministerios: string[];
  nvaId: number;
}

interface Cidade {
  label: string;
  value: string;
}

enum Status {
  Ativo = 1,
  Inativo = 2
}

enum NivelAcesso {
  Desenvolvedor = 0,
  Diretoria = 1,
  CoordenadorGO = 2,
  CoordenadorMinisterio = 3,
  Servo = 4
}

const NIVEIS_ACESSO_OPCOES = [
  { label: 'Coordenador de GO(J)', value: NivelAcesso.CoordenadorGO },
  { label: 'Coordenador de Ministério', value: NivelAcesso.CoordenadorMinisterio },
  { label: 'Servo (a)', value: NivelAcesso.Servo }
];

@Component({
  selector: 'app-cadastrar-servo',
  templateUrl: './cadastrar-servo.component.html',
  styleUrl: './cadastrar-servo.component.scss',
  standalone: false,
})
export class CadastrarServoComponent {
  Status = Status;
  usuarioLogado: any = null;
  grupoOracaoBloqueado = false;
  ministerioBloqueado = false;
  NivelAcesso = NivelAcesso;
  NIVEIS_ACESSO_OPCOES = NIVEIS_ACESSO_OPCOES;

  servo: Servo = {
    nome: '',
    nomusu: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    grupoOracao: '',
    cpf: '',
    cep: '',
    cidade: '',
    contato: '',
    ativo: Status.Ativo,
    ministerios: [],
    nvaId: NivelAcesso.Servo
  };

  ministerios: string[] = [
    'Ministério Jovem',
    'Ministério da Criança e Adolescente',
    'Ministério de Pregação',
    'Ministério de Intercessão',
    'Ministério de Cura e Libertação',
    'Ministério de Música e Artes',
    'Ministério de Comunicação',
    'Ministério de Fé e Política',
    'Ministério de Promoção Humana',
    'Ministério de Missões',
    'Ministério de Seminaristas',
    'Ministérios das Famílias',
    'Ministério Universidades Renovadas',
    'Ministério de Profissionais do Reino'
  ];

  cidades: Cidade[] = [];
  isCadastro: boolean = true;
  usrCodigo: number = 0;

  constructor(private apiService: ApiService, private modalService: ModalService, private loaderService: LoaderService, private route: ActivatedRoute) {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
      if (this.usuarioLogado.nivel === 2) {
        this.grupoOracaoBloqueado = true;
        this.servo.grupoOracao = this.usuarioLogado.grupoOracao;
      }
      if (this.usuarioLogado.nivel === 3) {
        this.ministerioBloqueado = true;
        this.servo.ministerios = Array.isArray(this.usuarioLogado.ministerios)
          ? this.usuarioLogado.ministerios
          : [this.usuarioLogado.ministerios];
      }
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');

    if (id) {
      if (this.usuarioLogado) {
        if (this.usuarioLogado.nivel === 2) {
          this.grupoOracaoBloqueado = true;
          this.servo.grupoOracao = this.usuarioLogado.grupoOracao;
        }
        if (this.usuarioLogado.nivel === 3) {
          this.ministerioBloqueado = true;
          this.servo.ministerios = Array.isArray(this.usuarioLogado.ministerios)
            ? this.usuarioLogado.ministerios
            : [this.usuarioLogado.ministerio];
        }
      }

      this.isCadastro = false;
      this.usrCodigo = parseInt(id, 10);
      this.loaderService.exibir();
      this.apiService.get<any>(`/user/${id}`).subscribe({
        next: (data) => {
          this.servo = {
            nome: data.usrNome || '',
            nomusu: data.usrLogin || '',
            email: data.usrEmail || '',
            senha: '',
            confirmaSenha: '',
            grupoOracao: data.usrGrupoOracao || '',
            cpf: data.usrCpf || '',
            cep: data.usrCep || '',
            cidade: data.usrCidade || '',
            contato: data.usrContato || '',
            ativo: data.usrAtivo || Status.Ativo,
            ministerios: data.ministerios || [],
            nvaId: data.nvaId || NivelAcesso.Servo
          };
          this.cidades = data.usrCidade ? [{ label: data.usrCidade, value: data.usrCidade }] : [];
          this.loaderService.esconder();
        },
        error: () => {
          this.modalService.erro('Erro', 'Não foi possível carregar os dados do usuário.');
          this.loaderService.esconder();
        }
      });
    } else {
      this.servo.ativo = Status.Ativo;
    }
  }

  async cadastrarServo() {
    if (this.servo.senha.length == 0) {
      this.modalService.erro('Erro', 'A senha é obrigatória!');
      return;
    }

    if (this.servo.senha !== this.servo.confirmaSenha) {
      this.modalService.erro('Erro', 'As senhas não conferem!');
      return;
    }

    const formData = {
      usrNome: this.servo.nome,
      usrEmail: this.servo.email,
      usrSenha: this.servo.senha,
      usrLogin: this.servo.nomusu,
      nvaId: this.servo.nvaId ?? NivelAcesso.Servo,
      grupoOracao: this.servo.grupoOracao,
      cidade: this.servo.cidade,
      cep: this.servo.cep.replace(/\D/g, '') || null,
      contato: this.servo.contato,
      cpf: this.servo.cpf.replace(/\D/g, ''),
      ministerios: this.servo.ministerios,
      usrAtivo : this.servo.ativo
    };

    if (!formData.usrNome || !formData.cpf || !formData.cidade || !formData.cep || !formData.contato || !formData.usrEmail || !formData.usrLogin || !formData.usrSenha) {
      this.modalService.aviso('Atenção', 'Todos os campos são obrigatórios.');
      return;
    }

    this.loaderService.exibir();

    if (!this.isCadastro) {
      // Edição
      this.apiService.put(`/user/${this.usrCodigo}`, formData).subscribe({
        next: (result: any) => {
          this.modalService.sucesso('Sucesso', result.message || 'Servo atualizado com sucesso!');
          this.loaderService.esconder();
        },
        error: (error) => {
          const msg = error?.error?.message || error?.error?.error || 'Erro ao atualizar servo.';
          this.modalService.erro('Erro', msg);
          this.loaderService.esconder();
        }
      });
    } else {
      // Cadastro novo
      this.apiService.post('/user', formData).subscribe({
        next: (result: any) => {
          this.modalService.sucesso('Sucesso', result.message || 'Servo cadastrado com sucesso!');
          this.resetForm();
          this.loaderService.esconder();
        },
        error: (error) => {
          const msg = error?.error?.message || error?.error?.error || 'Erro ao cadastrar servo.';
          this.modalService.erro('Erro', msg);
          this.loaderService.esconder();
        }
      });
    }
  }

  atualizarCidade(dados: any) {
    this.servo.cidade = dados.cidade;
    this.cidades = dados.cidade ? [{ label: dados.cidade, value: dados.cidade }] : [];
  }

  resetForm() {
    this.servo = {
      nome: '',
      nomusu: '',
      email: '',
      senha: '',
      confirmaSenha: '',
      grupoOracao: '',
      cpf: '',
      cep: '',
      cidade: '',
      contato: '',
      ativo: Status.Ativo,
      ministerios: [],
      nvaId: NivelAcesso.Servo
    };
    this.cidades = [];
  }
}
