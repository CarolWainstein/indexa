import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  // private contatos: Contato[] = [
  //   { "id": 1, "nome": "Ana", "telefone": "29 278869420", "email": "email@emal.com" },
  // ]

  private readonly API = 'http://localhost:3000/contatos'

  constructor(private http: HttpClient) {
    /*
    // Tentar obter os dados do localStorage
    const contatosLocalStorageString = localStorage.getItem('contatos');
    const contatosLocalStorage = contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : null;

    // Atribuir contatos do localStorage se existirem, caso contrário, usar o array inicial
    this.contatos = contatosLocalStorage || this.contatos;

    // Salvar os contatos no localStorage
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
    */


  }

  obterContatos(): Observable<Contato[]> {
    // return this.contatos;
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato): Observable<Contato>{
    // this.contatos.push(contato);
    // localStorage.setItem('contatos', JSON.stringify(this.contatos));

    return this.http.post<Contato>(this.API, contato)
  }

  buscarPorId(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.get<Contato>(url)
  }

  excluirContato(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.delete<Contato>(url)
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`
    return this.http.put<Contato>(url, contato)
  }

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if(contato.id) {
      return this.editarContato(contato)
    } else {
      return this.salvarContato(contato)
    }
  }
}