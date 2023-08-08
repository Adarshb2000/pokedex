import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Navbar from './Navbar'
import Modal from './Modal'

const Header = () => {
  const [modal, showModal] = useState(false)
  const [mobileView, setMobileView] = useState(window.innerWidth <= 480)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobileView(window.innerWidth <= 480)
    })
  }, [])

  return (
    <header>
      <div className="container flex-container h-full">
        <img src="/public/images/logo.svg" alt="logo" className="logo" />
        {mobileView ? (
          <div className="shift-right">
            <button
              onClick={() => {
                showModal(true)
              }}
              className="mobile-nav-open"
            >
              <img src="/public/images/burgen-btn.svg" alt="menuButton" />
            </button>
          </div>
        ) : (
          <Navbar />
        )}
      </div>
      {modal ? (
        <Modal className="mobile-nav" closeModal={() => showModal(false)}>
          <div>
            <button
              className="close-icon"
              onClick={() => {
                showModal(false)
              }}
            >
              <img src="public/images/close-icon.svg" alt="close" />
            </button>
            <Link to="/">
              <img src="public/images/logo.svg" alt="Logo" />
            </Link>
            <Navbar />
          </div>
        </Modal>
      ) : null}
    </header>
  )
}

export default Header
