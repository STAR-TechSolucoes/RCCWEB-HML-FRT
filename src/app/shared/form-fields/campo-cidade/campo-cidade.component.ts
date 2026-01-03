import { Component, Input, Output, EventEmitter } from '@angular/core';

interface CidadeOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-campo-cidade',
  templateUrl: './campo-cidade.component.html',
  styleUrls: ['./campo-cidade.component.scss'],
  standalone: false,
})
export class CampoCidadeComponent {
  @Input() label = 'Cidade';
  @Input() placeholder = 'Preenchido pelo CEP ou busque por nome...';
  @Input() id = 'cidade';
  @Input() name = 'cidade';
  @Input() required = false;

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() cidades: CidadeOption[] = [];
  @Output() cidadesChange = new EventEmitter<CidadeOption[]>();

  // Método default de busca no IBGE a partir de 3 caracteres
  onSearch(term: string) {
    if (!term || term.trim().length < 3) return;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome&nome=${encodeURI(term.trim())}`)
      .then(res => res.json())
      .then((data: any[]) => {
        const cidades = (data || []).map((cidade: any) => {
          const siglaUF = cidade?.microrregiao?.mesorregiao?.UF?.sigla ?? 'DF';
          const label = `${cidade.nome} - ${siglaUF}`;
          return { label, value: label };
        });
        this.cidadesChange.emit(cidades);
      })
      .catch(() => {
        this.cidadesChange.emit([]);
      });
  }

  onCidadeSelecionada(cidadeSelecionada: any) {
    const novoValor = cidadeSelecionada?.value ?? cidadeSelecionada ?? '';
    this.value = novoValor;
    this.valueChange.emit(this.value);
  }
}