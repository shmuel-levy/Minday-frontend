import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, updateBoard } from '../store/board.actions'
import { BoardHeader } from '../cmps/board-header/BoardHeader'
import { BoardTable } from '../cmps/BoardTable'
import { BoardDashboard } from './BoardDashboard'
import { TaskDetailModal } from '../cmps/task-detail-modal/TaskDetailModal'

export function BoardDetails({ openTaskId, setOpenTaskId }) {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const boardTableRef = useRef(null)
    const [boardForModal, setBoardForModal] = useState(null)
    const [currentView, setCurrentView] = useState('table')

    useEffect(() => {
        if (boardId) {
            loadBoard(boardId).then((board) => {
                console.log('Loaded board:', board)
                if (!board || !board._id) return

                const storageKey = 'recentBoards'
                const stored = JSON.parse(localStorage.getItem(storageKey)) || []
                const filtered = stored.filter(b => b && b._id && b._id !== board._id)
                const updated = [board, ...filtered].slice(0, 4)
                localStorage.setItem(storageKey, JSON.stringify(updated))
            })
        }
    }, [boardId])

    async function handleUpdateBoard(updatedBoard) {
        try {
            await updateBoard(updatedBoard)
            showSuccessMsg('Board updated successfully')
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    function handleOpenUpdates(taskId, boardSnapshot) {
        setOpenTaskId(taskId)
        setBoardForModal(boardSnapshot)
    }

    function handleAddNewTask() {
        if (boardTableRef.current && boardTableRef.current.handleAddNewTask) {
            boardTableRef.current.handleAddNewTask()
        }
    }

    function handleAddNewGroup() {
        if (boardTableRef.current && boardTableRef.current.handleAddGroupAtTop) {
            boardTableRef.current.handleAddGroupAtTop()
        }
    }

    function handleViewChange(view) {
        setCurrentView(view)
    }

    if (!board) {
        return <div>Loading board...</div>
    }

    return (
        <section className={`board-details ${openTaskId ? 'with-modal' : ''} ${currentView}`}>
            <BoardHeader
                board={board}
                onUpdateBoard={handleUpdateBoard}
                onAddNewTask={handleAddNewTask}
                onAddNewGroup={handleAddNewGroup}
                currentView={currentView}
                onViewChange={handleViewChange}
            />

            <div className="board-content-container">
                {currentView === 'table' ? (
                    <div className="board-table-container">
                        <BoardTable
                            ref={boardTableRef}
                            board={board}
                            onUpdateTask={handleUpdateBoard}
                            onAddNewTask={(task, groupId) => { }}
                            onOpenUpdates={handleOpenUpdates}
                        />
                    </div>
                ) : (
                    <div className="board-dashboard-container">
                        <BoardDashboard
                            board={board}
                            onUpdateBoard={handleUpdateBoard}
                        />
                    </div>
                )}
            </div>
            
            {openTaskId && (
                <TaskDetailModal
                    taskId={openTaskId}
                    board={boardForModal}
                    onClose={() => setOpenTaskId(null)}
                />
            )}
        </section>
    )
}