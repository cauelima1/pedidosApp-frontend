import { Injectable, inject } from '@angular/core';
import { Cliente } from './cliente-component/clienteModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteComponent } from './cliente-component/cliente-component';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl: string = "http://localhost:8080/clientes"
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private http: HttpClient) {

  }

saveCliente(client: Cliente): Observable<Cliente> {
    const token = localStorage.getItem('jwtToken');
    console.log("jwtToken antes de cadastrar cliente: ", token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (token){
        return this.http.post<Cliente>(this.apiUrl, client, { headers });
      } else {
        console.log("Erro Token client-service");

      return new Observable<Cliente>((observer) => {
        observer.error('Token not found');
      });
    }
  }

    
  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK',{ duration: 3000});
  } 

    }
 


