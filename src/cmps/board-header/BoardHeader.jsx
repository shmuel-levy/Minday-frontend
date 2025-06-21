import { BoardTitleSection } from './BoardTitleSection'
import { BoardActions } from './BoardActions'
import { ViewControls } from './ViewControls'
import { TableControls } from './TableControls'

export function BoardHeader({ board, onUpdateBoard, onAddNewTask, onAddNewGroup, currentView, onViewChange, onAddWidget, addWidgetBtnRef }) {
    
    return (
        <section className="board-header-container grid">
            <div className="board-header-info">
                <BoardTitleSection 
                    board={board} 
                    onUpdateBoard={onUpdateBoard}
                />    
            </div>

            <div className="board-header-action flex align-center">
                <BoardActions />
            </div>

            <div className="board-header-navigation">
                <ViewControls 
                    currentView={currentView}
                    onViewChange={onViewChange}
                />
            </div>

            <div className="board-header-contextualAction">
                <TableControls 
                    onAddNewTask={onAddNewTask}
                    onAddNewGroup={onAddNewGroup}
                    boardType={board.type || 'Items'}
                    currentView={currentView}
                    onAddWidget={onAddWidget}
                    addWidgetBtnRef={addWidgetBtnRef}
                />
            </div>
        </section>
    )
}