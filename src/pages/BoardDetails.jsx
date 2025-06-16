import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardActivity, updateBoard } from '../store/board.actions'
import { BoardHeader } from '../cmps/board-header/BoardHeader'
import { BoardTable } from '../cmps/BoardTable'
import { TaskDetailModal } from '../cmps/task-detail-modal/TaskDetailModal'
import  {boardService } from '../services/board/board.service.local'

export function BoardDetails({ openTaskId, setOpenTaskId }) {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const boardTableRef = useRef(null)
    const [boardForModal, setBoardForModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())


    useEffect(() => {
        if (boardId) {
            loadBoard(boardId).then((board) => {
                if (!board || !board._id) return
                const storageKey = 'recentBoards'
                const stored = JSON.parse(localStorage.getItem(storageKey)) || []
                const filtered = stored.filter(b => b && b._id && b._id !== board._id)
                const updated = [board, ...filtered].slice(0, 4)
                localStorage.setItem(storageKey, JSON.stringify(updated))
            })
        }
    }, [boardId])

    if (!board || board._id !== boardId) {
        return <div>Loading board...</div>
    }

    function handleUpdateBoard(updatedBoard) {
        updateBoard(updatedBoard)
            .then(() => showSuccessMsg('Board updated successfully'))
            .catch(() => showErrorMsg('Cannot update board'))
    }

    function handleSetFilterBy(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
}

    function handleOpenModal(taskId) {
        setOpenTaskId(taskId)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setOpenTaskId(null)
        setIsModalOpen(false)
    }

    function handleOpenUpdates(taskId, boardSnapshot) {
        setOpenTaskId(taskId)
        setBoardForModal(boardSnapshot)
    }

    function handleAddNewTask() {
        boardTableRef.current?.handleAddNewTask()
    }

    function handleAddNewGroup() {
        boardTableRef.current?.handleAddGroupAtTop()
    }

    return (
        <section className={`board-details ${openTaskId ? 'with-modal' : ''}`}>
            <BoardHeader
                board={board}
                onUpdateBoard={handleUpdateBoard}
                onAddNewTask={handleAddNewTask}
                onAddNewGroup={handleAddNewGroup}
                onSetFilter={handleSetFilterBy}

            />

            <div className="board-table-container">
                <BoardTable
                    ref={boardTableRef}
                    board={board}
                    onUpdateTask={handleUpdateBoard}
                    onAddNewTask={() => { }}
                    onOpenUpdates={handleOpenUpdates}
                    filterBy={filterBy}

                    // onSetFilter={setFilterBy}

                />
            </div>

            {openTaskId && (
                <TaskDetailModal
                    taskId={openTaskId}
                    board={boardForModal}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    )
}
