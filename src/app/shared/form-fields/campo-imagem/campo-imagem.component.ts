import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-campo-imagem',
  templateUrl: './campo-imagem.component.html',
  styleUrls: ['./campo-imagem.component.scss'],
  standalone: false
})
export class CampoImagemComponent {
  @Input() label: string = 'Imagem do evento';
  @Input() id: string = 'campoImagem';
  @Input() required: boolean = false;
  @Output() imagemChange = new EventEmitter<string>();

  preview: string | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato de imagem não permitido. Use PNG, JPEG, JPG ou GIF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      this.imagemChange.emit(this.preview);
    };
    reader.readAsDataURL(file);
  }
}