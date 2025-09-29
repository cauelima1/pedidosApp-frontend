import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Visualizar } from './visualizar/visualizar';

const routes: Routes = [
  {
    path: '',
    component: Visualizar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizarRoutingModule { }
