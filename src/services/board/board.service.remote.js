import { httpService } from '../http.service'

export const boardService = {
    // Board CRUDL
    query,
    getById,
    save,
    removeBoard,
    
    // Group CRUDL  
    addGroup,
    updateGroup,
    removeGroup,
    
    // Task CRUDL
    addTask,
    updateTask,
    removeTask,
    
    // Helpers
    addBoardActivity,
    toggleStar,
    getDemoDataBoard,
    createGroup,
    createTask,
    getUsers
}

async function query(filterBy = { txt: '', maxMembers: 0 }) {
    const boards = await httpService.get(`board`, filterBy)
    
    // Transform each board from backend to frontend format
    return boards.map(board => transformBoardToFrontend(board))
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`).then(board => transformBoardToFrontend(board))
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function save(board) {
    // Transform frontend format to backend format
    const backendBoard = transformBoardToBackend(board)
    
    var savedBoard
    if (backendBoard._id) {
        savedBoard = await httpService.put(`board/${backendBoard._id}`, backendBoard)
    } else {
        savedBoard = await httpService.post('board', backendBoard)
    }
    
    // Transform backend response back to frontend format
    return transformBoardToFrontend(savedBoard)
}

// Group CRUDL
async function addGroup(boardId, groupData) {
    return httpService.post(`board/${boardId}/group`, { 
        group: groupData,
        isTop: false,
        idx: null 
    })
}

async function updateGroup(boardId, groupId, groupToUpdate) {
    return httpService.put(`board/${boardId}/group/${groupId}`, { group: groupToUpdate })
}

async function removeGroup(boardId, groupId) {
    return httpService.delete(`board/${boardId}/group/${groupId}`)
}

// Task CRUDL
async function addTask(boardId, groupId, taskData) {
    return httpService.post(`board/${boardId}/group/${groupId}/task`, { 
        task: taskData,
        isTop: false 
    })
}

async function updateTask(boardOrId, taskId, taskToUpdate) {
    let boardId
    
    if (typeof boardOrId === 'string') {
        boardId = boardOrId
    } else if (boardOrId && typeof boardOrId === 'object' && boardOrId._id) {
        boardId = boardOrId._id
        console.log('📝 Extracted boardId from board object:', boardId)
    } else {
        console.error('updateTask: Invalid first parameter. Expected string (boardId) or object with _id property')
        console.error('Received:', typeof boardOrId, boardOrId)
        console.error('Call stack:', new Error().stack)
        throw new Error('Invalid boardId parameter: must be a string or board object with _id')
    }
    
    if (typeof boardId !== 'string') {
        console.error('updateTask: Extracted boardId is not a string:', typeof boardId, boardId)
        throw new Error('Invalid boardId: must be a string')
    }
    
    if (typeof taskId !== 'string') {
        console.error('updateTask: taskId must be a string, got:', typeof taskId, taskId)
        throw new Error('Invalid taskId: must be a string')
    }
    
    console.log('🔄 Updating task:', taskId, 'in board:', boardId)
    
    const board = await getById(boardId)
    let groupId = null
    
    for (const group of board.groups) {
        if (group.tasks && group.tasks.find(task => task.id === taskId)) {
            groupId = group.id
            break
        }
    }
    
    if (!groupId) {
        throw new Error('Task not found in any group')
    }
    
    console.log('📍 Found task in group:', groupId)
    
    return httpService.put(`board/${boardId}/group/${groupId}/task/${taskId}`, { 
        task: taskToUpdate 
    })
}

async function removeTask(boardId, groupId, taskId) {
    return httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

// Helpers
async function addBoardActivity(boardId, txt) {
    const savedActivity = await httpService.post(`board/${boardId}/activity`, { txt })
    return savedActivity
}

async function toggleStar(boardId, isStarred) {
    return httpService.put(`board/${boardId}/star`, { isStarred })
}

async function getUsers() {
    try {
        return await httpService.get('user')
    } catch (err) {
        console.log('Could not get users:', err)
        return []
    }
}

// Transform backend board format to frontend format
function transformBoardToFrontend(board) {
    if (!board) return null
    
    return {
        ...board,
        title: board.name || board.title, // Backend uses 'name', frontend expects 'title'
        groups: board.groups?.map(group => ({
            ...group,
            title: group.name || group.title, // Backend uses 'name', frontend expects 'title'
            tasks: group.tasks?.map(task => ({
                ...task,
                title: task.title || getTaskTitleFromColumnValues(task), // Get title from columnValues if not present
                status: getTaskStatusFromColumnValues(task), // Extract status from columnValues
                assignee: getTaskAssigneeFromColumnValues(task), // Extract assignee from columnValues
                dueDate: getTaskDueDateFromColumnValues(task) // Extract due date from columnValues
            })) || []
        })) || []
    }
}

// Transform frontend board format to backend format
function transformBoardToBackend(board) {
    if (!board) return null
    
    const backendBoard = {
        ...board,
        name: board.title || board.name, // Frontend uses 'title', backend uses 'name'
        groups: board.groups?.map(group => ({
            ...group,
            name: group.title || group.name // Frontend uses 'title', backend uses 'name'
        })) || []
    }
    
    // Remove title to avoid confusion in backend
    delete backendBoard.title
    
    return backendBoard
}

// Helper functions to extract task data from columnValues
function getTaskTitleFromColumnValues(task) {
    if (!task.columnValues) return task.title || 'New Task'
    
    const itemColumn = task.columnValues.find(cv => cv.colId?.includes('item') || cv.colId?.includes('task'))
    return itemColumn?.value || task.title || 'New Task'
}

function getTaskStatusFromColumnValues(task) {
    if (!task.columnValues) return task.status || ''
    
    const statusColumn = task.columnValues.find(cv => cv.colId?.includes('status'))
    if (!statusColumn?.value) return task.status || ''
    
    // Map status label IDs to readable names
    const statusMap = {
        'lbl_working_001': 'Working on it',
        'lbl_stuck_001': 'Stuck', 
        'lbl_done_001': 'Done'
    }
    
    return statusMap[statusColumn.value] || statusColumn.value
}

function getTaskAssigneeFromColumnValues(task) {
    if (!task.columnValues) return task.assignee || ''
    
    const personColumn = task.columnValues.find(cv => cv.colId?.includes('person') || cv.colId?.includes('people'))
    return personColumn?.value || task.assignee || ''
}

function getTaskDueDateFromColumnValues(task) {
    if (!task.columnValues) return task.dueDate || ''
    
    const dateColumn = task.columnValues.find(cv => cv.colId?.includes('date'))
    return dateColumn?.value || task.dueDate || ''
}

// Create a demo board that matches your backend format
function getDemoDataBoard({ title = 'New Board', type = 'Tasks', description = 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.', groups = [] } = {}) {
    return {
        name: title, // Backend uses 'name' not 'title'
        activities: [],
        isStarred: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type,
        description,
        style: {},
        labels: [],
        cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
        columns: [
            {
                id: 'col-item',
                name: 'Task',
                width: 300,
                type: { variant: 'item' },
                createdAt: Date.now()
            },
            {
                id: 'col-people',
                name: 'Person',
                width: 200,
                type: { variant: 'people' },
                createdAt: Date.now()
            },
            {
                id: 'col-status',
                name: 'Status', 
                width: 200,
                type: { 
                    variant: 'status',
                    labels: [
                        { id: 'l1', name: 'Working on it', color: 'orange' },
                        { id: 'l2', name: 'Done', color: 'green' },
                        { id: 'l3', name: 'Stuck', color: 'red' }
                    ]
                },
                createdAt: Date.now()
            }
        ],
        groups: groups.length ? groups : [
            {
                id: 'g' + Date.now(),
                name: "New Group", // Use 'name' to match backend format
                color: "#037F4C",
                isCollapse: false,
                tasks: []
            }
        ]
    }
}

// Alias functions to match local service interface
function createGroup(title = 'New Group') {
    return {
        id: 'g' + Date.now(),
        name: title, // Use 'name' to match backend format
        color: "#037F4C",
        isCollapse: false,
        tasks: []
    }
}

function createTask(title = 'New Task') {
    return {
        id: 't' + Date.now(),
        title,
        assignee: '',
        status: '',
        dueDate: '',
        timeline: {
            startDate: '',
            endDate: ''
        },
        priority: '',
        isChecked: false,
        updates: [],
        files: [],
        columnValues: [],
        members: [],
        createdAt: Date.now()
    }
} 