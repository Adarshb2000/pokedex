import './ErrorPage.css'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="error-page container">
      <div>
        <img src="images/team-rocket.png" alt="team-rocket" />
        <h1>404</h1>
      </div>
      <h2>
        <span>The rocket team</span> has won this time.
      </h2>
      <Link to="/">Return</Link>
    </div>
  )
}

export default ErrorPage
