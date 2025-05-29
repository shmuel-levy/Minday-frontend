import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HeaderActions } from './HeaderActions'
import{WorkspaceIcon} from "../cmps/svg/WorkspaceIcon"

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <header className="app-header flex align-center justify-between">
      <Link to="/" className="logo-container">
        <div className="logo flex align-center">
          <button className="product-logo">
            <WorkspaceIcon/>
          </button>
          <span className="logo-main">minday</span>
          <span className="logo-description">work management</span>
        </div>
      </Link>

      <HeaderActions user={user} />
    </header>
  )
}