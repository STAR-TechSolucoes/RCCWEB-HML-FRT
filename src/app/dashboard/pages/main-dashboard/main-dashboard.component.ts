import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LoaderService } from '../../../shared/loader.service';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: false,
})
export class MainDashboardComponent implements OnInit {
  totalServos = 0;
  totalGrupos = 0;
  totalMinisterios = 0;
  totalEventos = 0;

  public ministeriosChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public ministeriosChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };

  public cidadesChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: []
  };

  public cidadesChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private api: ApiService, private modalService: ModalService, private loaderService: LoaderService) {}

  loadingDashboard = true;

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    this.loaderService.exibir();

    try {
      // const [
      //   totalServosResp,
      //   totalGruposResp,
      //   totalMinisteriosResp,
      //   totalEventosResp,
      //   ministeriosResp,
      //   cidadesResp
      // ] = await Promise.all([
      //   this.api.get('/dashboard/totalServos').toPromise() as Promise<{ totalServos: number }>,
      //   this.api.get('/dashboard/totalGruposOracao').toPromise() as Promise<{ totalGruposOracao: number }>,
      //   this.api.get('/dashboard/totalMinisteriosAtivos').toPromise() as Promise<{ totalMinisteriosAtivos: number }>,
      //   this.api.get('/dashboard/totalEventosProximos').toPromise() as Promise<{ totalEventosProximos: number }>,
      //   this.api.get('/dashboard/servosPorMinisterio').toPromise() as Promise<Array<{ ministerio: string, numServos: number }>>,
      //   this.api.get('/dashboard/servosPorCidade').toPromise() as Promise<Array<{ cidade: string, numServos: number }>>
      // ]);

      const servosResp = await this.api.get('/dashboard').toPromise() as {
        totalServos: number,
        totalGruposOracao: number,
        totalMinisteriosAtivos: number,
        totalEventosProximos: number,
        servosPorMinisterio: Array<{ ministerio: string, numServos: number }>,
        servosPorCidade: Array<{ cidade: string, numServos: number }>
      };

      this.totalServos = servosResp.totalServos || 0;
      this.totalGrupos = servosResp.totalGruposOracao || 0;
      this.totalMinisterios = servosResp.totalMinisteriosAtivos || 0;
      this.totalEventos = servosResp.totalEventosProximos || 0;

      this.ministeriosChartData = {
        labels: servosResp.servosPorMinisterio.map(m => m.ministerio),
        datasets: [
          {
            label: 'Nº de Servos',
            data: servosResp.servosPorMinisterio.map(m => m.numServos),
            backgroundColor: '#4B77BE'
          }
        ]
      };

      this.cidadesChartData = {
        labels: servosResp.servosPorCidade.map(c => c.cidade),
        datasets: [
          {
            label: 'Distribuição',
            data: servosResp.servosPorCidade.map(c => c.numServos),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#17a247', '#212529']
          }
        ]
      };
    } catch (e) {
      this.modalService.erro('Erro', 'Falha ao carregar dados do dashboard.');
    } finally {
      this.loadingDashboard = false;
      this.loaderService.esconder();
    }
  }
}
