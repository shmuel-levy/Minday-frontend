import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon } from './svg/HomeIcon'
import { CalendarIcon } from './svg/CalendarIcon'
import { ArrowIcon } from './svg/ArrowIcon'

import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarFavoriteBoards } from './SidebarFavoriteBoards'

export function Sidebar() {
  const boards = useSelector(storeState => storeState.boardModule.boards) || []
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isHomeActive = location.pathname === '/'

  useState(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? '30px' : '280px'
    )
  }, [isCollapsed])

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className={isCollapsed ? 'rotated' : ''}>
          <ArrowIcon />
        </span>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-header">
        <div
          className={`sidebar-item ${isHomeActive ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <HomeIcon />
          {!isCollapsed && <span>Home</span>}
        </div>

        <div className="sidebar-item" onClick={() => navigate('/my-work')}>
          <CalendarIcon />
          {!isCollapsed && <span>My work</span>}
        </div>
        </div>

        {!isCollapsed && (
          <>
            <hr className="divider" />

            <SidebarFavoriteBoards boards={boards} />
            
            <hr className="divider" />

            <SidebarBoardsList boards={boards} />
          </>
        )}
      </div>
    </aside>
  )
}