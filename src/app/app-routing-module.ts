import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login/login';
import { AuthGuard } from './AuthGuard';


const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'home', 
    loadChildren: () =>
      import('./template/template-module').then(m => m.TemplateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '**',
    redirectTo:'login'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
