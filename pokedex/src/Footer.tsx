import { useLocation } from 'react-router-dom'

const Footer = () => {
  const path = useLocation().pathname
  return (
    <footer>
      <div
        className="container footer-container"
        style={{
          color: path === '/legendaries' ? 'white' : 'black',
        }}
      >
        <span>Made with ❤️ for more salary</span>
        <span>Our Team</span>
      </div>
    </footer>
  )
}

export default Footer
