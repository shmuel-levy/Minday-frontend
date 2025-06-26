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
    createTask
}

async function query(filterBy = { txt: '', maxMembers: 0 }) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function removeBoard(boardId) {
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

function getDemoDataBoard({ title = 'New Board', type = 'Tasks', description = 'Managing items', groups = [] } = {}) {
    return {
        name: title, 
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

function createGroup(title = 'New Group') {
    return {
        title,
        color: "#037F4C",
        isCollapse: false,
        tasks: []
    }
}

function createTask(title = 'New Task') {
    return {
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