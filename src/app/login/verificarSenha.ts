import {AbstractControl, ValidationErrors} from '@angular/forms'

export function senhasIguaisValidator(formGroup: AbstractControl): ValidationErrors | null {
  const senha = formGroup.get('password')?.value;
  const confirmar = formGroup.get('confirmPassword')?.value;
  return senha === confirmar ? null : { senhasDiferentes: true };
}