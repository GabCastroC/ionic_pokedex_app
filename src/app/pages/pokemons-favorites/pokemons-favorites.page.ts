import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PokeApiService } from 'src/app/services/api/poke-api.service';
import { ItemPokemon } from 'src/app/services/api/types';
import { FavoritePokemonService } from 'src/app/services/local-storage/favorite-pokemon.service';
@Component({
  selector: 'app-pokemons-favorites',
  templateUrl: './pokemons-favorites.page.html',
  styleUrls: ['./pokemons-favorites.page.scss'],
})
export class PokemonsFavoritesPage implements OnInit {
  
  pokemons:  ItemPokemon[] = [];

  private favoritePokemonService: FavoritePokemonService;
  private router: Router;
  private pokeApiService: PokeApiService;

  constructor(favoritePokemonService: FavoritePokemonService, router: Router, pokeApiService: PokeApiService){
    this.favoritePokemonService = favoritePokemonService;
    this.pokeApiService = pokeApiService;
    this.router = router;
  }

  async getFavoritesPokemons(){
    try {
      this.pokemons = await this.favoritePokemonService.getFavoritesPokemons();
      console.log(this.pokemons)
    } catch (error) {
      console.error(error);
    }
  }
  
  onRowClick(pokemon: any){
    this.router.navigate(['/pokemon-details', pokemon.id])
  }

  ngOnInit() {
    this.favoritePokemonService.initStorage();
    this.getFavoritesPokemons();
  }

}
