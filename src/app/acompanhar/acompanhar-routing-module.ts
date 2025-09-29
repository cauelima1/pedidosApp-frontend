import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Acompanhamento } from './acompanhamento/acompanhamento';

const routes: Routes = [
  {
    path: '',
    component: Acompanhamento
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompanharRoutingModule { }
