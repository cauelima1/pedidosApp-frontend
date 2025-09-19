import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template-component/template-component';
import { ClientesModule } from '../clientes/clientes.module';
import { Pedido } from '../pedidos/pedido/pedido';


const routes: Routes = [
  {
    path : '',
    component: TemplateComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import ('../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos-module').then(m => m.PedidosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule { 
  
}
