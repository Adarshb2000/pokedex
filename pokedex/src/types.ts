export interface Pokemon {
  name: string
  base_experience: number
  abilities: string[]
  type: string
  weakness: string
  stats: {
    hp: number
    attack: number
    defense: number
    'special-attack': number
    'special-defense': number
    experience: number
  }
  image: string
  generation: number
}

export interface LegendaryPokemon {
  name: string
  description: string
  image: string
  stats: {
    hp: number
    attack: number
    defense: number
    'special-attack': number
    'special-defense': number
    experience: number
  }
}
