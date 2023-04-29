import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {}

  items: MenuItem[];
  user: {
    username: '',
    token: ''
  } = JSON.parse(sessionStorage.getItem('currentUser'))

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
          this.authService.logout();
        }
      }
      ]
    }
    ]
  }
  
}
