import { BoardTitleSection } from './BoardTitleSection'

export function BoardHeader({ board, onUpdateBoard }) {
    return (
        <div className="board-header">
            {/* Top Section: Title + Actions + Members */}
            <div className="board-header-top">
                <BoardTitleSection 
                    board={board} 
                    onUpdateBoard={onUpdateBoard} 
                />
                
                <div className="board-header-right">
                    {/* TODO: Add BoardActions component */}
                    <div className="placeholder-actions">
                        <button className="btn">Integrate</button>
                        <button className="btn">Automate</button>
                        <button className="btn-primary">Invite / 1</button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: View Controls + Table Controls */}
            <div className="board-header-bottom">
                {/* TODO: Add ViewControls component */}
                <div className="placeholder-views">
                    <button className="view-btn active">📋 Main table</button>
                </div>
                
                <div className="board-controls-right">
                    {/* TODO: Add QuickActions and TableControls */}
                    <div className="placeholder-controls">
                        <button className="btn-new-task">New task</button>
                        <button className="btn-control">🔍 Search</button>
                        <button className="btn-control">👤 Person</button>
                        <button className="btn-control">🔽 Filter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}