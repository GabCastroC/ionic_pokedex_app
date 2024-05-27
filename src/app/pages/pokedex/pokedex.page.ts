import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/api/poke-api.service';
import { ItemPokemon } from 'src/app/services/api/types';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})


export class PokedexPage implements OnInit {
  pokemons: ItemPokemon[] = [];
  next: string = '';
  previous: string = '';
  count: string = '';
  // pokemonDetails: PokemonResponse | null = null;

  private pokeApiService: PokeApiService;
  constructor(pokeapiService: PokeApiService) {
    this.pokeApiService = pokeapiService;
  }

  async getPokemons(){
    try {
      const response = await this.pokeApiService.getPokemons();
      this.pokemons = response.results;
      this.next = response.next;
      this.previous = response.previous;
      this.count = response.count; 
    } catch (error) {
      console.log(error)
    }
  }

  // async getPokemon(url: string){
  //   const response = await this.pokeApiService.getPokemon(url);
  //   this.pokemonDetails = response;
  // }

  ngOnInit() {
    this.getPokemons();
  }

}
