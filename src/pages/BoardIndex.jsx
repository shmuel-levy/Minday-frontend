import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loadBoards, toggleBoardStar } from '../store/board.actions.js'
import { userService } from '../services/user/index.js'
import { StarIcon } from '../cmps/svg/StarIcon.jsx'
import { BoardIcon } from '../cmps/svg/BoardIcon.jsx'

export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards) || []
    const navigate = useNavigate()
    const [isRecentlyVisitedCollapsed, setIsRecentlyVisitedCollapsed] = useState(false)
    const [isMyWorkspacesCollapsed, setIsMyWorkspacesCollapsed] = useState(false)

    useEffect(() => {
        loadBoards()
    }, [])

    function onBoardClick(boardId) {
        navigate(`/board/${boardId}`)
    }

    function onStarClick(e, boardId) {
        e.stopPropagation()
        toggleBoardStar(boardId)
    }

   function getBoardPreview(board) {
    const templates = [
        './quick-search.svg',
        './quick-search2.svg', 
        './boardIndex.svg'
    ]
    const templateIndex = board._id ? board._id.length % templates.length : 0
    return templates[templateIndex]
}

    return (
        <div className="board-index">
          
            <div className="board-index-header">
                <div className="welcome-section">
                    <h1>Good morning, {userService.getLoggedinUser()?.fullname || 'Guest'}!</h1>
                    <p>Quickly access your recent boards, Inbox and workspaces</p>
                </div>
            </div>

         
            <div className="recently-visited-section">
                <div className="section-header" onClick={() => setIsRecentlyVisitedCollapsed(!isRecentlyVisitedCollapsed)}>
                    <svg 
                        className={`dropdown-arrow ${isRecentlyVisitedCollapsed ? 'collapsed' : ''}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="currentColor"
                    >
                        <path d="M4.427 7.427a.6.6 0 0 1 .849 0L8 10.15l2.724-2.723a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.85 0L4.427 8.276a.6.6 0 0 1 0-.849Z"/>
                    </svg>
                    <h2>Recently visited</h2>
                </div>
                
                {!isRecentlyVisitedCollapsed && (
                    <div className="boards-grid">
                        {boards.length > 0 ? (
                            boards.map(board => (
                                <div 
                                    key={board._id}
                                    className="board-card"
                                    onClick={() => onBoardClick(board._id)}
                                >
                                    <div className="board-preview">
                                        <img 
                                            src={getBoardPreview(board)}
                                            alt="Board preview"
                                            className="board-preview-img"
                                        />
                                    </div>
                                    
                                    <div className="board-info">
                                        <div className="board-title-row">
                                            <BoardIcon />
                                            <div className="board-title">{board.title}</div>
                                            <StarIcon 
                                                isStarred={board.isStarred || false}
                                                onClick={(e) => onStarClick(e, board._id)}
                                            />
                                        </div>
                                        <div className="board-workspace">
                                            <img 
                                                src="/src/assets/img/work-management-icon.png" 
                                                alt="Work management"
                                                className="workspace-icon"
                                            />
                                            work management • Main workspace
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">📋</div>
                                <h3>No boards yet</h3>
                                <p>Create your first board to get started</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

         
            <div className="update-feed-section">
                <div className="section-header" onClick={() => console.log('Toggle update feed')}>
                    <svg 
                        className="dropdown-arrow"
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="currentColor"
                    >
                        <path d="M4.427 7.427a.6.6 0 0 1 .849 0L8 10.15l2.724-2.723a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.85 0L4.427 8.276a.6.6 0 0 1 0-.849Z"/>
                    </svg>
                    <h2>Update feed (Inbox)</h2>
                    <div className="inbox-count">0</div>
                </div>
            </div>

            <div className="my-workspaces-section">
                <div className="section-header" onClick={() => setIsMyWorkspacesCollapsed(!isMyWorkspacesCollapsed)}>
                    <svg 
                        className={`dropdown-arrow ${isMyWorkspacesCollapsed ? 'collapsed' : ''}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="currentColor"
                    >
                        <path d="M4.427 7.427a.6.6 0 0 1 .849 0L8 10.15l2.724-2.723a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.85 0L4.427 8.276a.6.6 0 0 1 0-.849Z"/>
                    </svg>
                    <h2>My workspaces</h2>
                    <div className="info-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM7.25 4.75a.75.75 0 0 1 1.5 0v2.5a.75.75 0 0 1-1.5 0v-2.5ZM8 10a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 10Z"/>
                        </svg>
                    </div>
                </div>

                {!isMyWorkspacesCollapsed && (
                    <div className="workspace-card">
                        <div className="workspace-icon">M</div>
                        <div className="workspace-info">
                            <div className="workspace-name">Main workspace</div>
                            <div className="workspace-type">work management</div>
                        </div>
                        <div className="workspace-member">
                            <div className="member-avatar">
                                {userService.getLoggedinUser()?.fullname?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}