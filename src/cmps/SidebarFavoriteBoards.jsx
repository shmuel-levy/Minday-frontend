import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { FavoriteToggleIcon } from './icons/FavoriteToggleIcon'
import { ArrowDownUpIcon } from './svg/ArrowDownUpIcon'
import { BoardIconSidebar } from './svg/BoardIconSidebar'

export function SidebarFavoriteBoards() {
    const [isOpen, setIsOpen] = useState(false)
    const boards = useSelector(storeState => storeState.boardModule.boards) || []
    const navigate = useNavigate()
    const location = useLocation()
    
    const favoriteBoards = boards.filter(board => board.isStarred)

    function handleHeaderClick() {
        setIsOpen(!isOpen)
    }

    function onBoardClick(boardId) {
        navigate(`/board/${boardId}`)
    }

    return (
        <section className="sidebar-favorites">
            <div className={`sidebar-item section-header ${isOpen ? 'open' : ''}`} onClick={handleHeaderClick}>
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
                            <img src="https://microfrontends.monday.com/mf-leftpane/latest/static/media/favorites-empty-.99fa5473.svg" alt="No favorite items image"></img>
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
        </section>
    )
}