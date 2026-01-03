import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalService, ModalMessage } from '../modal.service';

@Component({
  selector: 'app-modal',
  template: '', // VAZIO AQUI POIS UTILIZA O SWAL
  standalone: false,
})
export class ModalComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.sub = this.modalService.message$.subscribe((msg: ModalMessage) => {
      this.exibirModal(msg);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private exibirModal(msg: ModalMessage) {
    const iconMap: any = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };

    Swal.fire({
      icon: iconMap[msg.type],
      title: msg.title,
      text: msg.message,
      background: 'var(--container-dark)',
      color: 'var(--text-white)',
      showConfirmButton: msg.type !== 'success',
      timer: msg.type === 'success' ? 2000 : undefined
    });
  }
}
