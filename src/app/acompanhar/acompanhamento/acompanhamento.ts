import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { PedidoModel } from '../../pedidos/pedido/pedidoModel';
import { ClienteService } from '../../clientes/cliente-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PedidoService } from '../../pedidos/pedido-service';
import { AcompanharService } from '../acompanhar-service';
import { Item } from '../../pedidos/pedido/itemModel';
import { UtilServices } from '../../util-services';
import { ItemService } from '../../pedidos/item-service';

@Component({
  selector: 'app-acompanhamento',
  standalone: false,
  templateUrl: './acompanhamento.html',
  styleUrl: './acompanhamento.scss'
})
export class Acompanhamento implements OnInit {
  mostrarStatus = false;
  criarItem = false;
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
  itemForm: FormGroup;
  editarItem: boolean = false;
  itemParaEditar?: Item;
  statusSelecionado?: string;
  statusPedido?: string;
  mostrarPedido = false;
  inputsDesabilitados = false;

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



  constructor(private clienteService: ClienteService, private utilService: UtilServices,
    private pedidoService: PedidoService, private service: AcompanharService, private itemService: ItemService) {

    this.editarForm = new FormGroup({
      observacoes: new FormControl(''),
      condicaoFrete: new FormControl(''),
      ipi: new FormControl('', Validators.required),
      st: new FormControl('', Validators.required),
      mc: new FormControl('', Validators.required),
      mc1: new FormControl('', Validators.required),
      frete: new FormControl('', Validators.required),
      stvd: new FormControl('', Validators.required),
      imcs: new FormControl('', Validators.required),
      pis: new FormControl('', Validators.required),
      cofins: new FormControl('', Validators.required)
    }),
      this.itemForm = new FormGroup({
        id: new FormControl,
        nome: new FormControl('', Validators.required),
        fabricante: new FormControl,
        tipo: new FormControl('', Validators.required),
        obs: new FormControl,
        quantidade: new FormControl('', Validators.required),
        custo: new FormControl('', Validators.required)
      })
  }


  ngOnInit(): void {
    this.carregarClientes();

  }

  adicionarItem() {
    this.editarItem = false;
    this.criarItem = true;
  }

  atualizarStatus(id: number) {
    this.pedidoSelecionado = this.pedidos?.find(p => p.id === this.selecionarPedido?.id)!;
    this.mostrarStatus = true;
  }

  salvarStatus() {
    const novoStatus = this.statusSelecionado;
    const id = this.pedidoSelecionado.id;
    if (novoStatus != null && id != null) {
      this.service.mudarStatus(novoStatus, id).subscribe({
        next: (pedidoStatusNovo: PedidoModel) => {
          this.utilService.mostrarMensagem("Status alterado com sucesso.")
          this.mostrarPedido = true;
          this.inputsDesabilitados = true;
        },
        error: () => this.utilService.mostrarMensagem("Selecione uma opção!")

      })
    } else {
      this.utilService.mostrarMensagem("Ocorreu algum erro ao atualizar o status do pedido.");
    }
  }

  limparFormPedido() {
    window.location.reload();
  }

  salvarItem() {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.valid) {
      const novoItem: Item = this.itemForm.value;
      novoItem.idPedido = this.pedidoSelecionado.id;
      this.itemService.saveItem(novoItem).subscribe({
        next: (itemCadastrado: Item) => {
          this.utilService.mostrarMensagem("Item cadastrado!"),
            this.items?.push(itemCadastrado),
            this.listarItems = true;
        },
        error: () => this.utilService.mostrarMensagem("Ocorreu um erro ao salvar item.")
      })
      this.itemForm.reset();
      this.criarItem = false;
    }
  }

  carregarItemParaEdicao(item: Item) {
    if (item) {
      this.criarItem = false;
      this.editarItem = true;
      this.itemForm.patchValue({
        id: item.id,
        nome: item.nome,
        fabricante: item.fabricante,
        quantidade: item.quantidade,
        tipo: item.tipo,
        custo: item.custo,
        obs: item.obs
      });
    } else {
      console.log("Erro ao tentar editar este item.");
    }

    console.log("Mostrando formulário", this.itemForm.value);

  }

  concluirEdicaoItem() {
    if (this.itemForm.value) {
      this.service.confirmarAlteracaoItem(this.itemForm.value).subscribe({
        next: () => {
          this.utilService.mostrarMensagem("Item alterado com sucesso");
        },
        error: () => this.utilService.mostrarMensagem("Ocorreu algum erro.")
      })
    }

    this.itemForm.reset();
    this.editarItem = false;
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
    this.pedidoService.mostrarPedidosPorCliente(id).subscribe({
      next: (listaPedidos) => {
        this.pedidos = listaPedidos.filter(p => p.statusPedido == "ABERTO");
      },
      error: (err) => console.error("erro ao carregar pedido :", err)
    })
  }


  editar() {
    this.editarPedido = true;
    this.clienteSelecionado = this.selecionarCliente;
    if (this.selecionarPedido) {
      this.pedidoSelecionado = this.pedidos?.find(p => p.id === this.selecionarPedido?.id)!;

      this.items = this.pedidoSelecionado.items;
      this.listarItems = true;
    }
  }

  salvarEdicao() {
    this.service.confirmarAlteracao(this.pedidoSelecionado).subscribe({
      next: () => {
        this.utilService.mostrarMensagem("Pedido alterado com sucesso")

      },
      error: () => this.utilService.mostrarMensagem("Ocorreu algum erro.")
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

  limparForumulario() {
    this.itemForm.reset();
  }

  isCampoInvalido(campo: string): boolean {
    const nomeCampo = this.editarForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

  isCampoInvalidoItemForm(campo: string): boolean {
    const nomeCampo = this.itemForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

  travarInputs() {
    this.inputsDesabilitados = true;
  }


}
