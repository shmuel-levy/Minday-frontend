import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { UserMenu } from './UserMenu'


import { BellIcon } from './svg/BellIcon'
import { TrayIcon } from './svg/TrayIcon'
import { UserAddIcon } from './svg/UserAddIcon'
import { MarketplaceIcon } from './svg/MarketplaceIcon'
import { SearchIcon } from './svg/SearchIcon'
import { HelpIcon } from './svg/HelpIcon'
import { ProductSwitcherIcon } from './svg/ProductSwitcherIcon'
import { UserAvatar } from './UserAvatar'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onSearchClick() {
    console.log('Search clicked')
  }

  function onNotificationsClick() {
    console.log('Notifications clicked')
  }

  function onHelpClick() {
    console.log('Help clicked')
  }

  return (
    <header className="app-header flex align-center justify-between">
      <Link to="/" className="logo-container">
        <div className="logo flex align-center">
          <button className="product-logo">
            <img
              className="work-management-logo"
              src="src/assets/img/work-management-icon.png"
              alt="product-logo"
            />
          </button>
          <span className="logo-main">minday</span>
          <span className="logo-description">work management</span>
        </div>
      </Link>

      <div className="actions-container flex align-center">
        <button className="btn" onClick={onNotificationsClick}>
          <BellIcon className="bell-icon" />
        </button>

        <button className="btn">
          <TrayIcon className="tray-icon" />
        </button>

        <button className="btn">
          <UserAddIcon className="userAdd-icon" />
        </button>

        <button className="btn">
          <MarketplaceIcon className="marketplace-icon" />
        </button>

        <button className="btn" onClick={onSearchClick}>
          <SearchIcon className="search-icon" />
        </button>

        <button className="btn" onClick={onHelpClick}>
          <HelpIcon className="help-icon" />
        </button>

        <div className="divider"></div>

        <button className="btn">
          <ProductSwitcherIcon className="productSwitcher-icon" />
        </button>

        <div className="user-section">
          {!user ? (
            <Link to="/login" className="login-btn">
              <div className="user-img-container flex align-center justify-center">
                <img
                  className="account-logo"
                  src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                  alt="Logo"
                />
                <UserAvatar fullname="Guest" />
              </div>
            </Link>
          ) : (
            <div className="user-info-container">
              <Link to={`/user/${user._id}`} className="user-profile-link">
                <div className="user-img-container flex align-center justify-center">
                  <img
                    className="account-logo"
                    src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                    alt="Logo"
                  />
                  <UserAvatar src={user.imgUrl} fullname={user.fullname} />
                </div>
              </Link>

              <div className="user-menu">
                <span className="user-name">{user.fullname}</span>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
