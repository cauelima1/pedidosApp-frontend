import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../login-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {senhasIguaisValidator} from '../../login/verificarSenha'
import { UtilServices } from '../../util-services';

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



constructor(private service: LoginService, private router: Router, private utilService: UtilServices){

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
        next: () =>  this.utilService.mostrarMensagem('Cadastro com sucesso!'),
        error: () =>this.utilService.mostrarMensagem('Erro: Usuário já cadastrado!')
      });
      } 
    }
  
  login () {
    this.loginForm.markAllAsTouched;

    if(this.loginForm.valid){
      this.service.logar(this.loginForm.value).subscribe({
          next: (token) => { 
            this.service.saveToken(token);
            this.utilService.mostrarMensagem("Login efetuado com sucesso");
            this.router.navigate(['/home']);},
          error: () => this.utilService.mostrarMensagem("Falha no Login")});
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


}
