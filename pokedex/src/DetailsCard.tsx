import { ReactElement } from 'react'
import Ability from './Ability'
import './DetailsCard.css'
import { colors } from './config'
import { Pokemon } from './types'

const DetailsCard = ({
  closeButton,
  pokemon,
}: {
  closeButton: ReactElement
  pokemon: Pokemon
}) => {
  return (
    <div className="details-card">
      <div className="close-btn">{closeButton}</div>
      <div className="level-details">
        <h2>Generation {pokemon.generation}</h2>
        <span className="level">{pokemon.base_experience}</span>
      </div>
      <div
        className="image-box"
        style={{ background: colors.get(pokemon.type) }}
      >
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt="" />
        <div className="tags">
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
      <div className="info-box">
        <h1>{pokemon.name}</h1>
        <div className="details-card-abilities">
          <h3>Abilities</h3>
          {pokemon.abilities.join('—')}
        </div>
        <div className="details-card-abilities">
          <div className="details-card-ability-container">
            <Ability name={'Healthy Points'} value={pokemon.stats.hp} />
            <Ability name={'Experience'} value={pokemon.stats.experience} />
          </div>
        </div>
        <div className="card-prop-container">
          <div>
            <h2>{pokemon.stats.attack}</h2>
            <h6>Attack</h6>
          </div>
          <div>
            <h2>{pokemon.stats.defense}</h2>
            <h6>Defense</h6>
          </div>
          <div>
            <h2>{pokemon.stats['special-attack']}</h2>
            <h6>Sp Attack</h6>
          </div>
          <div>
            <h2>{pokemon.stats['special-defense']}</h2>
            <h6>Sp Defense</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsCard
