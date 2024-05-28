import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResponse, PokemonsResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(public http: HttpClient) {}

  async getPokemons(url?: string): Promise<any>{
    const response = await this.http.get<PokemonsResponse>(url ?? 'https://pokeapi.co/api/v2/pokemon?offset=N&limit=M').toPromise();
    if(!response) return;
    response.results = response.results.map((pokemon) => {
      const id = +pokemon.url.split('/')[6]
      return {
        ...pokemon,
        id
      }
    });
    return response;
  }

  getPokemon(id: number): Promise<PokemonResponse>{
    return new Promise((resolve, reject) => {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data: any) => {
      return resolve(data);
      }, (err: any) => {
        return reject(err);
      })
    });
  }
}