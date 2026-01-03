import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private messageSubject = new Subject<ModalMessage>();
  message$ = this.messageSubject.asObservable();

  sucesso(title: string, message: string) {
    this.messageSubject.next({ type: 'success', title, message });
  }

  erro(title: string, message: string) {
    this.messageSubject.next({ type: 'error', title, message });
  }

  aviso(title: string, message: string) {
    this.messageSubject.next({ type: 'warning', title, message });
  }

  info(title: string, message: string) {
    this.messageSubject.next({ type: 'info', title, message });
  }
}
