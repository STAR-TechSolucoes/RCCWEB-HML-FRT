import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-campo-imagem',
  templateUrl: './campo-imagem.component.html',
  styleUrls: ['./campo-imagem.component.scss'],
  standalone: false
})
export class CampoImagemComponent implements OnChanges {
  @Input() label: string = 'Imagem do evento';
  @Input() id: string = 'campoImagem' + Math.floor(Math.random() * 1000); // ID único
  @Input() required: boolean = false;
  @Input() value: string | null = null; 
  
  @Output() imagemChange = new EventEmitter<string>();

  preview: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    // Se o valor vindo de fora (API) mudar, atualiza o preview
    if (changes['value'] && changes['value'].currentValue) {
      this.preview = changes['value'].currentValue;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validação básica
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato de imagem não permitido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.preview = base64; // Atualiza a tela imediatamente
      this.imagemChange.emit(base64); // Avisa o componente pai
    };
    reader.readAsDataURL(file);
  }

  removerImagem() {
    this.preview = null;
    this.value = null;
    this.imagemChange.emit('');
    // Limpa o campo de arquivo para permitir selecionar a mesma imagem se quiser
    const input = document.getElementById(this.id) as HTMLInputElement;
    if (input) input.value = '';
  }
}