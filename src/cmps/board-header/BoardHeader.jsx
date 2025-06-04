import { BoardTitleSection } from './BoardTitleSection'
import { BoardActions } from './BoardActions'
import { ViewControls } from './ViewControls'
import { TableControls } from './TableControls'

export function BoardHeader({ board, onUpdateBoard, onAddNewTask, onAddNewGroup }) {
    return (
        <div className="board-header">
            <div className="board-header-top">
                <BoardTitleSection 
                    board={board}
                    onUpdateBoard={onUpdateBoard}
                />
                <div className="board-header-right">
                    <BoardActions />
                </div>
            </div>
            
            <div className="board-header-bottom">
                <ViewControls />
                <TableControls onAddNewTask={onAddNewTask} onAddNewGroup={onAddNewGroup} />
            </div>
        </div>
    )
}