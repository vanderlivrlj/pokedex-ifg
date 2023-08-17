import { Component, Input } from '@angular/core';
import { Pokemon, getPokemonImage, getPokemonNumber } from 'src/model/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  // Recebe o Pokemon como entrada do componente.
  @Input('pokemon')
  public pokemon: Pokemon;

  // Associa a função getPokemonImage para que ela possa ser usada no template.
  public getPokemonImage = getPokemonImage;
  // Associa a função getPokemonNumber para que ela possa ser usada no template.
  public getPokemonNumber = getPokemonNumber;

  
}
