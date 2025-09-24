import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing-module';
import { Pedido } from './pedido/pedido';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteComponent } from '../clientes/cliente-component/cliente-component';


@NgModule({
  declarations: [
    Pedido
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
