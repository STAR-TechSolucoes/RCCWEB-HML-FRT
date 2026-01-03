import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: false
})
export class DashboardLayoutComponent implements OnInit {
  usuario: any = null;
  cadastrosOpen = false;
  consultasOpen = false;

  ngOnInit() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      this.usuario = JSON.parse(usuarioLogado);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  constructor(private router: Router) {}
}