import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (usuario?.nivel === 0 || usuario?.nivel === 1 || usuario?.nivel === 2 || usuario?.nivel === 3) {
      return true;
    }
    //TODO - Redireciona para a rota do usuário comum (ajuste depois)
    return this.router.createUrlTree(['/usuario']);
  }
}
