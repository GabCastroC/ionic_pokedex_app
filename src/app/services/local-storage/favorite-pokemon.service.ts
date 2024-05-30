import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ItemPokemon } from '../api/types';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private storage: Storage;
  private favorites_pokemons: any;

  constructor(storage: Storage) {  
     this.storage = storage;
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
      console.log('Pokemon favoritado');
    }catch(error){
      console.error('Erro ao salvar Pokémons favoritos:', {error});
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
      console.log(error)
      return false
    }
  }

  async removeFavoritePokemon(id: number){
    const favorites_pokemons = await this.getFavoritesPokemons() ?? [];
    const removed_pokemon = favorites_pokemons.filter((pokemon: ItemPokemon) => pokemon.id !== id);
    await this.storage.set('favorites_pokemons_id', JSON.stringify(favorites_pokemons));
  }

}
