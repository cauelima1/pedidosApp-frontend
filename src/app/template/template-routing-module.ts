import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template-component/template-component';



const routes: Routes = [
  {
    path : '',
    component: TemplateComponent,
    children: [
          {
        path: 'home',
        loadChildren: () => import ('../home/home-module').then(m => m.HomeModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import ('../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos-module').then(m => m.PedidosModule)
      },
      {
        path: 'visualizar',
        loadChildren: () => import('../visualizar/visualizar-module').then(m => m.VisualizarModule)
      },
      {
        path: 'acompanhar',
        loadChildren: () => import('../acompanhar/acompanhar-module').then(m => m.AcompanharModule)
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
