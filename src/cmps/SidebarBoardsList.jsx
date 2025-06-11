import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { WorkspaceSidebar } from './svg/WorkspaceSidebar'
import { CreateBoardModal } from './CreateBoardModal'
import { BoardIconSidebar } from './svg/BoardIconSidebar'
import { AddBoard } from './svg/AddBoard'
import { ArrowDownUpIcon } from './svg/ArrowDownUpIcon'
import { HomeWorkspaceIcon } from './svg/HomeIconWorkspace'

export function SidebarBoardsList({ boards, favoritesOpen, onOpenBoardModal }) {
  const navigate = useNavigate()
  const location = useLocation()

  if (favoritesOpen) {
    return (
      <section className="sidebar-workspaces">
        <div className="sidebar-item" onClick={() => window.dispatchEvent(new CustomEvent('close-favorites'))}>
          <WorkspaceSidebar />
          <span className='title'>Workspaces</span>
          <span className="chevron">

            <ArrowDownUpIcon direction={favoritesOpen ? 'up' : ''} />

          </span>
        </div>
      </section>
    )
  }

  return (
    <section className="sidebar-workspaces">
      <div className="section-title workspace-title">
        <WorkspaceSidebar />
        <span>Workspaces</span>
      </div>

      <div className="workspace-container">
        <div className="workspace-header">
          <span className="workspace-icon">
            <div className='main-home-icon'>
              <HomeWorkspaceIcon />
            </div>
          M</span>
          <div>
            <div className="workspace-name">Main workspace</div>
          </div>
        </div>

        <button
          className="add-board-btn"
          onClick={onOpenBoardModal}
          title="Create board"
        >
          <AddBoard />
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

      {/* <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      /> */}
    </section>
  )
}
