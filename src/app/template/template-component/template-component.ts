import { Component } from '@angular/core';
import { LoginService } from '../../login/login-service';
import { Login } from '../../login/login/login';


@Component({
  selector: 'app-template-component',
  standalone: false,
  templateUrl: './template-component.html',
  styleUrl: './template-component.scss'
})
export class TemplateComponent {

  constructor(private login: LoginService){
  }
  logout(){
    this.login.logout();
  }
}
