import { Type } from "src/model/Type";

// Define a interface para um objeto Pokemon.
export interface Pokemon{
    image: string,
    number: number;
    name: string;
    types: Type[];
}

// Função para obter a URL da imagem de um Pokemon específico.
export function getPokemonImage(pokemon: Pokemon): string {
    // Função para obter a URL da imagem de um Pokemon específico.
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPokemonNumber(pokemon)}.png`
}

// Função para obter o número do Pokemon formatado.
export function getPokemonNumber(pokemon: Pokemon){
    // Chama a função leadingZero para formatar o número com zeros à esquerda.
    return leadingZero(pokemon.number);
}

// Função para adicionar zeros à esquerda de uma string ou número.
export function leadingZero (str: string | number, size = 3): string {
    // Converte a entrada para uma string.
    let s = String(str);

    // Adiciona zeros à esquerda até que o comprimento da string seja igual ao tamanho especificado.
    while (s.length < (size || 2)){
        // Adiciona um zero à esquerda.
        s = '0' + s;
    }
    // Retorna a string formatada.
    return s;
}