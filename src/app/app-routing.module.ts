import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscricaoPublicaComponent } from './public/pages/inscricao-publica/inscricao-publica.component';
import { HomeComponent } from './public/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { 
    path: 'login', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'e/:id', component: InscricaoPublicaComponent }, 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
