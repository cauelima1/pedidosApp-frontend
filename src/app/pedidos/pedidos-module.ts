import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing-module';
import { Pedido } from './pedido/pedido';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective , NgxMaskPipe} from "ngx-mask";


@NgModule({
  declarations: [
    Pedido
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PedidosRoutingModule,NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class PedidosModule { }
