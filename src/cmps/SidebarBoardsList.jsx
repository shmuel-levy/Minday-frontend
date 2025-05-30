import { useLocation, useNavigate } from 'react-router-dom'

export function SidebarBoardsList({ boards }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section className="sidebar-workspaces">
      <div className="section-title">Workspaces</div>

      <div className="workspace-header">
        <span className="workspace-icon">M</span>
        <div>
          <div className="workspace-name">Main workspace</div>
          <div className="workspace-type">work management</div>
        </div>
      </div>

      <div className="workspace-boards">
        {boards.map(board => (
          <div
            key={board._id}
            className={`board-item ${location.pathname === `/board/${board._id}` ? 'active' : ''}`}
            onClick={() => navigate(`/board/${board._id}`)}
          >
            <img className="board-icon" src="src/assets/img/sideBar-b.svg" />
            <span>{board.title}</span>
          </div>
        ))}

        <div className="board-item add-board" onClick={() => navigate('/board')}>
          <span className="icon">+</span>
          <span>Add board</span>
        </div>
      </div>
    </section>
  )
}
