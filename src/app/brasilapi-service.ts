import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.models';


@Injectable({
  providedIn: 'root'
})
export class BrasilapiService implements OnInit {
  
  baseUrl = 'https://brasilapi.com.br/api';
 
   constructor(private http: HttpClient) { 
  } 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listarUFs() : Observable<Estado[]> {
    const path = '/ibge/uf/v1';
    console.log("Passou por aqui listando as ufs ", this.http.get<Estado[]>(this.baseUrl + path));
    return this.http.get<Estado[]>(this.baseUrl + path);
  }

  listarMunicipios(ufSelecionada: string) : Observable<Municipio[]> {
    const path = `/ibge/municipios/v1/${ufSelecionada}`;
    return this.http.get<Municipio[]>(this.baseUrl + path);
  }



}
