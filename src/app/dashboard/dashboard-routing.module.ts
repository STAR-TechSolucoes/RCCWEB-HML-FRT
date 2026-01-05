import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { CadastrarServoComponent } from './pages/cadastrar-servo/cadastrar-servo.component';
import { ListarServosComponent } from './pages/listar-servos/listar-servos.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { CadastrarEventoComponent } from './pages/cadastrar-evento/cadastrar-evento.component';
import { ListarEventosComponent } from './pages/listar-eventos/listar-eventos.component';
import { AuthGuard } from '../core/auth.guard';
import { AdminGuard } from '../core/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: MainDashboardComponent },
      { path: 'cadastrar-servo', component: CadastrarServoComponent },
      { path: 'cadastrar-evento', component: CadastrarEventoComponent },
      { path: 'listar-servos', component: ListarServosComponent },
      { path: 'relatorios', component: RelatoriosComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'listar-eventos', component: ListarEventosComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
