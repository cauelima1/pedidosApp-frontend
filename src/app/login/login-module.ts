import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRoutingModule } from './login-routing-module';
import { Login } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Login
  ],
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  providers: [provideNgxMask()]
})
export class LoginModule { }
