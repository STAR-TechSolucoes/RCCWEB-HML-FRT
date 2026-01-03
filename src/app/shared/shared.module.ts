import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { GridComponent } from './grid/grid.component';
import { CampoTextoComponent } from './form-fields/campo-texto/campo-texto.component';
import { CampoCpfComponent } from './form-fields/campo-cpf/campo-cpf.component';
import { CampoCepComponent } from './form-fields/campo-cep/campo-cep.component';
import { CampoTelefoneComponent } from './form-fields/campo-telefone/campo-telefone.component';
import { CampoCidadeComponent } from './form-fields/campo-cidade/campo-cidade.component';
import { CampoMinisteriosComponent } from './form-fields/campo-ministerios/campo-ministerios.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { CampoImagemComponent } from './form-fields/campo-imagem/campo-imagem.component';

@NgModule({
  declarations: [
    LoaderComponent,
    GridComponent,
    CampoTextoComponent,
    CampoCpfComponent,
    CampoCepComponent,
    CampoTelefoneComponent,
    CampoCidadeComponent,
    CampoMinisteriosComponent,
    ModalComponent,
    CampoImagemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    LoaderComponent,
    GridComponent,
    CampoTextoComponent,
    CampoCpfComponent,
    CampoCepComponent,
    CampoTelefoneComponent,
    CampoCidadeComponent,
    CampoMinisteriosComponent,
    CampoImagemComponent,
    ModalComponent
  ]
})
export class SharedModule { }
