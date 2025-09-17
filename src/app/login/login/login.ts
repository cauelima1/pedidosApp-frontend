import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../login-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {senhasIguaisValidator} from '../../login/verificarSenha'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  snack: MatSnackBar = inject(MatSnackBar);
  loginForm: FormGroup;
  cadastroForm: FormGroup;
  isCadastro: boolean = false;



constructor(private service: LoginService, private route: ActivatedRoute,
    private router: Router){

      this.cadastroForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }
    , { validators: senhasIguaisValidator });

    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    

  }

  registro(){
    this.cadastroForm.markAllAsTouched;
  
    if(this.cadastroForm.valid){
      this.service.salvar(this.cadastroForm.value).subscribe({
        next: (res: any) =>  this.mostrarMensagem('Cadastro com sucesso!'),
        error: (err: any) => {
          this.mostrarMensagem('Erro: Usuário já cadastrado!');
        } 
      });
      } 
    }
  
  login () {
    this.loginForm.markAllAsTouched;

    if(this.loginForm.valid){
      this.service.logar(this.loginForm.value);
    } 
  }

  irParaRegistro(){
    this.isCadastro = true;
  }

  voltar (){
    this.isCadastro = false;
  }

  isCampoValidoLogin (campo: string) : boolean {
    const nomeCampo = this.loginForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

    isCampoValidoCadastro (campo: string) : boolean {
    const nomeCampo = this.cadastroForm.get(campo);
    return nomeCampo?.invalid && nomeCampo?.touched || false;
  }

    mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK',{ duration: 3000});
  } 
}
