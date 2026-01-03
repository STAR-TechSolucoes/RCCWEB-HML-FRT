import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../shared/loader.service';
import { ModalService } from '../../shared/modal.service';

interface LoginData {
  usrLogin: string;
  usrSenha: string;
}

interface RegisterData {
  usrNome: string;
  usrLogin: string;
  usrEmail: string;
  usrSenha: string;
  nvaId: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  isRegister = false; // controla se está na tela de registro

  loginData: LoginData = {
    usrLogin: '',
    usrSenha: ''
  };

  registerData: RegisterData = {
    usrNome: '',
    usrLogin: '',
    usrEmail: '',
    usrSenha: '',
    nvaId: 1
  };

  constructor(private api: ApiService, private loaderService: LoaderService, private router: Router, private modalService: ModalService) {}

  toggleForm(isRegister: boolean) {
    this.isRegister = isRegister;
  }

  async login() {
    this.loaderService.exibir();
    try {
      const response: any = await this.api.post(`/user/login`, this.loginData).toPromise();

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('usuarioLogado', JSON.stringify(response.usuario));

      this.modalService.sucesso('Sucesso', `Bem-vindo, ${response.usuario.nome}!`);

      const usuario = response.usuario;
      if (usuario.nivel === 0 || usuario.nivel === 1) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/usuario']);
      }

    } catch (error: any) {
      this.modalService.erro('Erro no Login', error.error?.message || 'Credenciais inválidas.');
    } finally {
      this.loaderService.esconder();
    }
  }

  async register() {
    this.loaderService.exibir();
    try {
      this.registerData.usrLogin = this.registerData.usrNome;
      this.registerData.usrEmail = `${this.registerData.usrEmail}`;
      this.registerData.usrSenha = this.registerData.usrSenha;
      this.registerData.nvaId = 1;

      const response: any = await this.api.post(`/participante`, this.registerData).toPromise();

      if (response.status === 201) {
        this.modalService.sucesso('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
        this.toggleForm(false);
      }
    } catch (error: any) {

      const errorMessage =
      error?.error?.message ||
      error?.error?.error ||
      error?.message ||
      'Não foi possível completar o cadastro.';

      this.modalService.erro('Erro no Cadastro', errorMessage);
    } finally {
      this.loaderService.esconder();
    }
  }
}
