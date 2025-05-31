import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { FavoriteToggleIcon } from './icons/FavoriteToggleIcon'
import { ArrowDownUpIcon } from './svg/ArrowDownUpIcon'
import { BoardIconSidebar } from './svg/BoardIconSidebar'

export function SidebarFavoriteBoards() {
    const [isOpen, setIsOpen] = useState(true)
    const boards = useSelector(storeState => storeState.boardModule.boards) || []
    const navigate = useNavigate()
    const location = useLocation()
    
    // Filter boards to show only starred ones
    const favoriteBoards = boards.filter(board => board.isStarred)

    function handleHeaderClick() {
        setIsOpen(!isOpen)
    }

    function onBoardClick(boardId) {
        navigate(`/board/${boardId}`)
    }

    return (
        <section className="sidebar-favorites">
            <div className={`section-header ${isOpen ? 'open' : ''}`} onClick={handleHeaderClick}>
                <FavoriteToggleIcon isFavorite={isOpen} />
                <span className="title">Favorites</span>
                <span className="chevron">
                    <ArrowDownUpIcon direction={isOpen ? 'up' : 'down'} />
                </span>
            </div>

            {isOpen && (
                <div className="favorites-content">
                    {favoriteBoards.length === 0 ? (
                        <div className="empty-msg">
                            <p className="bold">Your favorites are empty</p>
                            <p>Add your boards, docs, or dashboards for a quick access.</p>
                        </div>
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
            )}
            <hr className="divider" />
        </section>
    )
}