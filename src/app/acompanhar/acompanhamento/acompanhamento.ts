import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { PedidoModel } from '../../pedidos/pedido/pedidoModel';
import { ClienteService } from '../../clientes/cliente-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PedidoService } from '../../pedidos/pedido-service';

@Component({
  selector: 'app-acompanhamento',
  standalone: false,
  templateUrl: './acompanhamento.html',
  styleUrl: './acompanhamento.scss'
})
export class Acompanhamento implements OnInit {
  pedido = false;
  selecionar = false;
  clienteSelecionado?: Cliente;
  clientes: Cliente[] = [];
  pedidoSelecionado?: PedidoModel;
  pedidos?: PedidoModel[] = [];
  selecionarCliente?: Cliente;
  selecionarPedido?: PedidoModel;


constructor(private clienteService: ClienteService, private pedidoService: PedidoService){}


  ngOnInit(): void {
    this.carregarClientes();

  }

  carregarClientes(): void {
    this.clienteService.listaClientes().subscribe({
      next: (listaClientes) => {
        this.clientes = listaClientes;
      },
      error: (err) => console.error("Erro ao carregar clientes ", err)
    })
  }

   carregarPedidos(id: number){
    this.pedidoService.mostrarPedidos(id).subscribe({
      next: (listaPedidos) => {
        this.pedidos = listaPedidos;
      },
      error: (err) => console.error("erro ao carregar pedido :" , err)
    })
  }


   carregarClienteSelecionado() {
    this.clienteSelecionado = this.clientes.find(c => c.nome === this.selecionarCliente?.nome)!;
  }


    carregarPedidoSelecionado(){
    this.pedidoSelecionado = this.pedidos?.find(p => p.id === this.selecionarPedido?.id);
  }
 

 




}
