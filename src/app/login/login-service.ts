import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
      .subscribe({
          next: (res: any) => { 
            this.saveToken(res);
            console.log("Token recebido:", res);
            this.router.navigate(['/home']);},
          error: (err) => console.log("Falha no Login")});
        }

   

   saveToken(token: string){
    localStorage.setItem('jwtToken', token);
   }

   getToken(): string | null {
    return localStorage.getItem('jwtToken');
   }

   logout(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return throwError(() => new Error('Token não encontrado'));
    }

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    console.log("token inserido na blacklist para Logout: "  + token);
    return this.http.post(this.apiUrl + '/logout', {}, { headers });
  }

  clearSession(): void {
    localStorage.removeItem('jwtToken');
  }

  

}
