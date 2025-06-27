import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'

import { BellIcon } from './svg/BellIcon'
import { TrayIcon } from './svg/TrayIcon'
import { UserAddIcon } from './svg/UserAddIcon'
import { MarketplaceIcon } from './svg/MarketplaceIcon'
import { SearchIcon } from './svg/SearchIcon'
import { HelpIcon } from './svg/HelpIcon'
import { ProductSwitcherIcon } from './svg/ProductSwitcherIcon'
import { UserMenu } from './UserMenu'

export function HeaderActions({ user }) {
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
    // console.log('Search clicked')
  }

  function onNotificationsClick() {
    // console.log('Notifications clicked')
  }

  function onHelpClick() {
    // console.log('Help clicked')
  }

  return (
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
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </div>
  )
}