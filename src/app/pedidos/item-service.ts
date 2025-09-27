import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoService } from './pedido-service';
import { Item } from './pedido/itemModel'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  

  constructor(private http: HttpClient, private pedidoService: PedidoService){
  }

   apiUrl: string ="http://localhost:8080/pedidos/item"

  

  saveItem(item: Item): Observable<Item> {
    const headers = this.pedidoService.captarHeaders();
    return this.http.post(this.apiUrl, item, { headers })
  }

  
deleteItem(id: number): Observable<Item> {
  console.log("variavel id", id);
  const headers = this.pedidoService.captarHeaders();
  const url = `${this.apiUrl}/${id}`; // monta a URL com o ID
  return this.http.delete<Item>(url, { headers }); // usa a URL correta
}


}
