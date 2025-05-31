import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { WorkspaceSidebar } from './svg/WorkspaceSidebar'
import { CreateBoardModal } from './CreateBoardModal'
import { BoardIconSidebar } from './svg/BoardIconSidebar'

export function SidebarBoardsList({ boards }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <section className="sidebar-workspaces">
            <div className="section-title workspace-title">
                <WorkspaceSidebar />
                <span>Workspaces</span>
            </div>

            <div className="workspace-header">
                <span className="workspace-icon">M</span>
                <div>
                    <div className="workspace-name">Main workspace</div>
                    <div className="workspace-type">work management</div>
                </div>
                <button 
                    className="add-board-btn"
                    onClick={() => setIsCreateModalOpen(true)}
                    title="Create board"
                >
                    +
                </button>
            </div>

            <div className="workspace-boards">
                {boards.map(board => (
                    <div
                        key={board._id}
                        className={`board-item ${location.pathname === `/board/${board._id}` ? 'active' : ''}`}
                        onClick={() => navigate(`/board/${board._id}`)}
                    >
                        <BoardIconSidebar />
                        <span className="board-title">{board.title}</span>
                    </div>
                ))}
            </div>

            <CreateBoardModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </section>
    )
}