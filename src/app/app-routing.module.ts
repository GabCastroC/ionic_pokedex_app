import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full'
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./pages/pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: 'pokemon-details/:id',
    loadChildren: () => import('./pages/pokemon-details/pokemon-details.module').then( m => m.PokemonDetailsPageModule)
  },
  {
    path: 'pokemons-favorites',
    loadChildren: () => import('./pages/pokemons-favorites/pokemons-favorites.module').then( m => m.PokemonsFavoritesPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
