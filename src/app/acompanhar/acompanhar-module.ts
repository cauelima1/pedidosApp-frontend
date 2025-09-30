import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompanharRoutingModule } from './acompanhar-routing-module';
import { Acompanhamento } from './acompanhamento/acompanhamento';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Acompanhamento
  ],
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule,
    AcompanharRoutingModule
  ]
})
export class AcompanharModule { }
