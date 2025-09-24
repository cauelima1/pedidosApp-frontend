import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilServices {
    snack: MatSnackBar = inject(MatSnackBar);
  

    mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK',{ duration: 3000});
  } 
}
