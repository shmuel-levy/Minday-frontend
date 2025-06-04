import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardActivity,
    toggleStar,
    addMemberToBoard
}
window.bs = boardService

async function query(filterBy = { txt: '', maxMembers: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    const { txt, minTasks, maxMembers, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
    }
    if (minTasks) {
        boards = boards.filter(board => {
            const taskCount = board.groups?.reduce((acc, group) => acc + group.tasks.length, 0) || 0
            return taskCount >= minTasks
        })
    }
    if (maxMembers) {
        boards = boards.filter(board => (board.members?.length || 0) <= maxMembers)
    }
    if (sortField === 'title' || sortField === 'owner') {
        boards.sort((board1, board2) =>
            board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    }
    if (sortField === 'createdAt') {
        boards.sort((board1, board2) =>
            (new Date(board1.createdAt) - new Date(board2.createdAt)) * +sortDir)
    }

    boards = boards.map(({ _id, title, description, isStarred, createdBy, members, groups }) => ({
        _id, title, description, isStarred, createdBy, members, groups
    }))
    return boards
}

async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    
    // Auto-add current user as member when accessing board
    if (board) {
        const currentUser = userService.getLoggedinUser()
        if (currentUser && !isMemberOfBoard(board, currentUser._id)) {
            await addMemberToBoard(boardId, currentUser)
            // Return updated board
            return await storageService.get(STORAGE_KEY, boardId)
        }
    }
    
    return board
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
            title: board.title,
            description: board.description,
            isStarred: board.isStarred,
            groups: board.groups,
            members: board.members,
            labels: board.labels,
            style: board.style
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const currentUser = userService.getLoggedinUser()
        const boardToSave = {
            title: board.title,
            description: board.description,
            isStarred: false,
            archivedAt: null,
            isStarred: false,
            createdAt: Date.now(),
            // Set created by to current user
            createdBy: currentUser,
            style: {
                backgroundImgs: []
            },
            labels: [],
            // Creator is automatically first member
            members: currentUser ? [currentUser] : [],
            groups: [],
            activities: [],
            cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function addBoardActivity(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const activity = {
        id: makeId(),
        txt,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        isStarred: false
    }
    board.activities.push(activity)
    await storageService.put(STORAGE_KEY, board)

    return activity
}

async function toggleStar(boardId, isStarred) {
    const board = await getById(boardId)
    board.isStarred = isStarred
    return save(board)
}

// Add member to board function
async function addMemberToBoard(boardId, user) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    if (!board || !user) return

    // Check if user is already a member
    if (isMemberOfBoard(board, user._id)) return board

    // Add user to members
    board.members = board.members || []
    board.members.push(user)
    
    await storageService.put(STORAGE_KEY, board)
    return board
}

// Helper function to check if user is member
function isMemberOfBoard(board, userId) {
    if (!board.members || !userId) return false
    return board.members.some(member => member._id === userId)
}