import { useState } from 'react'
import Ability from './Ability'
import './Legendaries.css'
import { LegendaryPokemon } from './types'

const LegendaryCard = ({
  pokemon,
  active,
}: {
  pokemon: LegendaryPokemon
  active: boolean
}) => {
  return (
    <div className={'legendary-card ' + (active ? 'active' : '')}>
      <img src={`data:image/png;base64,${pokemon.image}`} alt="pokemon" />
      <p>
        <span>{pokemon.name}</span>
        <img src="public/images/golden-pokeball.svg" alt="pokeball" />
      </p>
    </div>
  )
}

const LegendariesDisplay = ({
  legendary,
}: {
  legendary: { type: string; pokemons: LegendaryPokemon[] }
}) => {
  const [activePokemon, setActivePokemon] = useState(0)
  console.log(typeof legendary.pokemons[0].image.data)

  return (
    <div className="legendaries">
      <h1>{legendary.type}</h1>
      <hr />
      <div className="legend-info">
        <img
          src={`data:image/png;base64,${legendary.pokemons[activePokemon].image}`}
          alt="pokemon-img"
        />
        <div>
          <h2>{legendary.pokemons[activePokemon].name}</h2>
          <p></p>
          <p>{legendary.pokemons[activePokemon].description}</p>
          <div className="abilities">
            {Object.entries(legendary.pokemons[activePokemon].stats).map(
              ([ability, value]) => (
                <Ability name={ability} value={value} key={Math.random()} />
              )
            )}
          </div>
        </div>
      </div>
      <div className="selector">
        <button
          onClick={() => {
            setActivePokemon(
              (activePokemon - 1 + legendary.pokemons.length) %
                legendary.pokemons.length
            )
            document.querySelector('.legendary-card.active')?.scrollIntoView({
              block: 'nearest',
              behavior: 'smooth',
              inline: 'center',
            })
          }}
        >
          <img src="public/images/arrow-left.svg" alt="" />
        </button>
        <div>
          {legendary.pokemons.map((pokemon, index) => (
            <button onClick={() => setActivePokemon(index)}>
              <LegendaryCard
                pokemon={pokemon}
                active={index === activePokemon}
                key={index + pokemon.name}
              />
            </button>
          ))}
        </div>
        <button
          className="shift-right"
          onClick={() => {
            document.querySelector('.legendary-card.active')?.scrollIntoView({
              block: 'nearest',
              behavior: 'smooth',
              inline: 'center',
            })
            setActivePokemon((activePokemon + 1) % legendary.pokemons.length)
          }}
        >
          <img src="public/images/arrow-right.svg" alt="" />
        </button>
      </div>
    </div>
  )
}

export default LegendariesDisplay
