import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TemplateRoutingModule } from './template-routing-module';
import { TemplateComponent } from './template-component/template-component';



@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    MatIconModule
    
]
})
export class TemplateModule { }
