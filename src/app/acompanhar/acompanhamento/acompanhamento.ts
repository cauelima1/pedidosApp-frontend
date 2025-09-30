import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { PedidoModel } from '../../pedidos/pedido/pedidoModel';
import { ClienteService } from '../../clientes/cliente-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PedidoService } from '../../pedidos/pedido-service';
import { AcompanharService } from '../acompanhar-service';
import { Item } from '../../pedidos/pedido/itemModel';
import { UtilServices } from '../../util-services';

@Component({
  selector: 'app-acompanhamento',
  standalone: false,
  templateUrl: './acompanhamento.html',
  styleUrl: './acompanhamento.scss'
})
export class Acompanhamento implements OnInit {
  editarPedidoHabilitado = false;
  editarPedido = false;
  pedido = false;
  selecionar = false;
  listarItems = false;
  clienteSelecionado?: Cliente;
  clientes: Cliente[] = [];
  pedidos?: PedidoModel[] = [];
  items?: Item[] = [];
  selecionarCliente?: Cliente;
  selecionarPedido?: PedidoModel;
  editarForm: FormGroup;

  pedidoSelecionado: PedidoModel = {
    condicaoFrete: '',
    data: '',
    frete: '',
    icms: '',
    ipi: '',
    items: [],
    mc: '',
    mc1: '',
    observacoes: '',
    st: '',
    stvd: '',
  };



  constructor(private clienteService: ClienteService, private utilService:UtilServices,
    private pedidoService: PedidoService, private service: AcompanharService) {

    this.editarForm = new FormGroup({
      observacoes: new FormControl(''),
      condicaoFrete: new FormControl(''),
      ipi: new FormControl('', Validators.required),
      st: new FormControl('', Validators.required),
      mc: new FormControl('', Validators.required),
      mc1: new FormControl('', Validators.required),
      frete: new FormControl('', Validators.required),
      stvd: new FormControl('', Validators.required),
      imcs: new FormControl('', Validators.required)
    })
  }


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

  carregarPedidos(id: number) {
    this.pedidoService.mostrarPedidos(id).subscribe({
      next: (listaPedidos) => {
        this.pedidos = listaPedidos;
      },
      error: (err) => console.error("erro ao carregar pedido :", err)
    })
  }


  editar() {
    console.log("ID selecionado", this.selecionarPedido?.id);
    this.editarPedido = true;
    if (this.selecionarPedido) {
      this.pedidoSelecionado = this.pedidos?.find(p => p.id === this.selecionarPedido?.id)!;
      console.log("Pedido Selecionado:", this.pedidoSelecionado);
      this.items = this.pedidoSelecionado.items;
      this.listarItems = true;
    }
  }

  salvarEdicao() {
    this.service.confirmarAlteracao(this.pedidoSelecionado).subscribe({
      next:() => {
        this.utilService.mostrarMensagem("Cliente alterado com sucesso")
        
      },
      error:() => this.utilService.mostrarMensagem("Ocorreu algum erro.")
    })
    this.editarPedidoHabilitado = false;
  }

  deletarItem(id: number): void {
    const confirmar = window.confirm('Tem certeza que deseja excluir este item?');
    if (confirmar) {

      const index = this.items?.findIndex(item => item.id === id);
      if (index !== -1) {
        this.items?.splice(index ?? 0, 1);
        this.service.deleteItem(id).subscribe({
          next: () => this.utilService.mostrarMensagem("Item deletado com sucesso!"),
          error: () => this.utilService.mostrarMensagem("Erro ao deletar Item!")
        })
      }
    }
  }
  
  
  habilitarEdicao() {
  this.editarPedidoHabilitado = true;
}


  isCampoInvalido(campo: string): boolean {
    const nomeCampo = this.editarForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

}
