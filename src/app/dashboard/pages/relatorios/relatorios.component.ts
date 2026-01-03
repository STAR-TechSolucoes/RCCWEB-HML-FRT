import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../shared/modal.service';
import * as XLSX from 'xlsx';

interface ColunaRelatorio {
  key: string;
  label: string;
  type: string;
}

interface TipoRelatorio {
  value: string;
  label: string;
}

interface FiltroRelatorio {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date' | 'ng-select';
  options?: string[]; // para select
  placeholder?: string;
  ngSelectItems?: Array<{ label: string; value: string }>;
}

@Component({
  selector: 'app-relatorios',
  standalone: false,
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss'
})
export class RelatoriosComponent implements OnInit {
  tiposRelatorio: TipoRelatorio[] = [
    { value: 'servos', label: 'Servos' },
    { value: 'eventos', label: 'Eventos' }
  ];
  tipoRelatorio: string = 'servos';

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

  dadosRelatorio: any[] = [];
  columns: ColunaRelatorio[] = [];
  loading: boolean = false;

  cidades: Array<{ label: string; value: string }> = [];

  filtros: { [key: string]: any } = {};

  filtrosPorTipo: { [key: string]: FiltroRelatorio[] } = {
    servos: [
      {
        key: 'filtroMinisterio',
        label: 'Por Ministério:',
        type: 'select',
        options: ['', ...this.ministerios]
      },
      {
        key: 'filtroCidade',
        label: 'Por Cidade:',
        type: 'ng-select',
        ngSelectItems: [] as Array<{ label: string; value: string }>,
        placeholder: 'Digite a cidade...'
      },
      {
        key: 'filtroData',
        label: 'Data de Cadastro:',
        type: 'date'
      }
    ],
    eventos: [
      {
        key: 'filtroEventoData',
        label: 'Data do Evento:',
        type: 'date'
      },
      {
        key: 'filtroEventoCidade',
        label: 'Cidade do Evento:',
        type: 'text',
        placeholder: 'Digite a cidade...'
      }
    ]
  };

  constructor(private api: ApiService, private modalService: ModalService) {}

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    if (this.tipoRelatorio === 'servos') {
      this.columns = [
        { key: 'usrNome', label: 'Nome', type: 'text' },
        { key: 'usrCidade', label: 'Cidade', type: 'text' },
        { key: 'usrGrupoOracao', label: 'Grupo de Oração', type: 'text' },
        { key: 'usrContato', label: 'Contato', type: 'phone' },
        { key: 'ministerios', label: 'Ministérios', type: 'array' },
        { key: 'usrDataCadastro', label: 'Data de Cadastro', type: 'date' }
      ];
    } else if (this.tipoRelatorio === 'eventos') {
      this.columns = [
        { key: 'evtNome', label: 'Evento', type: 'text' },
        { key: 'evtCidade', label: 'Cidade', type: 'text' },
        { key: 'evtDataHoraInicio', label: 'Data', type: 'date' }
      ];
    }
  }

  buscarCidadePorNome(query: string) {
    if (!query || query.length < 3) return;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome&nome=${encodeURI(query)}`)
      .then(response => response.json())
      .then(data => {
        this.cidades = data.map((cidade: any) => {
          const siglaUF = cidade?.microrregiao?.mesorregiao?.UF?.sigla ?? 'DF';
          const nome_formatado = `${cidade.nome} - ${siglaUF}`;
          return { label: nome_formatado, value: nome_formatado };
        });
        // Atualiza itens do filtro ng-select
        const filtroCidade = this.filtrosPorTipo['servos'].find(f => f.key === 'filtroCidade');
        if (filtroCidade) filtroCidade.ngSelectItems = this.cidades;
      })
      .catch(() => {
        this.cidades = [];
      });
  }

  onTipoRelatorioChange() {
    this.setColumns();
    this.dadosRelatorio = [];
    this.filtros = {};
  }

  gerarRelatorio() {
    this.limparGrid();
    this.loading = true;
    let endpoint = '';

    if (this.tipoRelatorio === 'servos') {
      endpoint = '/user';
    } else if (this.tipoRelatorio === 'eventos') {
      endpoint = '/eventos';
    }

    const params = { ...this.filtros };
    const paramKeys = Object.keys(params).filter(key => params[key]);

    if (paramKeys.length) {
      endpoint += '?';
      paramKeys.forEach((key, idx) => {
        endpoint += `${idx > 0 ? '&' : ''}${key}=${encodeURIComponent(params[key])}`;
      });
    }

    this.api.get<any[]>(endpoint).subscribe({
      next: (data) => {
        this.dadosRelatorio = data;
        this.loading = false;
      },
      error: () => {
        this.modalService.erro('Erro', 'Erro ao gerar relatório.');
        this.loading = false;
      }
    });
  }

  limparGrid() {
    this.dadosRelatorio = [];
  }

  exportarExcel() {
    if (!this.dadosRelatorio.length) return;
    const dados = this.dadosRelatorio.map(item => {
      const linha: any = {};
      this.columns.forEach(col => {
        let valor = item[col.key];
        // Se o tipo for array, transforma em string
        if (col.type === 'array' && Array.isArray(valor)) {
          valor = valor.join(', ');
        }
        // Se o tipo for date, formata para dd/MM/yyyy
        if (col.type === 'date' && valor) {
          const date = new Date(valor);
          if (!isNaN(date.getTime())) {
            valor = date.toLocaleDateString('pt-BR');
          }
        }

        linha[col.label] = valor;
      });
      return linha;
    });
    const ws = XLSX.utils.json_to_sheet(dados);

    // Define largura das colunas (ajusta conforme necessário)
    const colWidths = this.columns.map(col => {
      // Pega o maior comprimento entre o label e os valores da coluna
      const maxContentLength = Math.max(
        col.label.length,
        ...this.dadosRelatorio.map(item => {
          let valor = item[col.key];
          if (col.type === 'array' && Array.isArray(valor)) {
            valor = valor.join(', ');
          }
          return valor ? valor.toString().length : 0;
        })
      );
      return { wch: Math.max(maxContentLength + 2, 20) };
    });
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

    const nomeArquivo = `relatorio-${this.tipoRelatorio}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo, { cellStyles: true });
  }
}
