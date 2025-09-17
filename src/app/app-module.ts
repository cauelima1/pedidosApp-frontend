import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch } from '@angular/common/http'
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authInterceptor'; 


@NgModule({
  declarations: [
    App
  ],
  imports: [
    NgxMaskDirective,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideNgxMask()
  ],
  bootstrap: [App]
})
export class AppModule { }
