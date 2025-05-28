import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBoard, addBoardActivity } from '../store/board.actions'

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
            <h1>Board Details</h1>
            {board && <div>
                <h3>{board.title}</h3>
                <p>{board.description}</p>
                <h4>Groups: {board.groups?.length || 0}</h4>
                <h4>Total Tasks: {board.groups?.reduce((acc, group) => acc + group.tasks.length, 0) || 0}</h4>
                <h4>Members: {board.members?.length || 0}</h4>
                <pre> {JSON.stringify(board, null, 2)} </pre>
            </div>
            }
            <button onClick={() => { onAddBoardActivity(board._id) }}>Add board activity</button>

        </section>
    )
}