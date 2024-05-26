import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/api/poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})


export class PokedexPage implements OnInit {
  pokemons: any = [];
  search: string = '';

  private pokeApiService: PokeApiService;
  constructor(pokeapiService: PokeApiService) {
    this.pokeApiService = pokeapiService;
  }

  async getPokemons(){
    try {
      this.pokemons = await this.pokeApiService.getPokemons();
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit() {
    console.log(this.getPokemons());
  }

}
