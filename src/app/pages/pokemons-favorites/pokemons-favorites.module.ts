import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonsFavoritesPageRoutingModule } from './pokemons-favorites-routing.module';

import { PokemonsFavoritesPage } from './pokemons-favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonsFavoritesPageRoutingModule
  ],
  declarations: [PokemonsFavoritesPage]
})
export class PokemonsFavoritesPageModule {}
