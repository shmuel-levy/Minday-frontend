import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardActivity,
    toggleStar 
}

async function query(filterBy = { txt: '', maxMembers: 0 }) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardActivity(boardId, txt) {
    const savedActivity = await httpService.post(`board/${boardId}/activity`, { txt })
    return savedActivity
}

async function toggleStar(boardId, isStarred) {
    return httpService.put(`board/${boardId}/star`, { isStarred })
}