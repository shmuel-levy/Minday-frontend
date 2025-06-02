import { useEffect } from 'react'
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

    if (!board) {
        return <div>Loading board...</div>
    }

    return (
        <section className="board-details">
            <BoardHeader 
                board={board}
                onUpdateBoard={handleUpdateBoard}
            />
            
            <BoardTable 
                board={board}
                onUpdateTask={handleUpdateBoard}
            />
            
            <div className="board-actions">
                <button onClick={() => { onAddBoardActivity(board._id) }}>
                    Add board activity
                </button>
            </div>
        </section>
    )
}