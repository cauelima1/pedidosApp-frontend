import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  apiUrl: string = "http://localhost:8080/auth"

  constructor(private http: HttpClient,
    private router: Router){}


  salvar(newUser:{ username: string; password: string} )  {
    console.log("Salvando usuario:> " , newUser.username)
    return this.http.post(this.apiUrl + "/register", newUser);
   }

   logar(user: {username: string; password: string}){
      return this.http.post(this.apiUrl + "/login", user,{ responseType: 'text' })

    }
  
   saveToken(token: string){
    localStorage.setItem('jwtToken', token);
   }

   getToken(): string | null {
    return localStorage.getItem('jwtToken');
   }

   logout() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.clearSession();

    return this.http.post<void>(this.apiUrl + '/logout', {}, { headers }).subscribe({
    next: () => {
      console.log("Logout efetuado com sucesso");
      this.router.navigate(['/login']);
    },
    error: () => console.log("Erro logout!")
  });
}

  clearSession(): void {
    localStorage.removeItem('jwtToken');
  }

  

}
