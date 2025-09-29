import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizarRoutingModule } from './visualizar-routing-module';
import { Visualizar } from './visualizar/visualizar';



@NgModule({
  declarations: [
    Visualizar,
  
  ],
  imports: [
    CommonModule,
    VisualizarRoutingModule
  ]
})
export class VisualizarModule { }
