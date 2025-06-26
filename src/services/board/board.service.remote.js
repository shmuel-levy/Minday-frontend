import { httpService } from '../http.service'

export const boardService = {
    // Board CRUDL - exactly matching your local service
    query,
    getDemoDataBoard,
    getById,
    save,
    removeBoard,
    createGroup,
    // Group CRUDL
    addGroup,
    listGroups,
    updateGroup,
    removeGroup,
    createTask,
    // Task CRUDL
    addTask,
    listTasks,
    updateTask,
    removeTask,
    addBoardActivity,
    // Helpers - only what you actually use
    toggleStar,
    addMemberToBoard,
    getRandomColor,
    getDemoBoard,
}

// Board CRUDL
async function query() {
    const boards = await httpService.get(`board`)
    return boards.map(transformBoardToFrontend)
}

function getDemoDataBoard(options = {}) {
    const { title = '', type = 'Tasks', description = '', groups = [] } = options
    return {
        title,
        activities: [],
        isStarred: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        owner: null,
        members: [],
        type,
        description,
        style: {},
        labels: [],
        cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
        columns: [],
        groups: []
    }
}

async function getById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return transformBoardToFrontend(board)
}

async function save(board) {
    const backendBoard = transformBoardToBackend(board)
    let savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, backendBoard)
    } else {
        savedBoard = await httpService.post('board', backendBoard)
        savedBoard = await httpService.post('board', backendBoard)
    }
    return transformBoardToFrontend(savedBoard)
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}

// Group CRUDL
function createGroup(title = 'New Group') {
    return {
        title,
        color: getRandomColor()[Math.floor(Math.random() * getRandomColor().length)],
        isCollapse: false,
        createdAt: Date.now(),
        owner: null,
        tasks: []
    }
}

async function addGroup(boardId, groupData) {
    const updatedBoard = await httpService.post(`board/${boardId}/group`, { 
        group: groupData,
        isTop: false,
        idx: null 
    })
    return transformBoardToFrontend(updatedBoard)
}

async function listGroups(boardId) {
    const board = await getById(boardId)
    return board.groups
}

async function updateGroup(boardId, groupId, groupToUpdate) {
    const updatedBoard = await httpService.put(`board/${boardId}/group/${groupId}`, { group: groupToUpdate })
    return transformBoardToFrontend(updatedBoard)
}

async function removeGroup(boardId, groupId) {
    const updatedBoard = await httpService.delete(`board/${boardId}/group/${groupId}`)
    return transformBoardToFrontend(updatedBoard)
}

// Task CRUDL
function createTask(title = 'New Task') {
    return {
        title,
        assignee: '',
        status: '',
        dueDate: '',
        timeline: { startDate: '', endDate: '' },
        priority: '',
        isChecked: false,
        updates: [],
        files: [],
        columnValues: [],
        members: [],
        createdAt: Date.now(),
        owner: null
    }
}

async function addTask(boardId, groupId, taskData) {
    const updatedBoard = await httpService.post(`board/${boardId}/group/${groupId}/task`, { 
        task: taskData,
        isTop: false 
    })
    return transformBoardToFrontend(updatedBoard)
}

async function listTasks(boardId, groupId) {
    const board = await getById(boardId)
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    return group.tasks
}

async function updateTask(boardId, taskId, taskToUpdate) {
    // Find which group contains this task
    const board = await getById(boardId)
    let groupId = null
    
    for (const group of board.groups) {
        if (group.tasks.some(task => task.id === taskId)) {
            groupId = group.id
            break
        }
    }
    
    if (!groupId) throw new Error('Group not found')
    
    const updatedBoard = await httpService.put(`board/${boardId}/group/${groupId}/task/${taskId}`, { task: taskToUpdate })
    return transformBoardToFrontend(updatedBoard)
}

async function removeTask(boardId, groupId, taskId) {
    const updatedBoard = await httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
    return transformBoardToFrontend(updatedBoard)
}

// Helpers
async function addBoardActivity(boardId, txt) {
    // Use your existing createLog endpoint
    const activity = { txt, createdAt: Date.now() }
    return httpService.put(`board/${boardId}/log`, { logObject: activity })
}

async function toggleStar(boardId, isStarred) {
    // For now, just return the board - implement later if needed
    return getById(boardId)
}

async function addMemberToBoard(boardId, user) {
    console.log('addMemberToBoard not implemented yet')
    return null
}

function getRandomColor() {
    return ['#037F4C', '#00C875', '#9CD326', '#CAB641', '#FFCB00', '#784BD1', '#9D50DD', '#007EB5', '#579BFC', '#66CCFF', '#BB3354', '#FF007F', '#FF5AC4', '#FF642E', '#FDAB3D', '#7F5347', '#C4C4C4', '#757575']
}

function getDemoBoard() {
    return getDemoDataBoard({ 
        title: "Monday - Sprint 4 - Design Approval",
        type: "Tasks",
        description: "Sprint demo"
    })
}

// Transform functions
function transformBoardToFrontend(backendBoard) {
    if (!backendBoard) return null
    return {
        ...backendBoard,
        title: backendBoard.name || backendBoard.title,
        groups: (backendBoard.groups || []).map(group => ({
            ...group,
            id: group.id || group._id,
            title: group.name || group.title,
            tasks: (group.tasks || []).map(transformTaskToFrontend)
        }))
    }
}

function transformBoardToBackend(frontendBoard) {
    if (!frontendBoard) return null
    return {
        ...frontendBoard,
        name: frontendBoard.title || frontendBoard.name,
        groups: (frontendBoard.groups || []).map(group => ({
            ...group,
            name: group.title || group.name,
            tasks: (group.tasks || []).map(transformTaskToBackend)
        }))
    }
}

function transformTaskToFrontend(backendTask) {
    if (!backendTask) return null
    
    const task = {
        id: backendTask.id || backendTask._id,
        title: '',
        assignee: '',
        status: '',
        dueDate: '',
        timeline: { startDate: '', endDate: '' },
        priority: '',
        isChecked: false,
        updates: backendTask.updates || [],
        files: backendTask.files || [],
        columnValues: backendTask.columnValues || [],
        members: backendTask.members || [],
        createdAt: backendTask.createdAt,
        owner: backendTask.createdBy || backendTask.owner
    }
    
    // Extract values from columnValues
    if (backendTask.columnValues) {
        backendTask.columnValues.forEach(cv => {
            switch (cv.colId) {
                case 'col-item':
                    task.title = cv.value
                    break
                case 'col-people':
                    task.assignee = cv.value
                    break
                case 'col-priority':
                    task.status = cv.value
                    break
                case 'col-due':
                    task.dueDate = cv.value
                    break
            }
        })
    }
    
    return task
}

function transformTaskToBackend(frontendTask) {
    if (!frontendTask) return null
    
    const columnValues = []
    
    if (frontendTask.title) {
        columnValues.push({ colId: 'col-item', value: frontendTask.title })
    }
    if (frontendTask.assignee) {
        columnValues.push({ colId: 'col-people', value: frontendTask.assignee })
    }
    if (frontendTask.status) {
        columnValues.push({ colId: 'col-priority', value: frontendTask.status })
    }
    if (frontendTask.dueDate) {
        columnValues.push({ colId: 'col-due', value: frontendTask.dueDate })
    }
    
    return {
        columnValues,
        updates: frontendTask.updates || [],
        files: frontendTask.files || [],
        createdAt: frontendTask.createdAt,
        createdBy: frontendTask.owner
    }
}