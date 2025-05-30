import { useNavigate, useLocation } from 'react-router-dom'
import { StarToggle } from './svg/StarToggle'

export function SidebarFavoriteBoards({ boards, onToggleStar }) {
  const navigate = useNavigate()
  const location = useLocation()

  const favoriteBoards = boards.filter(board => board.isStarred)

  if (!favoriteBoards.length) return <div className="empty-text">No favorite boards yet</div>

  return (
    <div className="favorite-boards">
      {favoriteBoards.map(board => (
        <div
          key={board._id}
          className={`board-item ${location.pathname === `/board/${board._id}` ? 'active' : ''}`}
          onClick={() => navigate(`/board/${board._id}`)}
        >
          <img className="board-icon" src="src/assets/img/sideBar-b.svg" />
          <span>{board.title}</span>
          <StarToggle
            isFilled={board.isStarred}
            onToggle={(ev) => onToggleStar(ev, board)}
          />
        </div>
      ))}
    </div>
  )
}
