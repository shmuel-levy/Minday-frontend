import { boardService } from '../services/board'
import { store } from '../store/store.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_BOARD_ACTIVITY } from './board.reducer.js'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function toggleBoardStar(boardId) {
    try {
        const { boards } = store.getState().boardModule
        const boardToUpdate = boards.find(board => board._id === boardId)
        
        if (!boardToUpdate) throw new Error('Board not found')

        const updatedBoard = { ...boardToUpdate, isStarred: !boardToUpdate.isStarred }
        await boardService.toggleStar(boardId, updatedBoard.isStarred)
        store.dispatch(getCmdUpdateBoard(updatedBoard))
        
        return updatedBoard
    } catch (err) {
        console.log('Cannot toggle board star', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        
        store.dispatch(getCmdUpdateBoard(savedBoard))
        
        const currentBoard = store.getState().boardModule.board
        if (currentBoard && currentBoard._id === savedBoard._id) {
            store.dispatch(getCmdSetBoard(savedBoard))
        }
        
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addBoardActivity(boardId, txt) {
    try {
        const activity = await boardService.addBoardActivity(boardId, txt)
        store.dispatch(getCmdAddBoardActivity(activity))
        return activity
    } catch (err) {
        console.log('Cannot add board activity', err)
        throw err
    }
}

// Command Creators:
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}
function getCmdAddBoardActivity(activity) {
    return {
        type: ADD_BOARD_ACTIVITY,
        activity
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'b1oC7',
        title: 'Updated Board Title',
    })
    await removeBoard('b1oC7')
    // TODO unit test addBoardActivity
}