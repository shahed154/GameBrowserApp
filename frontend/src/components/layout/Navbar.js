import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import './Navbar.css'

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useContext(UserContext)

  /////// LOGOUT HANDLER ///////
  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="nav">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          GameBrowser
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-item">
            Home
          </Link>
          
          <Link to="/swipe" className="nav-item">
            Swipe
          </Link>
          
          {isAuthenticated && (
            <Link to="/profile" className="nav-item">
              My Profile
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              <span className="nav-item">
                {currentUser?.username}
              </span>
              <button 
                className="btn btn-secondary nav-item" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/account" 
              className="btn btn-primary nav-item"
            >
              Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar