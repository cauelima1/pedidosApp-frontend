import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl} from'@angular/forms';
import { Estado, Municipio } from '../../brasilapi.models';
import { BrasilapiService } from '../../brasilapi-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from './clienteModel';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../cliente-service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-cliente-component',
  standalone: false,
  templateUrl: './cliente-component.html',
  styleUrl: './cliente-component.scss'
})
export class ClienteComponent implements OnInit  {
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  cadastrar: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);


  camposForm: FormGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      cep: new FormControl(''),
      endereco: new FormControl(''),
      municipio: new FormControl(''),
      uf : new FormControl(''),
      df: new FormControl(''),
      contribuinteICMS: new FormControl('')
    });

    constructor (private brasilapiService: BrasilapiService,
                 private clienteService: ClienteService) {}


  ngOnInit(): void {
    this.carregarUfs();
  }



    
  consultar () {
    //implementar a partir do backend
  }


  salvar() {
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      let clienteDto = {
        id: 0,
        nome: String(this.camposForm.value.nome),
        cnpj: Number(this.camposForm.value.cnpj),
        cep: String(this.camposForm.value.cep),
        endereco: String(this.camposForm.value.endereco),
        municipio: String(this.camposForm.value.municipio),
        uf: String(this.camposForm.value.uf),
        df: Number(this.camposForm.value.df),
        isContribuinteICMS: !!this.camposForm.value.contribuinteICMS
      };
      console.log("Salvando cliente: ", clienteDto);
      this.clienteService.saveCliente(clienteDto);
    }
    
  }

  mostrarFormulario(){
    this.cadastrar = true;
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
    const nomeCampo = this.camposForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }


  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK',{ duration: 3000});
  } 






  }





