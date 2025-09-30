import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompanharRoutingModule } from './acompanhar-routing-module';
import { Acompanhamento } from './acompanhamento/acompanhamento';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Acompanhamento
  ],
  imports: [FormsModule,
    CommonModule,
    AcompanharRoutingModule
  ]
})
export class AcompanharModule { }
