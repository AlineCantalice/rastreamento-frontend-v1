import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {

  public error: string;

  constructor(
    private messageService: MessageService
  ) { }

  setError(error: string, time: number = 5000) {
    this.error = error;
    this.messageService.add({severity:'error', summary:'Erro', detail: this.error});
    setTimeout(() => {
      this.messageService.clear();
      this.error = null;
    }, time);
  }

}
