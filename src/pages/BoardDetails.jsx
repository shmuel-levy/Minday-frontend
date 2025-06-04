import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardActivity, updateBoard } from '../store/board.actions'
import { BoardHeader } from '../cmps/board-header/BoardHeader'
import { BoardTable } from '../cmps/BoardTable'

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const boardTableRef = useRef(null)

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

    async function onAddBoardActivity(boardId) {
        try {
            await addBoardActivity(boardId, 'New activity: ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Board activity added`)
        } catch (err) {
            showErrorMsg('Cannot add board activity')
        }
    }

    function handleAddNewTask() {
        // Call the BoardTable's add new task function
        if (boardTableRef.current && boardTableRef.current.handleAddNewTask) {
            boardTableRef.current.handleAddNewTask()
        }
    }

    function handleAddNewGroup() {
        // Call the BoardTable's add new group at top function
        if (boardTableRef.current && boardTableRef.current.handleAddGroupAtTop) {
            boardTableRef.current.handleAddGroupAtTop()
        }
    }

    if (!board) {
        return <div>Loading board...</div>
    }

    return (
        <section className="board-details">
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
                onAddNewTask={(task, groupId) => {
                    console.log('New task added:', task, 'to group:', groupId)
                    // You can add additional logic here if needed
                }}
            />
            
            <div className="board-actions">
                <button onClick={() => { onAddBoardActivity(board._id) }}>
                    Add board activity
                </button>
            </div>
        </section>
    )
}