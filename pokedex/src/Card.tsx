import './Card.css'
import { backgrounds, colors } from './config'
import { Pokemon } from './types'

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(public/images/background/${backgrounds.get(
          pokemon.type
        )}.svg)`,
      }}
    >
      <div className="w-full">
        <h1>{pokemon.name}</h1>
        <div className="card-prop-container">
          <div className="card-property">
            <h2>{pokemon.stats.attack}</h2>
            <h6>Attack</h6>
          </div>
          <div className="card-property">
            <h2>{pokemon.stats.defense}</h2>
            <h6>Defense</h6>
          </div>
        </div>
        <div className="card-tag-container">
          <button
            style={{
              background: colors.get(pokemon.type) ?? colors.get('normal'),
            }}
          >
            {pokemon.type}
          </button>
          <button
            style={{
              background: colors.get(pokemon.weakness) ?? colors.get('normal'),
            }}
          >
            {pokemon.weakness}
          </button>
        </div>
      </div>
      <div className="card-image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
    </div>
  )
}

export default Card
