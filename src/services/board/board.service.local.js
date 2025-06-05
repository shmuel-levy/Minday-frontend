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
    addMemberToBoard,
    updateTask,
    addTaskUpdate,
    addTaskFile,
    getTaskActivities
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
    
    if (board) {
        const currentUser = userService.getLoggedinUser()
        if (currentUser && !isMemberOfBoard(board, currentUser._id)) {
            await addMemberToBoard(boardId, currentUser)
            return await storageService.get(STORAGE_KEY, boardId)
        }
    }
    
    return board
}

async function remove(boardId) {
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
            createdBy: currentUser,
            style: {
                backgroundImgs: []
            },
            labels: [],
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

async function addMemberToBoard(boardId, user) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    if (!board || !user) return

    if (isMemberOfBoard(board, user._id)) return board

    board.members = board.members || []
    board.members.push(user)
    
    await storageService.put(STORAGE_KEY, board)
    return board
}

function isMemberOfBoard(board, userId) {
    if (!board.members || !userId) return false
    return board.members.some(member => member._id === userId)
}

async function updateTask(boardId, groupId, taskId, taskToUpdate) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    
    const taskIdx = group.tasks.findIndex(t => t.id === taskId)
    if (taskIdx === -1) throw new Error('Task not found')
    
    group.tasks[taskIdx] = { ...group.tasks[taskIdx], ...taskToUpdate }
    
    await storageService.put(STORAGE_KEY, board)
    return group.tasks[taskIdx]
}

async function addTaskUpdate(boardId, groupId, taskId, updateData) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    
    const task = group.tasks.find(t => t.id === taskId)
    if (!task) throw new Error('Task not found')
    
    if (!task.updates) task.updates = []
    
    const newUpdate = {
        id: makeId(),
        ...updateData,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser()
    }
    
    task.updates.push(newUpdate)
    
    const activity = {
        id: makeId(),
        txt: `added an update to "${task.title}"`,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        task: { id: taskId, title: task.title },
        group: { id: groupId, title: group.title },
        type: 'task-update'
    }
    
    if (!board.activities) board.activities = []
    board.activities.push(activity)
    
    await storageService.put(STORAGE_KEY, board)
    return { update: newUpdate, activity }
}

async function addTaskFile(boardId, groupId, taskId, fileData) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    
    const task = group.tasks.find(t => t.id === taskId)
    if (!task) throw new Error('Task not found')
    
    if (!task.files) task.files = []
    
    const newFile = {
        id: makeId(),
        ...fileData,
        uploadedAt: Date.now(),
        uploadedBy: userService.getLoggedinUser()
    }
    
    task.files.push(newFile)
    
    const activity = {
        id: makeId(),
        txt: `uploaded "${fileData.name}" to "${task.title}"`,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        task: { id: taskId, title: task.title },
        group: { id: groupId, title: group.title },
        file: newFile,
        type: 'file-upload'
    }
    
    if (!board.activities) board.activities = []
    board.activities.push(activity)
    
    await storageService.put(STORAGE_KEY, board)
    return { file: newFile, activity }
}

async function getTaskActivities(boardId, taskId) {
    const board = await getById(boardId)
    if (!board) return []
    
    return (board.activities || []).filter(activity => 
        activity.task && activity.task.id === taskId
    ).sort((a, b) => b.createdAt - a.createdAt)
}