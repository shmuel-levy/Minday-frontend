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
        return board
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

export async function deleteGroup(boardId, groupId) {
    try {
        const result = await boardService.deleteGroup(boardId, groupId)

        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return result
    } catch (err) {
        console.log('Cannot delete group', err)
        throw err
    }
}

export async function toggleBoardStar(boardId) {
    try {
        const { boards } = store.getState().boardModule
     
        const boardToUpdate = boards.find(board => board._id === boardId)
        if (!boardToUpdate) {
            throw new Error('Board not found')
        }

        const updatedBoard = { ...boardToUpdate, isStarred: !boardToUpdate.isStarred }
       
        store.dispatch(getCmdUpdateBoard(updatedBoard))
        
        const recentBoards = JSON.parse(localStorage.getItem('recentBoards')) || []
        const updatedRecentBoards = recentBoards.map(b =>
            b && b._id === updatedBoard._id ? updatedBoard : b
        )
        localStorage.setItem('recentBoards', JSON.stringify(updatedRecentBoards))
       
        return Promise.resolve(updatedBoard)
    } catch (err) {
        console.error('🔴 toggleBoardStar failed:', err)
        return Promise.reject(err)
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

// Add these to your existing board.actions.js

export async function updateTask(boardId, groupId, taskId, taskToUpdate) {
    try {
        const updatedTask = await boardService.updateTask(boardId, groupId, taskId, taskToUpdate)

        // Reload the board to get the updated state
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return updatedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

export async function addTaskUpdate(boardId, groupId, taskId, updateText) {
    try {
        const result = await boardService.addTaskUpdate(boardId, groupId, taskId, {
            text: updateText,
            type: 'text'
        })

        // Reload the board to get the updated state
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return result
    } catch (err) {
        console.log('Cannot add task update', err)
        throw err
    }
}

export async function addTaskFile(boardId, groupId, taskId, fileData) {
    try {
        const result = await boardService.addTaskFile(boardId, groupId, taskId, fileData)

        // Reload the board to get the updated state
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return result
    } catch (err) {
        console.log('Cannot add task file', err)
        throw err
    }
}

export async function getTaskActivities(boardId, taskId) {
    try {
        return await boardService.getTaskActivities(boardId, taskId)
    } catch (err) {
        console.log('Cannot get task activities', err)
        throw err
    }
}