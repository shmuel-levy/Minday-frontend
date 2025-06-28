import { boardService } from '../services/board'
import { store } from '../store/store.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_BOARD_ACTIVITY } from './board.reducer.js'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
        return board
    } catch (err) {
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        throw err
    }
}

export async function removeTaskUpdate(boardId, groupId, taskId, updateId) {
    try {
        // 1. persist the change in localStorage / backend
        await boardService.removeTaskUpdate(boardId, groupId, taskId, updateId)

        // 2. reload the board and publish it to the store
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return updateId
    } catch (err) {
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
        return Promise.reject(err)
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        throw err
    }
}

export async function updateBoard(board) {
    // ----- 1️⃣ Optimistically update Redux -----
    store.dispatch(getCmdUpdateBoard(board));
    store.dispatch(getCmdSetBoard(board));

    // The UI re-renders immediately 👆

    try {
        // ----- 2️⃣ Persist without blocking the UI -----
        await boardService.save(board);
    } catch (err) {
        // optional: show toast + rollback if save failed
        console.error('Save failed, restoring previous board', err);
        // reload fresh copy, or keep optimistic state
    }
}

export async function addBoardActivity(boardId, txt) {
    try {
        const activity = await boardService.addBoardActivity(boardId, txt)
        store.dispatch(getCmdAddBoardActivity(activity))
        return activity
    } catch (err) {
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

        // Reload the board to get tupdated state
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return updatedTask
    } catch (err) {
        throw err
    }
}

export async function addTaskUpdate(boardId, groupId, taskId, updateText) {
    try {
        const result = await boardService.addTaskUpdate(boardId, groupId, taskId, {
            text: updateText,
            type: 'text'
        })

       
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return result
    } catch (err) {
        throw err
    }
}

export async function addTaskFile(boardId, groupId, taskId, fileData) {
    try {
        const result = await boardService.addTaskFile(boardId, groupId, taskId, fileData)

       
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))

        return result
    } catch (err) {
        // console.log('Cannot add task file', err)
        throw err
    }
}

export async function getTaskActivities(boardId, taskId) {
    try {
        return await boardService.getTaskActivities(boardId, taskId)
    } catch (err) {
        throw err
    }
}