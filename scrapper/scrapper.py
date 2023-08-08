from requests import get
from random import randint, choice
import json

TYPES = list(map(lambda i : i.capitalize(), ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'poison', 'psychic', 'ghost', 'fairy']))
pokemons = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Psyduck', 'Meowth', 'Geodude', 'Onix', 'Cubone', 'Starmie', 'Mr. Mime', 'Gyarados', 'Snorlax', 'Mewtwo', 'Pidgeotto', 'Gastly', 'Kingler', 'Butterfree', 'Clefairy', 'Dugtrio', 'Staryu', 'Ditto', 'Magikarp', 'Togepi', 'Wobbuffet', 'Bayleef', 'Eevee', 'Weezing', 'Gengar', 'Ponyta', 'Poliwrath', 'Arcanine']

REQUIRED_STATS = {'hp', 'attack', 'defense', 'special-attack', 'special-defense', 'experience'}

abilities = set()

POKEMON_DATA = []

# name: string
# base_experience: int
# abilities[1|2]: [string]
# type: string
# stats[6]: [{name: stat, value: base_value}]
# generation


print('Starting...')


for pokemon in pokemons:
    print(f'Getting data on {pokemon}.')
    try:
        ret = get('https://pokeapi.co/api/v2/pokemon/' + pokemon.lower())
        details = ret.json()
        data = { 'name' : pokemon }
        data['base_experience'] = details['base_experience']
        data['abilities'] = [ability['ability']['name'] for ability in details['abilities']][: 2]
        data['type'] = details['types'][0]['type']['name'].capitalize()
        addedStats = set()
        stats = {}
        for stat in details['stats']:
            name = stat['stat']['name']
            value = stat['base_stat']
            if name not in REQUIRED_STATS:
                continue
            stats[name] = value
            addedStats.add(name)

        for stat in REQUIRED_STATS:
            if stat in addedStats:
                continue

            stats[stat] = randint(40, 100)

        data['stats'] = stats
        data['weakness'] = choice(TYPES).capitalize()
        data['image'] = details['sprites']['front_default']

        data['generation'] = randint(1, 5)

        POKEMON_DATA.append(data)
    
        print(f'Got data on {pokemon}.')
    except Exception as e:
        print(f'Couldn\'t get data on {pokemon} because of {e}')
        continue

with open('data.json', 'w') as file:
    file.write(json.dumps(POKEMON_DATA))



