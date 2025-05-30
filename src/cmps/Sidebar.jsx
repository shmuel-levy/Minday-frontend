import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon } from './svg/HomeIcon'
import { CalendarIcon } from './svg/CalendarIcon'
import { updateBoard } from '../store/board.actions'
import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarFavoriteBoards } from './SidebarFavoriteBoards'

export function Sidebar() {
  const boards = useSelector(storeState => storeState.boardModule.boards) || []
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  function onToggleStar(ev, board) {
    ev.stopPropagation()
    const updatedBoard = { ...board, isStarred: !board.isStarred }
    dispatch(updateBoard(updatedBoard))
  }

  const isHomeActive = location.pathname === '/'
  const favoriteBoards = boards.filter(board => board.isStarred)

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className={isCollapsed ? 'rotated' : ''}>
          <img src="src/assets/img/arrowLeft.svg" />
        </span>
      </div>

      <div className="sidebar-content">
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

        {!isCollapsed && (
          <>
            {favoriteBoards.length > 0 && (
              <>
                <div className="sidebar-item section-title">Favorites</div>
                <SidebarFavoriteBoards boards={boards} onToggleStar={onToggleStar} />
              </>
            )}

            <div className="sidebar-item section-title">Workspaces</div>
            <div className="workspace">
              <div className="workspace-header">
                <span className="workspace-icon">M</span>
                <div>
                  <div className="workspace-name">Main workspace</div>
                  <div className="workspace-type">work management</div>
                </div>
              </div>

              <SidebarBoardsList boards={boards}/>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
