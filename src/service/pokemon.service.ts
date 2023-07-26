import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/model/Pokemon';
import { ReplaySubject, map, mergeMap, switchMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    this.httpClient.get<any>(url).pipe(
      map( value => value.results),
      map(pokemon =>{
        console.log(pokemon);
        return from(pokemon).pipe(
          mergeMap((v: any) => this.httpClient.get(v.url))
        )
      }), 
      mergeMap(pokemon => pokemon),
      ).subscribe((result: any) => {
        console.log(result);
        const pokemon: Pokemon = {
          image: result.sprites.front_default,
          number: result.id,
          name: result.name,
          types: result.types.map((t:any ) => t.type.name), 
        };
        this.pokemons[result.id] = pokemon;
        });
   }
}
