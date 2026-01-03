import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();

  exibir() {
    this.visibleSubject.next(true);
  }

  esconder() {
    this.visibleSubject.next(false);
  }
}
