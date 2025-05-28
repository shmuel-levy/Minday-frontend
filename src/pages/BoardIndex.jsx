import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, addBoard, updateBoard, removeBoard, addBoardActivity } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'
import { userService } from '../services/user'

import { BoardList } from '../cmps/BoardList'
import { BoardFilter } from '../cmps/BoardFilter'

export function BoardIndex() {

    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
        board.title = prompt('Board title?')
        if (!board.title) return
        board.description = prompt('Board description?') || ''
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added: ${savedBoard.title}`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(board) {
        const title = prompt('New title?', board.title)
        if (!title) return
        const boardToSave = { ...board, title }
        try {
            const savedBoard = await updateBoard(boardToSave)
            showSuccessMsg(`Board updated: ${savedBoard.title}`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    return (
        <main className="board-index">
            <header>
                <h2>Project Boards</h2>
                {userService.getLoggedinUser() && <button onClick={onAddBoard}>Add Board</button>}
            </header>
            <BoardFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <BoardList
                boards={boards}
                onRemoveBoard={onRemoveBoard}
                onUpdateBoard={onUpdateBoard} />
        </main>
    )
}