import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/api/poke-api.service';
import { ItemPokemon } from 'src/app/services/api/types';
import { Router } from '@angular/router';

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
  private router: Router;
  private loading = false;
  
  constructor(pokeapiService: PokeApiService, router: Router) {
    this.pokeApiService = pokeapiService;
    this.router = router;
  }

  async getPokemons(url?: string){
    try {
      this.loading = true;
      const response = await this.pokeApiService.getPokemons(url);
      this.pokemons = url ? [...this.pokemons, ...response.results] : response.results;
      this.next = response.next;
      this.previous = response.previous;
      this.count = response.count; 
    } catch (error) {
      console.log(error)
    }finally {
      this.loading = false; 
  }
  }

  async loadData(event: any) {
    if (this.next && !this.loading) {
        await this.getPokemons(this.next);
        event.target.complete();
    }
  }

  onRowClick(pokemon: any){
    this.router.navigate(['/pokemon-details', pokemon.id])
  }

  ngOnInit() {
    this.getPokemons();
    console.log(this.router)
  }

}
