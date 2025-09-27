import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { ClienteService } from '../../clientes/cliente-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PedidoModel } from './pedidoModel';
import { PedidoService } from '../pedido-service';
import { UtilServices } from '../../util-services';
import { Item } from './itemModel';
import { ItemService } from '../item-service';


@Component({
  selector: 'app-pedido',
  standalone: false,
  templateUrl: './pedido.html',
  styleUrl: './pedido.scss'
})

export class Pedido implements OnInit {
  verPedidos: boolean = false;
  selecionar: boolean = false;
  criarPedido: boolean = false;
  criarItem: boolean = false;
  listarItems: boolean = false;
  pedidos: PedidoModel[] = [];
  clientes: Cliente[] = [];
  items: Item[] = [];
  pedidoForm: FormGroup;
  itemForm: FormGroup;
  idPedido?: number;

  selecionarCliente?: Cliente;
  clienteSelecionado?: Cliente;

  constructor(private clientService: ClienteService,
    private service: PedidoService, private utilService: UtilServices, private itemService: ItemService) {

    this.pedidoForm = new FormGroup({
      ipi: new FormControl('', Validators.required),
      icms: new FormControl('', Validators.required),
      st: new FormControl('', Validators.required),
      mc: new FormControl('', Validators.required),
      mc1: new FormControl('', Validators.required),
      frete: new FormControl('', Validators.required),
      stvd: new FormControl('', Validators.required),
      condicaoFrete: new FormControl(''),
      observacoes: new FormControl('')
    }),
      this.itemForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        fabricante: new FormControl,
        tipo: new FormControl('', Validators.required),
        obs: new FormControl,
        quantidade: new FormControl('', Validators.required),
        custo: new FormControl('', Validators.required)
      })

  }

  salvarPedido() {
    this.pedidoForm.markAllAsTouched();

    if (this.pedidoForm.valid) {
      const novoPedido: PedidoModel = this.pedidoForm.value;
      novoPedido.idCliente = this.clienteSelecionado?.cnpj;
      this.service.savePedido(novoPedido).subscribe({
        next: (idPedido: number) => {
          this.utilService.mostrarMensagem("Pedido cadastrado!" + idPedido),
            this.idPedido = idPedido;
        },
        error: () => this.utilService.mostrarMensagem("Ocorreu um erro ao cadastrar pedido!")
      })
      this.pedidoForm.disable();
      this.criarItem = true;
    }
  }

  salvarItem() {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.valid) {
      const novoItem: Item = this.itemForm.value;
      console.log(novoItem)
      novoItem.idPedido = this.idPedido;
      this.itemService.saveItem(novoItem).subscribe({
        next: (itemCadastrado: Item) => {
          this.utilService.mostrarMensagem("Item cadastrado!"),
            console.log("Item cadastrado é:", itemCadastrado),
            this.items.push(itemCadastrado),
            this.listarItems = true;
        },
        error: () => this.utilService.mostrarMensagem("Ocorreu um erro ao salvar item.")
      })
    }
  }

  deletarItem(id: number): void {
    const confirmar = window.confirm('Tem certeza que deseja excluir este item?');
    if (confirmar) {

      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.itemService.deleteItem(id).subscribe({
          next: () => this.utilService.mostrarMensagem("Item deletado com sucesso!"),
          error: () => this.utilService.mostrarMensagem("Erro ao deletar Item!")
        })
      }
    }
  }



  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clientService.listaClientes().subscribe({
      next: (listaClientes) => { 
        this.clientes = listaClientes;
      },
      error: (err) => console.error("Erro ao carregar clientes ", err)
    })
  }

  carregarClienteSelecionado() {
    this.clienteSelecionado = this.clientes.find(c => c.nome === this.selecionarCliente?.nome)!;
  }


  formatDecimal(value: string): number {
    return parseFloat(value.replace(',', '.'));
  }


mostrarTelaPedidos(){
  this.verPedidos=true;
  this.criarPedido=false;
  this.criarItem=false;
  const cnpj = this.clienteSelecionado?.cnpj;
  console.log(cnpj)
  if(cnpj){
    this.service.mostrarPedidos(cnpj).subscribe({
      next: (listPedidos: PedidoModel[]) => {
        this.pedidos = listPedidos;
        this.utilService.mostrarMensagem("Mostrando lista de Pedidos para cliente");
      }
      
    })
  }

}

  mostrarTelaCliente() {
    if (this.selecionarCliente) {
      this.selecionar = true;
    }
  }

  mostrarTelaNovoPedido() {
    this.verPedidos=false;
    this.criarPedido = true;
  }

  mostrarTelaNovoItem() {
    this.criarItem = true;
  }

  mostrarTelaItemsCadastrados() {
    this.listarItems = true;
  }

  isCampoInvalido(campo: string): boolean {
    const nomeCampo = this.pedidoForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

  isCampoInvalidoItemForm(campo: string): boolean {
    const nomeCampo = this.itemForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

  recarregarPagina() {
    window.location.reload();
  }

}
