import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  loadingButton: boolean = false;
  
  private activatedRoute: ActivatedRoute;
  private pokeApiService: PokeApiService;
  private favoritePokemonService: FavoritePokemonService;
  public pokemon: PokemonResponse | null;
  private toastController: ToastController 


  constructor( activatedRoute: ActivatedRoute, pokeApiService: PokeApiService, favoritePokemonService: FavoritePokemonService, toastController: ToastController) {
    this.activatedRoute = activatedRoute;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.pokeApiService = pokeApiService;
    this.pokemon = null;
    this.favoritePokemonService = favoritePokemonService;
    this.isFavorite = true;
    this.toastController = toastController;
  }

  async getPokemon(id: number){
    this.pokemon = await this.pokeApiService.getPokemon(id);
  }

  async setPokemon(){
    this.loadingButton = true;
    try {
      if(this.isFavorite){
        const toast = await this.toastController.create({
          message: 'Este pokemon já está favoritado!',
          duration: 3000,
          position: 'top',
        });
        await toast.present();
      }else{
        await this.favoritePokemonService.setPokemon(this.id, this.pokemon?.name ?? '');
        await this.checkIsfavorite()
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: `Erro ao favoritar o pokémon: ${error}`, 
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }finally{
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    }

  }

  async checkIsfavorite(){
    try {
      this.isFavorite = await this.favoritePokemonService.checkIsFavorite(this.id);
    } catch (error) {
      console.log(error)
    }
  }
  
  async unfavoritePokemon(){
    this.loadingButton = true;
    try {
      await this.favoritePokemonService.unfavoritePokemon(this.id);
      this.checkIsfavorite();
    } catch (error) {
      const toast = await this.toastController.create({
        message: `Erro ao desfavoritar o pokémon: ${error}`, 
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }finally{
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    }
  } 

  ngOnInit() {
    this.getPokemon(this.id);
    this.favoritePokemonService.initStorage();
    this.checkIsfavorite();
  }

}
