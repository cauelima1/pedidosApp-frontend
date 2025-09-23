import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { ClientesRoutingModule } from '../../clientes/clientes-routing-module';
import { ClienteService } from '../../clientes/cliente-service';


@Component({
  selector: 'app-pedido',
  standalone: false,
  templateUrl: './pedido.html',
  styleUrl: './pedido.scss'
})
export class Pedido implements OnInit {
  selecionar: boolean = false;
    clientes: Cliente [] = [];
    selecionarCliente?: Cliente;

  constructor (private clientService: ClienteService){
  }

    clienteSelecionado: Cliente = {
  nome: '',
  cnpj: 0,
  obs: '',
  cep: '',
  endereco: '',
  municipio: '',
  uf: '',
  df: ''
};

  ngOnInit(): void {
   this.carregarClientes();
  }

  carregarClientes(): void{
    this.clientService.listaClientes().subscribe({
      next: (listaClientes) => { this.clientes = listaClientes;
      },
      error: (err) => console.error("Erro ao carregar clientes ", err )
    })
  }

  

  mostrarTelaPedidos() {
    this.selecionar = true;
  }

}
