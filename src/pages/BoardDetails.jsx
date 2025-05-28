import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardActivity } from '../store/board.actions'
import { BoardTable } from '../cmps/BoardTable'

export function BoardDetails() {

    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    async function onAddBoardActivity(boardId) {
        try {
            await addBoardActivity(boardId, 'New activity: ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Board activity added`)
        } catch (err) {
            showErrorMsg('Cannot add board activity')
        }
    }

    return (
        <section className="board-details">
            <Link to="/board">Back to boards</Link>
            {board && <BoardTable board={board} />}
            
            {/* Keep this button for demo purposes */}
            <div className="board-actions">
                <button onClick={() => { onAddBoardActivity(board._id) }}>
                    Add board activity
                </button>
            </div>
        </section>
    )
}