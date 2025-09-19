import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl} from'@angular/forms';
import { Estado, Municipio } from '../../brasilapi.models';
import { BrasilapiService } from '../../brasilapi-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from './clienteModel';
import { ClienteService } from '../cliente-service';


@Component({
  selector: 'app-cliente-component',
  standalone: false,
  templateUrl: './cliente-component.html',
  styleUrl: './cliente-component.scss'
})
export class ClienteComponent implements OnInit  {
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  clientes: Cliente [] = []; 
  cadastrar: boolean = false;
  pesquisar: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  cadastroForm: FormGroup;
  selecionarCliente?: Cliente;


  clienteSelecionado: Cliente = {
  nome: '',
  cnpj: 0,
  obs: '',
  cep: '',
  endereco: '',
  municipio: '',
  uf: '',
  df: 0,
  isICMS: false
};
 
    constructor (private brasilapiService: BrasilapiService,
                 private clienteService: ClienteService) {
      
      this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      cep: new FormControl(''),
      endereco: new FormControl(''),
      municipio: new FormControl(''),
      uf : new FormControl(''),
      df: new FormControl(''),
      obs: new FormControl(''),
      isICMS: new FormControl('')

 });
 
}


  ngOnInit(): void {
    this.carregarUfs();
    this.carregarClientes();
  }

    
  consultar () {
    if(this.selecionarCliente){
      this.clienteSelecionado = this.selecionarCliente;
      this.pesquisar = true;
    } else {
      this.mostrarMensagem("Nenhum cliente selecionado");
    }  
  }


  salvar() {
    this.cadastroForm.markAllAsTouched();

    if(this.cadastroForm.valid){
        this.clienteService.saveCliente(this.cadastroForm.value) .subscribe({
          next: () => {this.mostrarMensagem("Cliente cadastrado com sucesso")
            this.esconderFormulario();
            this.cadastroForm.reset();
            this.carregarClientes();
        },
          error: ()=> this.mostrarMensagem("Ocorreu algum erro, verifique e tente novamente!")
    });
    }
}

  limparFormulario(){
    this.cadastroForm.reset();
  }

  mostrarFormulario(){
    this.cadastrar = true;
  }

  esconderFormulario(){
    this.cadastrar = false;
  }

  mostrarPesquisa(){
    this.pesquisar = true;
  }

  esconderPesquisa(){
    this.pesquisar = false;
  }

  carregarClientes(){
    this.clienteService.listaClientes().subscribe({
      next: (listaClientes) => this.clientes = listaClientes.sort((a, b) => (a.nome ?? '').localeCompare(b.nome ?? '')),
      error: () => ("Erro durante o processo de listagem de clientes")
    })
  }

  carregarUfs() {
     this.brasilapiService.listarUFs().subscribe({
      next: (listaEstados) => this.estados = listaEstados.sort((a,b) => a.nome.localeCompare(b.nome)),
      error: erro => console.log("Error: ", erro)
    }); 
    }

  carregarMunicipios(event: Event): void{
    const ufSelecionada = (event.target as HTMLSelectElement).value;
    this.brasilapiService.listarMunicipios(ufSelecionada).subscribe({
      next: (listaMunicipios) => this.municipios = listaMunicipios.sort((a,b) => a.nome.localeCompare(b.nome)),
      error: erro => console.log("Error: ", erro)
    })
  }

  
  isCampoInvalido(campo: string): boolean {
    const nomeCampo = this.cadastroForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }


  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK',{ duration: 3000});
  } 


  }





