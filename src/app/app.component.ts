import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rastreamento-frontend';

  /* FORMA DE USAR O COMPONENTE DE ERRO 
  @ViewChild('errorMessage', { static: true}) errorMessageComponent: ErrorMessageComponent;
  errorMessage: ElementRef;
  
  ngOnInit(): void {
    this.errorMessageComponent.setError('Essa é uma mensagem de erro')
  }

  ngAfterViewInit(): void {
    this.errorMessageComponent.setError('Essa é uma mensagem de erro')
  }*/
}
