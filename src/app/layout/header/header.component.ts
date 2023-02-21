import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  user: {
    username: '',
    token: ''
  } = JSON.parse(localStorage.getItem('currentUser'))

  ngOnInit(): void {
    this.items = [{
      label: 'Opções',
      items: [{
        label: 'Meus dados',
        icon: 'pi pi-user',
        command: () => {
          //this.update();
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-times',
        command: () => {
          //this.delete();
        }
      }
      ]
    }
    ]
  }
  
}
