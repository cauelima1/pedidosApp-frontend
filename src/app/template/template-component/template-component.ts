import { Component } from '@angular/core';
import { MatIconModule} from'@angular/material/icon'
import { LoginService } from '../../login/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-component',
  standalone: false,
  templateUrl: './template-component.html',
  styleUrl: './template-component.scss'
})
export class TemplateComponent {

  constructor(private loginService: LoginService,
    private router: Router
  ){
  }
 
  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.loginService.clearSession();
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Erro ao fazer logout:', err);
        this.loginService.clearSession();
        this.router.navigate(['/login']);
      }});


  }
  
}
