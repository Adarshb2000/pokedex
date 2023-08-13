import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const body = document.body
  body!.style.background = 'var(--yellow-gradient)'
  body!.style.backgroundRepeat = 'no-repeat'
  body!.style.backgroundAttachment = 'fixed'
  return (
    <div className="home">
      <div className="cover-text">
        <h1>
          Find <span style={{ fontWeight: 400 }}>all your favourite</span>{' '}
          Pokemon
        </h1>
        <p>
          You can know the type of Pokemon, its strengths, disadvantages and
          abilities
        </p>
        <Link to="/pokedex" className="btn">
          See Pokemons
        </Link>
      </div>
      <div className="banner">
        <img src="images/banner.png" alt="banner" />
      </div>
    </div>
  )
}

export default Home
