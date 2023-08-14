import { readFileSync } from 'fs'
import path from 'path'

export const TYPES = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'poison',
  'psychic',
  'ghost',
  'fairy',
  'rock',
  'ground',
  'bug',
]

export const LEGENDARIES = [
  'Articuno',
  'Diance',
  'Dragonair',
  'Fareon',
  'MewTwo',
  'Moltres',
  'Xerneas',
  'Zapdos',
]

export const randint = (a = 0, b) => {
  if (!b) {
    b = a
    a = 0
  }
  return Math.floor(Math.random() * (b - a) + a)
}

export const choice = (array) => {
  return array[randint(array.length)]
}

const charGenerator = () => {
  return 'abcdefghijklmnopqrstuvwxyz'[randint(26)]
}

const wordGenerator = () => {
  return Array.from({ length: randint(3, 10) }, charGenerator).join('')
}

export const generateLegendaries = () => {
  const bleh = {
    legendaries: [
      'MewTwo',
      'Articuno',
      'Diance',
      'Dragonair',
      'Flareon',
      'Moltres',
      'Xerneas',
      'Zapdos',
    ],
    stronger: [
      'Xerneas',
      'Articuno',
      'Diance',
      'Dragonair',
      'Flareon',
      'Moltres',
      'MewTwo',
      'Zapdos',
    ],
    weaker: [
      'Zapdos',
      'Articuno',
      'Diance',
      'Dragonair',
      'Flareon',
      'MewTwo',
      'Moltres',
      'Xerneas',
    ],
  }
  return Object.entries(bleh).map(([type, pokemons]) => {
    return {
      type: type,
      pokemons: pokemons.map((pokemon) => {
        return {
          name: pokemon,
          description: Array.from({ length: randint(35, 50) }, wordGenerator)
            .join(' ')
            .slice(0, 150),
          image: Buffer.from(
            readFileSync(`legendaries-images/${pokemon}.png`)
          ).toString('base64'),
          stats: {
            hp: randint(100, 500),
            attack: randint(100, 500),
            defense: randint(100, 500),
            'special-attack': randint(100, 500),
            'special-defense': randint(100, 500),
            experience: randint(100, 500),
          },
        }
      }),
    }
  })
}
