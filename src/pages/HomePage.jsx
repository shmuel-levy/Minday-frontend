import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user'

export function HomePage() {
    const boards = useSelector(storeState => storeState.boardModule.boards) || []
    const navigate = useNavigate()

    return (
        <div className="home-page">
            <div className="home-header">
                <h1>Good morning, {userService.getLoggedinUser()?.fullname || 'Guest'}!</h1>
                <p>Quickly access your recent boards, Inbox and workspaces</p>
            </div>

            <div className="recently-visited">
                <h2>Recently visited</h2>
                
                <div className="boards-grid">
                    {boards.map(board => (
                        <div 
                            key={board._id}
                            className="board-card"
                            onClick={() => navigate(`/board/${board._id}`)}
                        >
                            <div className="board-preview">
                                <img 
                                    src="/src/assets/img/boardIndex.svg" 
                                    alt="Board preview"
                                    className="board-preview-img"
                                />
                            </div>
                            
                            <div className="board-info">
                                <div className="board-title">{board.title}</div>
                                <div className="board-workspace">work management • Main workspace</div>
                            </div>
                            
                            <button className="star-btn">⭐</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="update-feed">
                <h2>Update feed (Inbox)</h2>
                <div className="inbox-empty">
                    <div className="inbox-icon">📨</div>
                    <div className="inbox-number">0</div>
                    <div className="inbox-text">No updates yet</div>
                </div>
            </div>

            <div className="my-workspaces">
                <h2>My workspaces</h2>
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
            </div>
        </div>
    )
}