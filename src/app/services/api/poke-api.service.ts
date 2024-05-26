import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type pokemonResponse = {
  entry_number: number;
  pokemon_species: {
    name: string, url: string
  } 
}


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(public http: HttpClient) { }

  getPokemons(): Promise<pokemonResponse[]>{
    return new Promise((resolve, reject) => {
      this.http.get("https://pokeapi.co/api/v2/pokedex/2").subscribe((data: any) => {
        return resolve(data.pokemon_entries);
      }, (err: any) => {
        return reject(err);
      })
    }); 
  }
}
