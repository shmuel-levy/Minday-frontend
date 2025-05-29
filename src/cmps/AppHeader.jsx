import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'

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
        // You can implement search functionality later
        console.log('Search clicked')
    }

    function onNotificationsClick() {
        // You can implement notifications later
        console.log('Notifications clicked')
    }

    function onHelpClick() {
        // You can implement help later
        console.log('Help clicked')
    }

    return (
        <header className="app-header flex align-center justify-between">
            {/* Logo section with navigation */}
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

            {/* Actions container with working functionality */}
            <div className="actions-container flex align-center">
                <button className="btn" onClick={onNotificationsClick}>
                    <img src="src/assets/img/notifications.svg" alt="Notifications" />
                </button>

                <button className="btn">
                    <img src="src/assets/img/update-feed.svg" alt="Update Feed" />
                </button>

                <button className="btn">
                    <img src="src/assets/img/invite-member.svg" alt="Invite Member" />
                </button>

                <button className="btn">
                    <img src="src/assets/img/marketplace.svg" alt="Marketplace" />
                </button>

                <button className="btn" onClick={onSearchClick}>
                    <img src="src/assets/img/search.svg" alt="Search" />
                </button>

                <button className="btn" onClick={onHelpClick}>
                    <img src="src/assets/img/help.svg" alt="Help" />
                </button>

                <div className="divider"></div>

                <button className="btn">
                    <img
                        src="src/assets/img/production switcher.svg"
                        alt="Production Switcher" 
                        className="production-switcher"
                    />
                </button>

                {/* User section with login/logout functionality */}
                <div className="user-section">
                    {!user ? (
                        <Link to="/login" className="login-btn">
                            <div className="user-img-container flex align-center justify-center">
                                <img className="account-logo" src="src/assets/img/favicon.svg" alt="Favicon" />
                                <img className="user-img" src="src/assets/img/user.svg" alt="User" />
                            </div>
                        </Link>
                    ) : (
                        <div className="user-info-container">
                            <Link to={`/user/${user._id}`} className="user-profile-link">
                                <div className="user-img-container flex align-center justify-center">
                                    <img className="account-logo" src="src/assets/img/favicon.svg" alt="Favicon" />
                                    {user.imgUrl ? (
                                        <img className="user-img" src={user.imgUrl} alt="User" />
                                    ) : (
                                        <div className="user-avatar">
                                            {user.fullname?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                            </Link>
                            
                            {/* User dropdown menu (you can style this as a dropdown later) */}
                            <div className="user-menu">
                                <span className="user-name">{user.fullname}</span>
                                <button onClick={onLogout} className="logout-btn">Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}