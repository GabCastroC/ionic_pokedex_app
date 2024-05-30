import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsFavoritesPage } from './pokemons-favorites.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonsFavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonsFavoritesPageRoutingModule {}
