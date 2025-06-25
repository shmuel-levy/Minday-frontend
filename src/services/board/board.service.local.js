import { storageService } from '../async-storage.service'
import { userService } from '../user/user.service.local'
import { makeId } from '../util.service'

const STORAGE_KEY = 'boards'

export const boardService = {
    // Board CRUDL
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
    //helpers
    toggleStar,
    addMemberToBoard,
    addTaskFile,
    getTaskActivities,
    getRandomColor,
    addTaskUpdate,
    getDemoBoard,

}

const gBoards = getBoardsData()
_initBoards()


// list all boards (query)
async function query() {
    const user = userService.getLoggedinUser()
    const accountId = user?._id || 'guest'
    const boards = await storageService.query(STORAGE_KEY, accountId)
    // return boards.map(board => JSON.parse(JSON.stringify(board)))
    return boards
}

// create board object
function getDemoDataBoard({ title = '', type = 'Tasks', description = '', groups = [] } = {}) {
    const currentUser = userService.getLoggedinUser()
    const colIdItem = makeId()
    const colIdPerson = makeId()
    const colIdStatus = makeId()
    const colIdDate = makeId()
    return {
        title,
        activities: [],
        isStarred: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        owner: currentUser || null,
        members: currentUser ? [currentUser] : [],
        type,
        description,
        style: {},
        labels: [],
        cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
        columns: [
            {
                id: colIdItem,
                title: 'Item',
                width: 400,
                type: { variant: 'item' },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: colIdPerson,
                title: 'Person',
                width: 200,
                type: { variant: 'people' },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: colIdStatus,
                title: 'Status',
                width: 200,
                type: {
                    variant: 'status',
                    labels: []
                },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: colIdDate,
                title: 'Date',
                width: 200,
                type: { variant: 'date' },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            }
        ],
        groups: [
            {
                "id": makeId(),
                "title": "Group 1",
                "color": "#037F4C",
                "isCollapse": false,
                "createdAt": 1750785932536,
                "owner": "guest",
                "tasks": [
                    {
                        "id": makeId(),
                        "title": "Task 1asdssa",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750785932536,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "Task 2ddd",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750785932536,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "Ta",
                        "assignee": "",
                        "status": "Done",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750785932536,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "New Task",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750786349468,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "xxvxcvxzzxc",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750786891695,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "xxvxcv",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750786892921,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "xxvxcv",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": true,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750786903663,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "xxvxcv",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750786922641,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "New Task",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750788454922,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "dd",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750788468621,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "dd",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750788470521,
                        "owner": "guest"
                    }
                ]
            },
            {
                "id": makeId(),
                "title": "Group 2",
                "color": "#9D50DD",
                "isCollapse": false,
                "createdAt": 1750785932536,
                "owner": "guest",
                "tasks": [
                    {
                        "id": makeId(),
                        "title": "Task 4",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750785932536,
                        "owner": "guest"
                    },
                    {
                        "id": makeId(),
                        "title": "Task 5",
                        "assignee": "",
                        "status": "",
                        "dueDate": "",
                        "timeline": {
                            "startDate": "",
                            "endDate": ""
                        },
                        "priority": "",
                        "isChecked": false,
                        "updates": [],
                        "files": [],
                        "columnValues": [],
                        "members": [],
                        "createdAt": 1750785932536,
                        "owner": "guest"
                    }
                ]
            }
        ]
        // groups: groups.map(group => ({
        //     ...createGroup(group.title),
        //     ...group,
        //     tasks: (group.tasks || []).map(task => ({
        //         ...createTask(task.title),
        //         ...task
        //     }))
        // }))
    }
}

// get board by id
async function getById(boardId) {
    const user = userService.getLoggedinUser()
    const accountId = user?._id || 'guest'
    const board = await storageService.get(STORAGE_KEY, boardId, accountId)
    if (!board) return null
    return board
}

// save board
async function save(board) {
    const user = userService.getLoggedinUser()
    const accountId = user?._id || 'guest'
    console.log('board in service ', board);
    try {
        if (board._id) {
            return await storageService.put(STORAGE_KEY, board, accountId)
        } else {
            return await storageService.post(STORAGE_KEY, board, accountId)
        }
    } catch (e) {
        console.log('error', e);

        // if (exists) {
        //   return await storageService.put(STORAGE_KEY, board, accountId)

        // } else {
        //   return await stoבrageService.post(STORAGE_KEY, board, accountId)
        // }
    }
}

// remove board
async function removeBoard(boardId) {
    const user = userService.getLoggedinUser()
    const accountId = user?._id || 'guest'
    await storageService.remove(STORAGE_KEY, boardId, accountId)
}

// Group CRUDL

// create group object
function createGroup(title = 'New Group') {
    const currentUser = userService.getLoggedinUser()
    const colorNames = getRandomColor()
    return {
        id: makeId(),
        title,
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
        isCollapse: false,
        createdAt: Date.now(),
        owner: currentUser?._id || null,
        tasks: []
    }
}

// add group to board
async function addGroup(boardId, groupData) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const newGroup = {
        ...createGroup(groupData?.title || 'New Group'),
        ...groupData
    }
    board.groups.push(newGroup)
    await storageService.put(STORAGE_KEY, board)
    return board
}

// list groups in board
async function listGroups(boardId) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    return board.groups
}

// update group in board (returns board)
async function updateGroup(boardId, groupId, groupToUpdate) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const groupIdx = board.groups.findIndex(g => g.id === groupId)
    if (groupIdx === -1) throw new Error('Group not found')
    board.groups[groupIdx] = { ...board.groups[groupIdx], ...groupToUpdate }
    await storageService.put(STORAGE_KEY, board)
    return board
}

// remove group from board (returns board)
async function removeGroup(boardId, groupId) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    if (groupIndex === -1) throw new Error('Group not found')
    board.groups.splice(groupIndex, 1)
    await storageService.put(STORAGE_KEY, board)
    return board
}

// Task CRUDL

// create task object
function createTask(title = 'New Task') {
    return {
        id: makeId(),
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
        createdAt: Date.now(),
        owner: userService.getLoggedinUser()?._id || null
    }
}

// add task to group
async function addTask(boardId, groupId, taskData) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    const newTask = {
        ...createTask(taskData?.title || 'New Task'),
        ...taskData
    }
    group.tasks.push(newTask)
    await storageService.put(STORAGE_KEY, board)
    return board
}

// list tasks in group
async function listTasks(boardId, groupId) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    return group.tasks
}

function findGroupByTaskId(board, taskId) {
    for (const group of board.groups) {
        const task = group.tasks.find(t => t.id === taskId)
        if (task) return group
    }
    return null

}

// update task in group (returns board)
async function updateTask(boardId, taskId, taskToUpdate) {
    try {

        const board = await getById(boardId)
        console.log('board:', board, boardId, taskId, taskToUpdate);

        if (!board) console.error('Board not found')
        const group = findGroupByTaskId(board, taskId)
        if (!group) console.error('Group not found')
        const taskIdx = group.tasks.findIndex(t => t.id === taskId)
        if (taskIdx === -1) console.error('Task not found')
        group.tasks[taskIdx] = { ...group.tasks[taskIdx], ...taskToUpdate }
        // await storageService.put(STORAGE_KEY, board)
        console.log('Task updated successfully:', group.tasks[taskIdx]);

        return board
    } catch (err) {
        console.error('Error updating task:', err)
        throw new Error('Failed to update task')
    }
}

// remove task from group (returns board)
async function removeTask(boardId, groupId, taskId) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')
    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')
    const taskIdx = group.tasks.findIndex(t => t.id === taskId)
    if (taskIdx === -1) throw new Error('Task not found')
    group.tasks.splice(taskIdx, 1)
    await storageService.put(STORAGE_KEY, board)
    return board
}

// Helpers


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
    return board.members.some(member => member?._id === userId)
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


function getRandomColor() {
    return ['#037F4C', '#00C875', '#9CD326', '#CAB641', '#FFCB00', '#784BD1', '#9D50DD', '#007EB5', '#579BFC', '#66CCFF', '#BB3354', '#FF007F', '#FF5AC4', '#FF642E', '#FDAB3D', '#7F5347', '#C4C4C4', '#757575']
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


//DEMO BOARD ONLY FOR LOCAL TESTING
function getDemoBoard() {
    const currentUser = userService.getLoggedinUser()
    const colorNames = getRandomColor()

    const columnIds = {
        item: makeId(),
        person: makeId(),
        status: makeId(),
        date: makeId()
    }

    const labelIds = {
        working: makeId(),
        stuck: makeId(),
        done: makeId()
    }

    const board = {
        _id: makeId(),
        title: "Monday - Sprint 4 - Design Approval",
        description: "Sprint demo",
        type: "Tasks",
        isStarred: false,
        createdAt: Date.now(),
        owner: currentUser || null,
        members: currentUser ? [currentUser] : [],
        activities: [],
        style: {},
        labels: [],
        columns: [
            {
                id: columnIds.item,
                title: "Item",
                width: 400,
                type: { variant: "item" },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: columnIds.person,
                title: "Person",
                width: 200,
                type: { variant: "people" },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: columnIds.status,
                title: "Status",
                width: 200,
                type: {
                    variant: "status",
                    labels: [
                        { id: labelIds.working, title: "Working on it", color: "working_orange" },
                        { id: labelIds.stuck, title: "Stuck", color: "stuck-red" },
                        { id: labelIds.done, title: "Done", color: "done-green", isHappyLabel: true }
                    ]
                },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            },
            {
                id: columnIds.date,
                title: "Date",
                width: 200,
                type: { variant: "date" },
                createdAt: Date.now(),
                owner: currentUser?._id || null
            }
        ],
        groups: []
    }

    const frontendGroup = {
        id: makeId(),
        title: "Frontend",
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
        isCollapse: false,
        createdAt: Date.now(),
        owner: currentUser?._id || null,
        tasks: []
    }
    board.groups.push(frontendGroup)

    const backendGroup = {
        id: makeId(),
        title: "Backend",
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
        isCollapse: false,
        createdAt: Date.now(),
        owner: currentUser?._id || null,
        tasks: []
    }
    board.groups.push(backendGroup)


    const task1 = getEmptyTask(board, frontendGroup.id, "Implement Task Preview UI 2")
    task1.columnValues.push({ colId: columnIds.person, value: "John" })
    task1.columnValues.push({ colId: columnIds.status, value: labelIds.working })

    const task2 = getEmptyTask(board, backendGroup.id, "Set up Express server")
    task2.columnValues.push({ colId: columnIds.person, value: "SS" })
    task2.columnValues.push({ colId: columnIds.status, value: labelIds.working })

    return board
}


//private

function _initBoards() {
    const boardsFromStorage = localStorage.getItem(STORAGE_KEY)
    if (boardsFromStorage && boardsFromStorage.length) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoards))
}


