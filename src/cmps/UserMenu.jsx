import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import{UserAvatar } from './UserAvatar.jsx'
import { Link } from 'react-router-dom'

export function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (menuRef.current && !menuRef.current.contains(ev.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <div className="user-btn-container" onClick={() => setIsOpen(!isOpen)}>
        <div className="user-img-container flex align-center">
          <img
            className="account-logo"
            src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
            alt="Logo"
          />
          <UserAvatar src={user?.imgUrl} fullname={user?.fullname || 'Guest'} />
        </div>
      </div>

      {isOpen && (
        <section className="user-dropdown">
          <ul>
            <li>
              <Link to={`/user/${user?._id || 'guest'}`}>👤 My Profile</Link>
            </li>
            <li>
              <button className="link-like-btn">🔄 Switch Account</button>
            </li>
            <li>
              <button className="link-like-btn">🗑️ Trash</button>
            </li>
            <li>
              {user ? (
                <button className="link-like-btn logout" onClick={onLogout}>🚪 Logout</button>
              ) : (
                <Link to="/login" className="link-like-btn">🔐 Login</Link>
              )}
            </li>
          </ul>
        </section>
      )}
    </div>
  )
}