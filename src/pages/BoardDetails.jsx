import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, updateBoard } from '../store/board.actions'
import { BoardHeader } from '../cmps/board-header/BoardHeader'
import { BoardTable } from '../cmps/BoardTable'
import { BoardDashboard } from './BoardDashboard'
import { TaskDetailModal } from '../cmps/task-detail-modal/TaskDetailModal'
import { AddWidgetModal } from '../cmps/dashboard/AddWidgetModal'
import { makeId } from '../services/util.service'

export function BoardDetails({ openTaskId, setOpenTaskId }) {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const boardTableRef = useRef(null)
    const addWidgetBtnRef = useRef(null)
    const [boardForModal, setBoardForModal] = useState(null)
    const [views, setViews] = useState([{ id: makeId(), type: 'table', name: 'Main Table' }])
    const [activeViewId, setActiveViewId] = useState(views[0].id)
    const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false)
    const [addWidgetButtonRef, setAddWidgetButtonRef] = useState(null)

    const activeView = views.find(v => v.id === activeViewId) || views[0]

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

    function handleAddView(viewType) {
        const viewName = viewType.charAt(0).toUpperCase() + viewType.slice(1)
        const newView = { id: makeId(), type: viewType, name: viewName }
        setViews(prevViews => [...prevViews, newView])
        setActiveViewId(newView.id)
    }

    function handleUpdateView(viewId, newType) {
        setViews(prevViews =>
            prevViews.map(view =>
                view.id === viewId ? { ...view, type: newType, name: newType.charAt(0).toUpperCase() + newType.slice(1) } : view
            )
        )
    }

    function handleSetActiveView(viewId) {
        setActiveViewId(viewId)
    }

    function handleOpenAddWidgetModal(buttonRef) {
        setAddWidgetButtonRef(buttonRef)
        setIsAddWidgetModalOpen(true)
    }

    function handleSelectWidget(widget) {
    }

    function handleUpdateViews(newViews) {
        setViews(newViews)
    }

    if (!board) {
        return <div>Loading board...</div>
    }

    return (
        <section className={`board-details ${openTaskId ? 'with-modal' : ''} ${activeView.type}`}>
            <BoardHeader
                board={board}
                onUpdateBoard={handleUpdateBoard}
                onAddNewTask={handleAddNewTask}
                onAddNewGroup={handleAddNewGroup}
                views={views}
                activeViewId={activeViewId}
                onAddView={handleAddView}
                onUpdateView={handleUpdateView}
                onSetActiveView={handleSetActiveView}
                onAddWidget={handleOpenAddWidgetModal}
                addWidgetBtnRef={addWidgetBtnRef}
                onUpdateViews={handleUpdateViews}
            />

            <div className="board-content-container">
                {activeView.type === 'table' ? (
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
                            onAddWidget={() => handleOpenAddWidgetModal(addWidgetBtnRef)}
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

            <AddWidgetModal
                isOpen={isAddWidgetModalOpen}
                onClose={() => setIsAddWidgetModalOpen(false)}
                onSelectWidget={handleSelectWidget}
                buttonRef={addWidgetButtonRef}
            />
        </section>
    )
}