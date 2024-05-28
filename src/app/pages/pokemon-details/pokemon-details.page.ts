import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/api/poke-api.service';
import { PokemonResponse } from 'src/app/services/api/types';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})


export class PokemonDetailsPage implements OnInit {
  id: number = 0;

  
  private activatedRoute: ActivatedRoute;
  private pokeApiService: PokeApiService;
  public pokemon: PokemonResponse | null;

  constructor( activatedRoute: ActivatedRoute, pokeApiService: PokeApiService) {
    this.activatedRoute = activatedRoute;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pokeApiService = pokeApiService;
    this.pokemon = null;
  }

  async getPokemon(id: number){
    this.pokemon = await this.pokeApiService.getPokemon(id);
    console.log(this.pokemon)
  }
    
  ngOnInit() {
    this.getPokemon(this.id)
  }

}
