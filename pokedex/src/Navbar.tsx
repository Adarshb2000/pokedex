import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Navbar = () => {
  const path = useLocation().pathname
  return (
    <nav className="shift-right">
      <ul>
        <li>
          <Link to="/" className={path === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/pokedex" className={path === '/pokedex' ? 'active' : ''}>
            Pokédex
          </Link>
        </li>
        <li>
          <Link
            to="/legendaries"
            className={path === '/legendaries' ? 'active' : ''}
          >
            Legendaries
          </Link>
        </li>
        <li>
          <Link
            to="/documentation"
            className={path === '/documentation' ? 'active' : ''}
          >
            Documentation
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
