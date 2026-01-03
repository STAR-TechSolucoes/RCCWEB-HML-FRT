import { Component, Input, Output, EventEmitter, input } from '@angular/core';

@Component({
  selector: 'app-campo-ministerios',
  templateUrl: './campo-ministerios.component.html',
  styleUrls: ['./campo-ministerios.component.scss'],
  standalone: false,
})
export class CampoMinisteriosComponent {
  @Input() ministerios: string[] = [];
  @Input() value: string[] = [];
  @Input() multiple = true;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string[]>();

  get placeholder(): string {
    return !this.multiple ? '' : 'Selecione um ou mais ministérios...';
  }
}
