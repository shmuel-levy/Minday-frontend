import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { UserAvatar } from './UserAvatar.jsx'
import { Link } from 'react-router-dom'
import { ProfileIcon } from './svg/ProfileIcon'
import { SwitchAccountIcon } from './svg/SwitchAccountIcon'
import { TrashIcon } from './svg/TrashIcon'
import { LogoutIcon } from './svg/LogoutIcon'

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
          <div className="dropdown-header">
            <img 
              className="account-logo" 
              src="https://cdn.monday.com/images/logos/monday_logo_icon.png" 
              alt="Logo"
            />
            <span className="user-name">{user?.fullname || 'Guest'}</span>
          </div>
          <div className="dropdown-divider"></div>
          <ul>
            <li>
              <Link to={`/user/${user?._id || 'guest'}`} className="dropdown-item">
                <ProfileIcon />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <button className="dropdown-item">
                <SwitchAccountIcon />
                <span>Switch Account</span>
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                <TrashIcon />
                <span>Trash</span>
              </button>
            </li>
            <li>
              {user ? (
                <button className="dropdown-item logout" onClick={onLogout}>
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" className="dropdown-item">
                  <ProfileIcon />
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>
        </section>
      )}
    </div>
  )
}