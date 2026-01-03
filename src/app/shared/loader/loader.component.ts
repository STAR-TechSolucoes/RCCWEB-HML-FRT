import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent {
  visible$;

  constructor(private loaderService: LoaderService) {
    this.visible$ = this.loaderService.visible$;
  }
}
