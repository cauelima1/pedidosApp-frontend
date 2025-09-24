import { Component, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente-component/clienteModel';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl: string = "http://localhost:8080/clientes"

  constructor(private http: HttpClient) {
  }


saveCliente(cliente: Cliente) : Observable<Cliente> {
      const headers = this.captarHeaders();
      return this.http.post(this.apiUrl, cliente, { headers })
  }

  confirmarAlteracao(cliente: Cliente) : Observable<Cliente> {
       const headers = this.captarHeaders();
        return this.http.put(this.apiUrl, cliente, { headers })
  }
 
  listaClientes() : Observable<Cliente[]> {
    const headers = this.captarHeaders();
    return this.http.get<Cliente[]>(this.apiUrl, {headers},);
  }

  deletarCliente(cnpj: number): Observable<Cliente[]> {
    const headers = this.captarHeaders();
    const url = `${this.apiUrl}/${cnpj}`;
    return this.http.delete<Cliente[]>(url ,{ headers })
  }


  captarHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  formatDecimal(value: string): number {
  return parseFloat(value.replace(',', '.'));
}
}
 


