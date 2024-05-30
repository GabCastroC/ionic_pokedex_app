
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

export type PokemonResponse = {
    abilities: Ability[],
    height: number,
    weight: number,
    types: Type[]
    name: string,
    order: number
    stats: Stat[]    
}

type Ability = {
    ability: {
        name: string
    }
}

type Type = {
    slot: number,
    type: {
        name: string
    }
}

type Stat = {
    "base_stat": number,
    "effort": number,
    "stat": {
        "name": string,
        "url": string
    }
}
 