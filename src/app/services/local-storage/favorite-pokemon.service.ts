import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ItemPokemon } from '../api/types';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private storage: Storage;
  private toastController: ToastController;

  
  constructor(storage: Storage, toastController: ToastController) {  
     this.storage = storage;
     this.toastController = toastController;
  }

  async initStorage() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async setPokemon(id: number, name: string){
    try{
      const favorites_pokemons = await this.getFavoritesPokemons() ?? [];
      favorites_pokemons.push({
        'name': name,
        'id': id,
        'url': `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }); 
      await this.storage.set('favorites_pokemons_id', JSON.stringify(favorites_pokemons));
      const toast = await this.toastController.create({
        message: 'Pokemon favoritado com sucesso!',
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }catch(error){
      const toast = await this.toastController.create({
        message: `Erro ao favoritar o pokémon: ${error}`, 
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }
  }

  async getFavoritesPokemons() {
    try {
      const favorites_pokemons = await this.storage.get('favorites_pokemons_id');
      return JSON.parse(favorites_pokemons);
    } catch (error) {
      console.error(error);
    }
  }

  async checkIsFavorite(id: number){
    try {
      const favorites_pokemons = await this.storage.get('favorites_pokemons_id');
      const isFavorited = JSON.parse(favorites_pokemons).map(
        (pokemon: ItemPokemon) => pokemon.id
      ).includes(id);
      return isFavorited;
    } catch (error) {
      console.log(`Erro ao conferir se o pokemon está na lista dos favoritos: ${error}`); 
      return false
    }
  }

  async unfavoritePokemon(id: number){
    try{
      const favorites_pokemons = await this.getFavoritesPokemons() ?? [];
      const removed_pokemon = favorites_pokemons.filter((pokemon: ItemPokemon) => pokemon.id !== id);
      await this.storage.set('favorites_pokemons_id', JSON.stringify(removed_pokemon));
      const toast = await this.toastController.create({
        message: `Pokémon desfavoritado com sucesso.`, 
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }catch(error){
      const toast = await this.toastController.create({
        message: `Erro ao desfavoritar o pokémon: ${error}`, 
        duration: 3000,
        position: 'top',
      });
      await toast.present();
    }
  }

}
