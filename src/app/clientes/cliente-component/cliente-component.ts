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
  formDesabilitado: boolean = true;



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
      obs: new FormControl('')

 });
 
}


  ngOnInit(): void {
    this.carregarUfs();
    this.carregarClientes();
  }

  
  salvar() {
    this.cadastroForm.markAllAsTouched();

    if(this.pesquisar){
      this.esconderPesquisa();
    }
    if(this.cadastroForm.valid){
      const dfOriginal = this.cadastroForm.get('df')?.value ?? '';
      const dfCorrigido = dfOriginal.replace(/,/g, '.');
      this.cadastroForm.get('df')?.setValue(dfCorrigido);
      console.log("DF de " , this.clienteSelecionado.nome , "é " , this.clienteSelecionado.df);
        this.clienteService.saveCliente(this.cadastroForm.value).subscribe({
          next: () => {this.mostrarMensagem("Cliente cadastrado com sucesso")
            this.esconderFormulario();
            this.cadastroForm.reset();
            this.carregarClientes();
        },
          error: ()=> this.mostrarMensagem("Ocorreu algum erro, verifique e tente novamente!")
    });
    }
}

    
  consultar () {
    if(this.cadastrar){
      this.esconderFormulario();
    }
    if(this.selecionarCliente){
      this.clienteSelecionado = this.clientes.find(c => c.nome === this.selecionarCliente?.nome)!;
      console.log("Cliente selecionado", this.clienteSelecionado);
      this.pesquisar = true;
    } else {
      this.mostrarMensagem("Nenhum cliente selecionado");
    }  

  }

  alterarCliente(){
     const dfOriginal = this.clienteSelecionado.df;
     if(dfOriginal){
      const dfCorrigido = dfOriginal.replace(/,/g, '.');
      this.clienteSelecionado.df = dfCorrigido;
      console.log("DF de " , this.clienteSelecionado.nome , "é " , this.clienteSelecionado.df);
     }
    this.clienteService.confirmarAlteracao(this.clienteSelecionado).subscribe({
      next: () => { this.mostrarMensagem("Cliente alterado com sucesso!")
        this.esconderPesquisa()
        this.carregarClientes()
      },
      error: () => this.mostrarMensagem("Erro ao alterar cliente!")
    });
  }



  deletar(){
    const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?');
    const cnpj = this.clienteSelecionado.cnpj;
    if (confirmar && cnpj){
      this.clienteService.deletarCliente(cnpj).subscribe({
        next: () => this.mostrarMensagem("Cliente deletado com sucesso!"),
        error: () => this.mostrarMensagem("Falha ao deletar cliente!")
      })
    }
    window.location.reload();
  }


  limparFormulario(){
    this.cadastroForm.reset();
  }

  mostrarFormulario(){
    this.cadastrar = true;
    if(this.pesquisar){
      this.pesquisar=false;
    }
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





