
export type PokemonsResponse = {
    count: number,
    next: string,
    previous: string,
    results: ItemPokemon[]
}

export type ItemPokemon = {
    name: string,
    url: string,
    id: number    
}

// export type PokemonResponse = {
//     abilities: Ability[],
//     height: number,
//     weight: number,
//     types: Type[]    
// }

// type Ability = {
//     ability: {
//         name: string
//     }
//     is_hidden: boolean
// }

// type Type = {
//     slot: number,
//     type: {
//         name: string
//     }
// }
 