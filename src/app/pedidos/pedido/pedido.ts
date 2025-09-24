import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente-component/clienteModel';
import { ClienteService } from '../../clientes/cliente-service';
import { FormGroup, Validators, FormControl} from'@angular/forms';
import { PedidoModel } from './pedidoModel';
import { PedidoService } from '../pedido-service';
import { UtilServices } from '../../util-services';


@Component({
  selector: 'app-pedido',
  standalone: false,
  templateUrl: './pedido.html',
  styleUrl: './pedido.scss'
})
export class Pedido implements OnInit {
  selecionar: boolean = false;
  criarPedido: boolean = false;
  criarItem: boolean = false;  
  clientes: Cliente [] = [];
  pedidoForm: FormGroup;

    selecionarCliente?: Cliente;
    clienteSelecionado?: Cliente;

  constructor (private clientService: ClienteService, 
    private service: PedidoService, private utilService: UtilServices){

    this.pedidoForm = new FormGroup ({
        ipi: new FormControl('', Validators.required),
        st: new FormControl('', Validators.required),
        mc: new FormControl('', Validators.required),
        mc1: new FormControl('', Validators.required),
        frete: new FormControl('', Validators.required),
        stvd: new FormControl('', Validators.required)
    })

  }

    salvarPedido() {
      this.pedidoForm.markAllAsTouched();
      if(this.pedidoForm.valid){
      const novoPedido: PedidoModel = this.pedidoForm.value;
      novoPedido.idCliente = this.clienteSelecionado?.cnpj;
        this.service.savePedido(novoPedido).subscribe({
          next: () => this.utilService.mostrarMensagem("Pedido cadastrado!"),
          error: () => this.utilService.mostrarMensagem("Ocorreu um erro ao cadastrar pedido!")
        })
      console.log("Salvando novo pedido:", novoPedido);

      }
  }


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

  carregarClienteSelecionado(){
       this.clienteSelecionado = this.clientes.find(c => c.nome === this.selecionarCliente?.nome)!;
  }  



    formatDecimal(value: string): number {
  return parseFloat(value.replace(',', '.'));
}


  mostrarTelaCliente() {
    if(this.selecionarCliente){
    this.selecionar = true;
    } 
  }

  mostrarTelaNovoPedido(){
    this.criarPedido = true;
  }

    mostrarTelaNovoItem(){
    this.criarItem = true;
  }

  isCampoInvalido(campo: string): boolean {
    const nomeCampo = this.pedidoForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }



}
