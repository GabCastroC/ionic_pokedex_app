import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsFavoritesPage } from './pokemons-favorites.page';

describe('PokemonsFavoritesPage', () => {
  let component: PokemonsFavoritesPage;
  let fixture: ComponentFixture<PokemonsFavoritesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsFavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
