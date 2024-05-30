import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/api/poke-api.service';
import { PokemonResponse } from 'src/app/services/api/types';
import { FavoritePokemonService } from 'src/app/services/local-storage/favorite-pokemon.service';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})


export class PokemonDetailsPage implements OnInit {
  id: number = 0;
  isFavorite: boolean = false;
  
  private activatedRoute: ActivatedRoute;
  private pokeApiService: PokeApiService;
  private favoritePokemonService: FavoritePokemonService;
  public pokemon: PokemonResponse | null;

  constructor( activatedRoute: ActivatedRoute, pokeApiService: PokeApiService, favoritePokemonService: FavoritePokemonService) {
    this.activatedRoute = activatedRoute;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pokeApiService = pokeApiService;
    this.pokemon = null;
    this.favoritePokemonService = favoritePokemonService;
    this.isFavorite = false;
  }

  async getPokemon(id: number){
    this.pokemon = await this.pokeApiService.getPokemon(id);
    console.log(this.pokemon)
  }

  async setPokemon(){
    if(this.isFavorite){
      console.log('O pokémon já está favoritado.')
    }else{
      await this.favoritePokemonService.setPokemon(this.id, this.pokemon?.name ?? '');
      this.checkIsfavorite()
    }
  }

  async checkIsfavorite(){
    this.isFavorite = await this.favoritePokemonService.checkIsFavorite(this.id);
    console.log(this.isFavorite)
  }
    
  ngOnInit() {
    this.getPokemon(this.id);
    this.favoritePokemonService.initStorage();
    this.checkIsfavorite();
  }

}
