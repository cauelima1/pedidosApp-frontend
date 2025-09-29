import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoModel } from './pedido/pedidoModel';
import { Cliente } from '../clientes/cliente-component/clienteModel';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  apiUrl: string = "http://localhost:8080/pedidos"

  constructor(private http: HttpClient) {

  }

  savePedido(pedido: PedidoModel): Observable<number> {
    const headers = this.captarHeaders();
    return this.http.post<number>(this.apiUrl, pedido, { headers })
  }

  mostrarPedidos(cnpj: number): Observable<PedidoModel[]> {
    const headers = this.captarHeaders();
    const url = `${this.apiUrl}/${cnpj}`;
    return this.http.get<PedidoModel[]>(url , { headers })
  }

  finalizarPedido(id: number): Observable<PedidoModel> {
    const headers = this.captarHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.post<PedidoModel>(url, {},{headers});
  }

  carregarCliente(cnpj: number): Observable<Cliente> {
    const headers = this.captarHeaders();
        const url = `${this.apiUrl}/${cnpj}`;
        return this.http.get<Cliente>(url, { headers })
  }

  captarHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }



}
