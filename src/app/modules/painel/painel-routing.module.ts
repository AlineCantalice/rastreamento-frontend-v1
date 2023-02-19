import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PainelComponent } from './painel.component';

const routes: Routes = [
  {
    path: '',
    component: PainelComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
