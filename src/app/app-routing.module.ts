import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscricaoPublicaComponent } from './public/pages/inscricao-publica/inscricao-publica.component';
import { HomeComponent } from './public/pages/home/home.component';
import { ConsultarInscricaoComponent } from './public/pages/consultar-inscricao/consultar-inscricao.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { 
    path: 'login', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'e/:id', component: InscricaoPublicaComponent }, 
  { path: 'minhas-inscricoes', component: ConsultarInscricaoComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
