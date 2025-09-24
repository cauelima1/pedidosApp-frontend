import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pedido } from './pedido/pedido';


const routes: Routes = [
  {
    path :'',
    component: Pedido
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
