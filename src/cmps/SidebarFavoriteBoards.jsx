import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { FavoriteToggleIcon } from './svg/FavoriteToggleIcon'
import { ArrowDownUpIcon } from './svg/ArrowDownUpIcon'
import { BoardIconSidebar } from './svg/BoardIconSidebar'
import { StarIcon } from './svg/StarIcon'


export function SidebarFavoriteBoards({ isOpen, onToggle }) {
  const boards = useSelector(storeState => storeState.boardModule.boards) || []
  const navigate = useNavigate()
  const location = useLocation()

  const favoriteBoards = boards.filter(board => board.isStarred)

  function onBoardClick(boardId) {
    navigate(`/board/${boardId}`)
  }

  return (
    <section className={`sidebar-favorites ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-item section-header" onClick={onToggle}>
        <StarIcon isStarred={isOpen} />
        <span className="title">Favorites</span>
        <span className="chevron">
          <ArrowDownUpIcon direction={isOpen ? 'up' : 'down'} />
        </span>
      </div>

      <div className={`favorites-content ${isOpen ? 'open' : ''}`}>
        {favoriteBoards.length === 0 ? (

          <section className='empty-msg-container flex column align-center '>
            <div className="empty-msg flex column align-center justify-center">
              <img src="https://microfrontends.monday.com/mf-leftpane/latest/static/media/favorites-empty-.99fa5473.svg" alt="No favorite items" />
              <p className="empty-msg-title">Your favorites are empty</p>
              <p className='empty-msg-text'>Add your boards, docs, or dashboards for a quick access.</p>
            </div>
          </section>
        ) : (
          <div className="workspace-boards">
            {favoriteBoards.map(board => (
              <div
                key={board._id}
                className={`board-item ${location.pathname === `/board/${board._id}` ? 'active' : ''}`}
                onClick={() => onBoardClick(board._id)}
              >
                <BoardIconSidebar />
                <span className="board-title">{board.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
