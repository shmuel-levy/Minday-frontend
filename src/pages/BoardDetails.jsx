import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardActivity, updateBoard } from '../store/board.actions'
import { BoardHeader } from '../cmps/board-header/BoardHeader'
import { BoardTable } from '../cmps/BoardTable'
import { TaskDetailModal } from '../cmps/task-detail-modal/TaskDetailModal'

export function BoardDetails({ openTaskId, setOpenTaskId }) {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const boardTableRef = useRef(null)
    // const [openTaskId, setOpenTaskId] = useState(null)
    const [boardForModal, setBoardForModal] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        if (boardId) {
            loadBoard(boardId)
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
    function handleOpenModal(taskId) {
        setOpenTaskId(taskId)
        setIsModalOpen(true)
    }

    function handleStartModalClose() {
        setIsModalOpen(false)
    }

    function handleCloseModal() {
        setOpenTaskId(null)
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

    if (!board) {
        return <div>Loading board...</div>
    }

    return (
        <section className={`board-details ${openTaskId ? 'with-modal' : ''}`}>
            <BoardHeader
                board={board}
                onUpdateBoard={handleUpdateBoard}
                onAddNewTask={handleAddNewTask}
                onAddNewGroup={handleAddNewGroup}
            />

            <BoardTable
                ref={boardTableRef}
                board={board}
                onUpdateTask={handleUpdateBoard}
                onAddNewTask={(task, groupId) => { }}
                onOpenUpdates={handleOpenUpdates}
            />
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