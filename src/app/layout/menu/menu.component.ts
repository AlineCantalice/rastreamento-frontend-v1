import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  showMenu: boolean = false;
  menuOpened: boolean = false;
  innerWidth: number = 0;

  constructor() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Meus produtos', icon: 'pi pi-fw pi-box', routerLink: ['/painel'] },
      //{ label: 'Open', icon: 'pi pi-fw pi-download', routerLink: ['/painel'] },
      //{ label: 'Undo', icon: 'pi pi-fw pi-refresh', routerLink: ['/painel'] }
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if(!this.breakpoint()) {
      this.showMenu = false;
      this.menuOpened = false;
    } else {
      this.showMenu = true;
      this.menuOpened = false;
    }
  }

  toggle(): void {
    if(this.breakpoint()) {
      this.menuOpened = !this.menuOpened;
    } else {
      this.showMenu = !this.showMenu;
    }
  }

  breakpoint(): boolean {
    return this.innerWidth <= 1024;
  }

}
