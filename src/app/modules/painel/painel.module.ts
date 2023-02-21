import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelRoutingModule } from './painel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PainelComponent } from './painel.component';
import { HomeModule } from './home/home.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    PainelComponent,
  ],
  imports: [
    CommonModule,
    PainelRoutingModule,
    SharedModule,
    HomeModule,
    LayoutModule,
  ]
})
export class PainelModule { }