function getBoardsData() {
    return [
        {
            "title": "New Board",
            "activities": [],
            "isStarred": false,
            "createdAt": 1750785932536,
            "updatedAt": 1750785932536,
            "owner": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                "isGuest": true
            },
            "members": [
                {
                    "_id": "guest",
                    "fullname": "Guest",
                    "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                    "isGuest": true
                }
            ],
            "type": "Items",
            "description": "Managing items",
            "style": {},
            "labels": [],
            "cmpsOrder": [
                "StatusPicker",
                "MemberPicker",
                "DatePicker"
            ],
            "columns": [
                {
                    "id": makeId(),
                    "title": "Item",
                    "width": 400,
                    "type": {
                        "variant": "item"
                    },
                    "createdAt": 1750785932536,
                    "owner": "guest"
                },
                {
                    "id": "l208qE7jYjDOu6V",
                    "title": "Person",
                    "width": 200,
                    "type": {
                        "variant": "people"
                    },
                    "createdAt": 1750785932536,
                    "owner": "guest"
                },
                {
                    "id": "XHW7xaLHwKwGsUR",
                    "title": "Status",
                    "width": 200,
                    "type": {
                        "variant": "status",
                        "labels": []
                    },
                    "createdAt": 1750785932536,
                    "owner": "guest"
                },
                {
                    "id": "P8GDlytcN8bTUCx",
                    "title": "Date",
                    "width": 200,
                    "type": {
                        "variant": "date"
                    },
                    "createdAt": 1750785932536,
                    "owner": "guest"
                }
            ],
            "groups": [
                {
                    "id": "Q9yl5tFJUFDkgjn",
                    "title": "Group 1",
                    "color": "#037F4C",
                    "isCollapse": false,
                    "createdAt": 1750785932536,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "ToMqzhJPyYtJPkK",
                            "title": "Task 1asdssa",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750785932536,
                            "owner": "guest"
                        },
                        {
                            "id": "E4TVWahYwxbdj44",
                            "title": "Task 2ddd",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750785932536,
                            "owner": "guest"
                        },
                        {
                            "id": "P0DgVyO86nQSbFl",
                            "title": "Ta",
                            "assignee": "",
                            "status": "Done",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750785932536,
                            "owner": "guest"
                        },
                        {
                            "id": "DSQD24HL3nMJAlQ",
                            "title": "New Task",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786349468,
                            "owner": "guest"
                        },
                        {
                            "id": "1DJRduaN1vob3Dv",
                            "title": "xxvxcvxzzxc",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786891695,
                            "owner": "guest"
                        },
                        {
                            "id": "65HR5ZsuMaFxHW6",
                            "title": "xxvxcv",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786892921,
                            "owner": "guest"
                        },
                        {
                            "id": "NTen8Jdceopraya",
                            "title": "xxvxcv",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": true,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786903663,
                            "owner": "guest"
                        },
                        {
                            "id": "Sst3tw2pA3xRGAq",
                            "title": "xxvxcv",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786922641,
                            "owner": "guest"
                        },
                        {
                            "id": "uVKxP36s8coBd2W",
                            "title": "New Task",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750788454922,
                            "owner": "guest"
                        },
                        {
                            "id": "278qQPKvxwVySkz",
                            "title": "dd",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750788468621,
                            "owner": "guest"
                        },
                        {
                            "id": "qXdHFEpIP6E59Ru",
                            "title": "dd",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750788470521,
                            "owner": "guest"
                        }
                    ]
                },
                {
                    "id": "YKlOE0siMdJF8Of",
                    "title": "Group 2",
                    "color": "#9D50DD",
                    "isCollapse": false,
                    "createdAt": 1750785932536,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "MZsQIhxWwsShWHv",
                            "title": "Task 4",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750785932536,
                            "owner": "guest"
                        },
                        {
                            "id": "qngXXDQmGGY0Nqy",
                            "title": "Task 5",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750785932536,
                            "owner": "guest"
                        }
                    ]
                }
            ],
            "_id": "xC1vT",
            "account": "guest"
        },
        {
            "title": "New Boardz",
            "activities": [],
            "isStarred": false,
            "createdAt": 1750786468313,
            "updatedAt": 1750786468313,
            "owner": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                "isGuest": true
            },
            "members": [
                {
                    "_id": "guest",
                    "fullname": "Guest",
                    "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                    "isGuest": true
                }
            ],
            "type": "Items",
            "description": "Managing items",
            "style": {},
            "labels": [],
            "cmpsOrder": [
                "StatusPicker",
                "MemberPicker",
                "DatePicker"
            ],
            "columns": [
                {
                    "id": "eAOgFhpDebUhez3",
                    "title": "Item",
                    "width": 400,
                    "type": {
                        "variant": "item"
                    },
                    "createdAt": 1750786468313,
                    "owner": "guest"
                },
                {
                    "id": "J2osiYK4gAlb5K6",
                    "title": "Person",
                    "width": 200,
                    "type": {
                        "variant": "people"
                    },
                    "createdAt": 1750786468313,
                    "owner": "guest"
                },
                {
                    "id": "NRwMfo8CctN0W34",
                    "title": "Status",
                    "width": 200,
                    "type": {
                        "variant": "status",
                        "labels": []
                    },
                    "createdAt": 1750786468313,
                    "owner": "guest"
                },
                {
                    "id": "8rBa1j1aOn5cBDH",
                    "title": "Date",
                    "width": 200,
                    "type": {
                        "variant": "date"
                    },
                    "createdAt": 1750786468313,
                    "owner": "guest"
                }
            ],
            "groups": [
                {
                    "id": "T4Qw1iebEHiVlW2",
                    "title": "Group 1",
                    "color": "#9CD326",
                    "isCollapse": false,
                    "createdAt": 1750786468314,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "kRRaxArtRcrFoCB",
                            "title": "Task 4SAדשדג",
                            "assignee": "shani",
                            "status": "Working on it",
                            "dueDate": "2025-06-04T21:00:00.000Z",
                            "timeline": {
                                "startDate": "2025-06-10",
                                "endDate": "2025-06-12"
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786468314,
                            "owner": "guest"
                        },
                        {
                            "id": "yuWQQvpbwx8MeEE",
                            "title": "Task asdשדדגכג",
                            "assignee": "shani",
                            "status": "Done",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786468314,
                            "owner": "guest"
                        },
                        {
                            "id": "VnrixQ4CEZ5vLVj",
                            "title": "Task 1",
                            "assignee": "",
                            "status": "Done",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786468314,
                            "owner": "guest"
                        },
                        {
                            "id": "fWIvtTjsQwqroiM",
                            "title": "zfdsfsdsd",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750843841733,
                            "owner": "guest"
                        },
                        {
                            "id": "L91BPCrzNGatz9b",
                            "title": "New Task",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750843848217,
                            "owner": "guest"
                        },
                        {
                            "id": "bBu8U6j1M0VBOVd",
                            "title": "שגגדשגדשדג",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844846128,
                            "owner": "guest"
                        },
                        {
                            "id": "AOWyX9YV96va8EE",
                            "title": "New Task",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844853216,
                            "owner": "guest"
                        },
                        {
                            "id": "tf0m7tPNLPNfJhV",
                            "title": "New Task",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844932214,
                            "owner": "guest"
                        }
                    ]
                },
                {
                    "id": "jinmdDH0QnINPse",
                    "title": "Group 2",
                    "color": "#BB3354",
                    "isCollapse": false,
                    "createdAt": 1750786468314,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "A5pDFEeuWMSx5Hz",
                            "title": "Task 4",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786468314,
                            "owner": "guest"
                        },
                        {
                            "id": "En4E1I7fftJP7e1",
                            "title": "Task 5",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750786468314,
                            "owner": "guest"
                        }
                    ]
                }
            ],
            "_id": "6Ox1E",
            "account": "guest"
        },
        {
            "title": "New Board",
            "activities": [],
            "isStarred": false,
            "createdAt": 1750844349556,
            "updatedAt": 1750844349556,
            "owner": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                "isGuest": true
            },
            "members": [
                {
                    "_id": "guest",
                    "fullname": "Guest",
                    "imgUrl": "https://cdn-icons-png.flaticon.com/512/1144/1144709.png",
                    "isGuest": true
                }
            ],
            "type": "Items",
            "description": "Managing items",
            "style": {},
            "labels": [],
            "cmpsOrder": [
                "StatusPicker",
                "MemberPicker",
                "DatePicker"
            ],
            "columns": [
                {
                    "id": "IBfQ5NDfzwlEN6p",
                    "title": "Item",
                    "width": 400,
                    "type": {
                        "variant": "item"
                    },
                    "createdAt": 1750844349556,
                    "owner": "guest"
                },
                {
                    "id": "dgqnRIjnPsnQWBO",
                    "title": "Person",
                    "width": 200,
                    "type": {
                        "variant": "people"
                    },
                    "createdAt": 1750844349556,
                    "owner": "guest"
                },
                {
                    "id": "0R7IpxY1cJfAgjn",
                    "title": "Status",
                    "width": 200,
                    "type": {
                        "variant": "status",
                        "labels": []
                    },
                    "createdAt": 1750844349556,
                    "owner": "guest"
                },
                {
                    "id": "eXonm9kqH8JNSkD",
                    "title": "Date",
                    "width": 200,
                    "type": {
                        "variant": "date"
                    },
                    "createdAt": 1750844349556,
                    "owner": "guest"
                }
            ],
            "groups": [
                {
                    "id": "3oyeSff9Gxy2VGw",
                    "title": "Group 1",
                    "color": "#007EB5",
                    "isCollapse": false,
                    "createdAt": 1750844349556,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "VYpreCz2THB8a2g",
                            "title": "sdfsdfsdf",
                            "assignee": "",
                            "status": "Done",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844349556,
                            "owner": "guest"
                        },
                        {
                            "id": "7QNGxYSGhuniUth",
                            "title": "Task 2sdadffdssdf",
                            "assignee": "shani",
                            "status": "Done",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "2025-06-16",
                                "endDate": "2025-06-19"
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844349556,
                            "owner": "guest"
                        },
                        {
                            "id": "5IbPWNipiVMbm8a",
                            "title": "Task 3",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "2025-06-10",
                                "endDate": "2025-06-11"
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844349556,
                            "owner": "guest"
                        },
                        {
                            "id": "5eyUfboEJGrZDoO",
                            "title": "שדגשדג",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": true,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844614724,
                            "owner": "guest"
                        }
                    ]
                },
                {
                    "id": "odW5c7XUKlpk2Qh",
                    "title": "Group 2",
                    "color": "#9CD326",
                    "isCollapse": false,
                    "createdAt": 1750844349556,
                    "owner": "guest",
                    "tasks": [
                        {
                            "id": "aW5YIYFeXrlj6Cu",
                            "title": "Task 4",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844349556,
                            "owner": "guest"
                        },
                        {
                            "id": "2H06O9XCS2TB85e",
                            "title": "Task 5",
                            "assignee": "",
                            "status": "",
                            "dueDate": "",
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "priority": "",
                            "isChecked": false,
                            "updates": [],
                            "files": [],
                            "columnValues": [],
                            "members": [],
                            "createdAt": 1750844349556,
                            "owner": "guest"
                        }
                    ]
                }
            ],
            "_id": "nraqt",
            "account": "guest"
        }
    ]
}