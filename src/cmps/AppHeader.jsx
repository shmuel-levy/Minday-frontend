export function AppHeader() {
  return (
    <header className="app-header flex align-center justify-between">
      {/* <Link to="/"> */}
        <div className="logo-container">
          <div className="logo flex align-center">
            <button className="product-logo">
               <img className=">work management-logo"src="src/assets/img/work-management-icon.png"alt="product-logo"/>
            </button>
          <span className="logo-main">minday</span>
          <span className="logo-description">work management</span>
          </div>
        </div>
      {/* </Link> */}

      <div className="actions-container flex align-center">
        <button className="btn">
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

        <button className="btn">
          <img src="src/assets/img/search.svg" alt="Search" />
        </button>

        <button className="btn">
          <img src="src/assets/img/help.svg" alt="Help" />
        </button>

        <div className="divider"></div>

        <button className="btn">
          <img 
            src="src/assets/img/production switcher.svg"
            alt="Production Switcher" className="production-switcher"
          />
        </button>

        <div className="user-img-container flex align-center justify-center">
          <img  className="account-logo"src="src/assets/img/favicon.svg" alt="Favicon" />
          <img  className="user-img" src="src/assets/img/user.svg" alt="User" />
        </div>
      </div>
    </header>
  )
}