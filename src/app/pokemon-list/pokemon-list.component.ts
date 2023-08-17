import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/model/Pokemon';
import { Type } from 'src/model/Type';
import { PokemonService } from 'src/service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  // public pokemons: Pokemon[] = [
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
  //     number: 1,
  //     name: 'Bulbasaur',
  //     types: [
  //       Type.Grass,
  //       Type.Poison,
  //     ],
  //   },
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png',
  //     number: 2,
  //     name: 'Ivysaur',
  //     types: [
  //       Type.Grass,
  //       Type.Poison,
  //     ],
  //   },
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
  //     number: 3,
  //     name: 'Venosaur',
  //     types: [
  //       Type.Grass,
  //       Type.Poison,
  //     ],
  //   },
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
  //     number: 4,
  //     name: 'Charmander',
  //     types: [
  //       Type.Fire,
  //     ],
  //   },
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
  //     number: 5,
  //     name: 'Charmeleon',
  //     types: [
  //       Type.Fire,
  //     ],
  //   },
  //   {
  //     image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
  //     number: 6,
  //     name: 'Charizard',
  //     types: [
  //       Type.Fire,
  //     ],
  //   },
  // ];

   // Página atual que está sendo exibida.
  currentPage = 1;
  // Lista de Pokemon a ser exibida na página.
  pokemonList: Pokemon[] = [];

  constructor(public pokemonService: PokemonService){}

  // Função que é executada quando o componente é inicializado.
  ngOnInit(): void {
    // Carrega a página de Pokemon com o número da página atual.
    this.loadPokemonPage(this.currentPage);
  }

  // Carrega a página de Pokemon com base no número da página.
  loadPokemonPage(pageNumber: number): void {
    this.pokemonService.getPokemonPage(pageNumber).subscribe(pokemonPage => {
      // Atualiza a lista de Pokemon exibida.
      this.pokemonList = pokemonPage;
    });
  }

  // Navega para a página anterior, se disponível.
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonPage(this.currentPage);
    }
  }

  // Navega para a próxima página.
  goToNextPage(): void {
    this.currentPage++;
    this.loadPokemonPage(this.currentPage);
  }

}