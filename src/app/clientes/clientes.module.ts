import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing-module';
import { ClienteComponent } from './cliente-component/cliente-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective , provideNgxMask, NgxMaskPipe} from "ngx-mask";
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    FormsModule,
    MatIconButton,
    ReactiveFormsModule,
    CommonModule,
    ClientesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe, MatIconButton, MatIconModule],
    providers: 
       [provideNgxMask()]
})
export class ClientesModule {
  
}
