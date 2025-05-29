import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { UserAvatar } from './UserAvatar'

export function UserMenu({ user }) {
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

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('Bye now')
      navigate('/')
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <button className="user-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar src={user?.imgUrl} fullname={user?.fullname || 'Guest'} />
      </button>

      {isOpen && (
        <section className="user-dropdown">
          <ul>
            <li>
              <Link to={`/user/${user?._id || 'guest'}`}>My Profile</Link>
            </li>
            <li>
              <button className="link-like-btn">Switch Account</button>
            </li>
            <li>
              <button className="link-like-btn">Trash</button>
            </li>
            <li>
              {user ? (
                <button className="link-like-btn logout" onClick={onLogout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </section>
      )}
    </div>
  )
}