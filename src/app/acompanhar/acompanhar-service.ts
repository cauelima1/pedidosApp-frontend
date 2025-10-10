import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoModel } from '../pedidos/pedido/pedidoModel';
import { Observable } from 'rxjs';
import { PedidoService } from '../pedidos/pedido-service';
import { ItemService } from '../pedidos/item-service';
import { Item } from '../pedidos/pedido/itemModel';
import { Pedido } from '../pedidos/pedido/pedido';

@Injectable({
  providedIn: 'root'
})
export class AcompanharService {
  
  apiUrl: string = "http://localhost:8080/pedidos"

  constructor(private http: HttpClient, private pedidoService: PedidoService, private itemService: ItemService) {
  }

    mostrarPedido(id: number): Observable<PedidoModel> {
      const headers = this.pedidoService.captarHeaders();
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<PedidoModel>(url , { headers })
    }


confirmarAlteracao(pedido: PedidoModel): Observable<PedidoModel> {
  const headers = this.pedidoService.captarHeaders();
  const url = `${this.apiUrl}/${pedido.id}`; // inclui o ID na URL
  return this.http.put<PedidoModel>(url, pedido, { headers });
}


deleteItem(id: number): Observable<Item> {
  console.log("variavel id", id);
  const headers = this.pedidoService.captarHeaders();
  const url = `${this.apiUrl}/${id}`; // monta a URL com o ID
  return this.http.delete<Item>(url, { headers }); // usa a URL correta
}

mudarStatus(novoStatus: string, id: number): Observable<PedidoModel> {
  const headers = this.pedidoService.captarHeaders();
  const url = `${this.apiUrl}/editar`;

  const body = {
    status: novoStatus,
    id: id
  };
  return this.http.post<PedidoModel>(url, body, { headers }); // usa a URL correta
}


}
