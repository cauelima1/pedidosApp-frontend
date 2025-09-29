import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing-module';
import { Pedido } from './pedido/pedido';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective , NgxMaskPipe} from "ngx-mask";
import { MatButton, MatIconButton } from '@angular/material/button'
import {MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    Pedido,

  ],
  imports: [MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PedidosRoutingModule, NgxMaskDirective,
    NgxMaskPipe,
    MatButton,
    MatIconButton
]
})
export class PedidosModule { }
