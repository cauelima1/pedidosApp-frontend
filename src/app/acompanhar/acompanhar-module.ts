import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompanharRoutingModule } from './acompanhar-routing-module';
import { Acompanhamento } from './acompanhamento/acompanhamento';


@NgModule({
  declarations: [
    Acompanhamento
  ],
  imports: [
    CommonModule,
    AcompanharRoutingModule
  ]
})
export class AcompanharModule { }
