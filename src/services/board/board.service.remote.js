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
    return boards.map(board => ({
        ...board,
        title: board.name || board.title // Backend uses 'name', frontend expects 'title'
    }))
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`).then(board => ({
        ...board,
        title: board.name || board.title // Backend uses 'name', frontend expects 'title'
    }))
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function save(board) {
    // Transform frontend format to backend format
    const backendBoard = {
        ...board,
        name: board.title || board.name, // Frontend uses 'title', backend uses 'name'
    }
    
    // Remove title to avoid confusion in backend
    delete backendBoard.title
    
    var savedBoard
    if (backendBoard._id) {
        savedBoard = await httpService.put(`board/${backendBoard._id}`, backendBoard)
    } else {
        savedBoard = await httpService.post('board', backendBoard)
    }
    
    // Transform backend response back to frontend format
    return {
        ...savedBoard,
        title: savedBoard.name // Backend returns 'name', frontend expects 'title'
    }
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

async function updateTask(boardId, taskId, taskToUpdate) {
    // First we need to find which group this task belongs to
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
    
    return httpService.put(`board/${boardId}/group/${groupId}/task/${taskId}`, { task: taskToUpdate })
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
                title: "New Group",
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
        title,
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