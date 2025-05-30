import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { StarToggle } from './svg/StarToggle'
import { updateBoard } from '../store/board.actions'

export function SidebarBoardsList({ boards }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onToggleStar(ev, board) {
    ev.stopPropagation()
    const updatedBoard = { ...board, isStarred: !board.isStarred }
    dispatch(updateBoard(updatedBoard))
  }

  return (
    <div className="workspace-boards">
      {boards.map(board => (
        <div
          key={board._id}
          className={`board-item ${location.pathname === `/board/${board._id}` ? 'active' : ''}`}
          onClick={() => navigate(`/board/${board._id}`)}
        >
          <img className='board-icon' src='src/assets/img/sideBar-b.svg' />
          <span>{board.title}</span>
        </div>
      ))}

      <div className="board-item add-board" onClick={() => navigate('/board')}>
        <span className="icon">+</span>
        <span>Add board</span>
      </div>
    </div>
  )
}
