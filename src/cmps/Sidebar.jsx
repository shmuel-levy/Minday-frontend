import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon } from './svg/HomeIcon'
import { CalendarIcon } from './svg/CalendarIcon '
import { StarToggle } from './svg/StarToggle'
import { updateBoard } from '../store/board.actions'


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

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                <span className={isCollapsed ? 'rotated' : ''}><img src='src/assets/img/arrowLeft.svg' /></span>
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
                        <div className="section-title">FAVORITES</div>
                        <div className="empty-text">No favorite boards yet</div>
                        <div className="section-title">WORKSPACES</div>
                        <div className="workspace">
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
                                      <img className='board-icon' src='src\assets\img\sideBar-b.svg'/>
                                        <span>{board.title}</span>
                                        {board.isStarred && <span className="star">⭐</span>}
                                    </div>
                                ))}
                                
                                <div className="board-item add-board" onClick={() => navigate('/board')}>
                                    <span className="icon">+</span>
                                    <span>Add board</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}