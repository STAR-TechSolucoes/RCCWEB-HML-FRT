import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Adicione esta linha

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { CadastrarServoComponent } from './pages/cadastrar-servo/cadastrar-servo.component';
import { ListarServosComponent } from './pages/listar-servos/listar-servos.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { CadastrarEventoComponent } from './pages/cadastrar-evento/cadastrar-evento.component';

@NgModule({
  declarations: [
    MainDashboardComponent,
    CadastrarServoComponent,
    ListarServosComponent,
    RelatoriosComponent,
    ConfiguracoesComponent,
    DashboardLayoutComponent,
    CadastrarEventoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgChartsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class DashboardModule { }
