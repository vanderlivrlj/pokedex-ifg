import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/model/Pokemon';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly pageSize = 10;  // Tamanho da página

  constructor(private httpClient: HttpClient) {}

  // Busca uma página específica de Pokémon
  public getPokemonPage(pageNumber: number): Observable<Pokemon[]> {
    const offset = (pageNumber - 1) * this.pageSize;
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.pageSize}&offset=${offset}`;

    return this.httpClient.get<any>(url).pipe(
      map(response => response.results),
      switchMap(pokemonResults => this.fetchDetailedPokemonData(pokemonResults))
    );
  }

  // Busca dados detalhados de cada Pokémon individual
  private fetchDetailedPokemonData(pokemonResults: any[]): Observable<Pokemon[]> {
    const pokemonObservables: Observable<Pokemon>[] = pokemonResults.map(pokemonResult => {
      return this.httpClient.get<any>(pokemonResult.url).pipe(
        map(detailedResult => this.mapToPokemon(detailedResult))
      );
    });
    return forkJoin(pokemonObservables);
  }

  // Mapeia os dados detalhados de um Pokémon
  private mapToPokemon(result: any): Pokemon {
    return {
      image: result.sprites.front_default,
      number: result.id,
      name: result.name,
      types: result.types.map((t: any) => t.type.name),
    };
  }
}
