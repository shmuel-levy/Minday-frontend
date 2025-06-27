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
    remove: removeBoard,
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
    removeTaskUpdate,
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

export async function removeTaskUpdate(boardId, groupId, taskId, updateId) {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')

    const group = board.groups.find(g => g.id === groupId)
    if (!group) throw new Error('Group not found')

    const task = group.tasks.find(t => t.id === taskId)
    if (!task) throw new Error('Task not found')

    task.updates = task.updates.filter(u => u.id !== updateId)

    await storageService.put(STORAGE_KEY, board)
    return updateId
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

function generateFilesFor(boardTitle) {
    const sources = {
        "Minday Project": [
            "https://cdn.pixabay.com/photo/2024/05/15/20/57/developer-8764524_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/06/14/12/15/developer-8829735_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/10/20/14/25/ai-generated-8329596_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/06/14/12/15/developer-8829711_1280.jpg",
            "https://cdn.pixabay.com/photo/2020/04/11/18/05/red-matrix-5031496_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/11/16/09/31/matrix-2953863_1280.jpg"
        ],
        "Home Maintenance": [
            "https://cdn.pixabay.com/photo/2022/05/19/13/47/gardening-7207419_1280.jpg",
            "https://cdn.pixabay.com/photo/2021/04/04/20/30/plant-6151414_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/16/12/52/cleaning-services-9663247_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/09/15/10/24/painter-2751666_1280.jpg",
            "https://cdn.pixabay.com/photo/2022/05/05/20/01/australian-shepherd-7176981_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/10/25/09/54/bee-8339991_1280.jpg",
            "https://cdn.pixabay.com/photo/2018/09/15/07/55/dahlia-3678831_1280.jpg",


        ],
        "Party Planner": [
            "https://cdn.pixabay.com/photo/2023/07/13/14/55/cake-8125059_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/04/21/03/27/party-2247504_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/05/02/18/25/birthday-7965797_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/11/29/13/20/balloons-1869790_1280.jpg",
            "https://cdn.pixabay.com/photo/2020/01/20/02/44/candles-4779351_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/12/01/19/23/pink-553149_1280.jpg"
        ]
    };

    const list = sources[boardTitle] || [];
    const url = list[Math.floor(Math.random() * list.length)];

    return [
        {
            _id: makeId(),
            name: url.split("/").pop(), // e.g. developer-8764524_1280.jpg
            url,
            type: "image/jpeg",
            size: 100000 + Math.floor(Math.random() * 100000),
            createdAt: Date.now()
        }
    ];
}


function getBoardsData() {
    return [
        {
            _id: makeId(),
            title: "🛠️ Minday Project",
            createdAt: Date.now(),
            members: [],
            groups: [
                /* ---------- 💻 Frontend ---------- */
                {
                    id: makeId(),
                    title: "💻 Frontend",
                    color: "#f59e0b",
                    tasks: [
                        {
                            id: makeId(),
                            title: "⚛️ Setup React App",
                            status: "Done",
                            priority: "High",
                            dueDate: "2025-01-10",
                            timeline: { startDate: "2025-01-05", endDate: "2025-01-10" },
                            files: generateFilesFor("Minday Project"),
                            updates: [
                                {
                                    id: makeId(),
                                    text: "Scaffolded with **Vite** 🚀",
                                    type: "text",
                                    createdAt: Date.now() - 6 * 60 * 60 * 1000,
                                    byMember: {
                                        _id: "u101",
                                        fullname: "John Doe",
                                        imgUrl: "https://i.pravatar.cc/40?img=15"
                                    }
                                },
                                {
                                    id: makeId(),
                                    text: "ESLint + Prettier integrated ✔️",
                                    type: "text",
                                    createdAt: Date.now() - 2 * 60 * 60 * 1000,
                                    byMember: {
                                        _id: "u102",
                                        fullname: "Shani Cohen",
                                        imgUrl: "https://i.pravatar.cc/40?img=30"
                                    }
                                }
                            ]
                        },

                        {
                            id: makeId(),
                            title: "🔍 Implement Search Bar",
                            status: "Working on it",
                            priority: "Low",
                            dueDate: "2025-03-14",
                            timeline: { startDate: "2025-03-10", endDate: "2025-03-14" },
                            files: generateFilesFor("Minday Project"),
                            updates: [
                                {
                                    id: makeId(),
                                    text: "Debounce logic added.",
                                    type: "text",
                                    createdAt: Date.now() - 4 * 60 * 60 * 1000,
                                    byMember: {
                                        _id: "u103",
                                        fullname: "Alex Kim",
                                        imgUrl: "https://i.pravatar.cc/40?img=12"
                                    }
                                },
                                {
                                    id: makeId(),
                                    text: "Pending styling tweaks.",
                                    type: "text",
                                    createdAt: Date.now() - 1 * 60 * 60 * 1000,
                                    byMember: {
                                        _id: "u104",
                                        fullname: "Maya Singh",
                                        imgUrl: "https://i.pravatar.cc/40?img=47"
                                    }
                                }
                            ]
                        },

                        {
                            id: makeId(),
                            title: "♿ A11y Audit",
                            status: "Stuck",
                            priority: "Critical ⚠️",
                            dueDate: "2025-05-22",
                            timeline: { startDate: "2025-05-18", endDate: "2025-05-22" },
                            files: generateFilesFor("Minday Project"),
                            updates: [
                                {
                                    id: makeId(),
                                    text: "Missing ARIA roles on modals.",
                                    type: "text",
                                    createdAt: Date.now() - 86400000,
                                    byMember: {
                                        _id: "u105",
                                        fullname: "Mark Brown",
                                        imgUrl: "https://i.pravatar.cc/40?img=64"
                                    }
                                },
                                {
                                    id: makeId(),
                                    text: "Color contrast issue on buttons.",
                                    type: "text",
                                    createdAt: Date.now() - 82800000,
                                    byMember: {
                                        _id: "u106",
                                        fullname: "Ella Levy",
                                        imgUrl: "https://i.pravatar.cc/40?img=21"
                                    }
                                }
                            ]
                        },

                        {
                            id: makeId(),
                            title: "🧪 Add Unit Tests",
                            status: "Not Started",
                            priority: "Medium",
                            dueDate: "2025-09-08",
                            timeline: { startDate: "2025-09-03", endDate: "2025-09-08" },
                            files: generateFilesFor("Minday Project"),
                            updates: []
                        },

                        {
                            id: makeId(),
                            title: "🌛 Dark-mode Theme",
                            status: "Done",
                            priority: "Critical ⚠️",
                            dueDate: "2025-11-02",
                            timeline: { startDate: "2025-10-28", endDate: "2025-11-02" },
                            files: generateFilesFor("Minday Project"),
                            updates: []
                        }
                    ]
                },

                /* ---------- 🧠 Backend ---------- */
                {
                    id: makeId(),
                    title: "🧠 Backend",
                    color: "#abdee6",
                    tasks: [
                        { id: makeId(), title: "📚 Build REST API", status: "Done", priority: "Low", dueDate: "2025-02-12", timeline: { startDate: "2025-02-07", endDate: "2025-02-12" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "🔐 Auth Middleware", status: "Working on it", priority: "High", dueDate: "2025-04-18", timeline: { startDate: "2025-04-13", endDate: "2025-04-18" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "🗃️ Connect Database", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-06-03", timeline: { startDate: "2025-05-29", endDate: "2025-06-03" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "⚙️ Dockerize API", status: "Done", priority: "Medium", dueDate: "2025-08-11", timeline: { startDate: "2025-08-06", endDate: "2025-08-11" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "📈 CI/CD Pipeline", status: "Not Started", priority: "Critical ⚠️", dueDate: "2025-10-15", timeline: { startDate: "2025-10-10", endDate: "2025-10-15" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() }
                    ]
                },

                /* ---------- 🎨 Design ---------- */
                {
                    id: makeId(),
                    title: "🎨 Design",
                    color: "#97c1a9",
                    tasks: [
                        { id: makeId(), title: "🖌️ Create Logo", status: "Done", priority: "Critical ⚠️", dueDate: "2025-01-30", timeline: { startDate: "2025-01-27", endDate: "2025-01-30" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "📐 Style Guide", status: "Working on it", priority: "High", dueDate: "2025-04-08", timeline: { startDate: "2025-04-03", endDate: "2025-04-08" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "🖼️ Export Icon Set", status: "Not Started", priority: "Critical ⚠️", dueDate: "2025-05-12", timeline: { startDate: "2025-05-09", endDate: "2025-05-12" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "🗂️ Design 404 Page", status: "Stuck", priority: "Low", dueDate: "2025-07-15", timeline: { startDate: "2025-07-10", endDate: "2025-07-15" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() },
                        { id: makeId(), title: "💡 UX Review", status: "Stuck", priority: "Medium", dueDate: "2025-11-20", timeline: { startDate: "2025-11-15", endDate: "2025-11-20" }, files: generateFilesFor("Minday Project"), updates: generateUpdates() }
                    ]
                }
            ]
        },

        /* ------------------------------------------------------------------
           2) 🏡  HOME MAINTENANCE
        ------------------------------------------------------------------ */
        {
            _id: makeId(),
            title: "🏡 Home Maintenance",
            createdAt: Date.now(),
            members: [],
            groups: [
                {
                    id: makeId(),
                    title: "🌿 Garden",
                    color: "#00c875",
                    tasks: [
                        { id: makeId(), title: "🌻 Plant Sunflowers", status: "Stuck", priority: "Low", dueDate: "2025-02-28", timeline: generateDateRangeObj(2), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "✂️ Trim Hedges", status: "Working on it", priority: "Critical ⚠️", dueDate: "2025-03-03", timeline: generateDateRangeObj(3), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🚿 Fix Garden Hose", status: "Done", priority: "Medium", dueDate: "2025-05-29", timeline: generateDateRangeObj(5), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🪴 Repot Ficus Tree", status: "Done", priority: "Critical ⚠️", dueDate: "2025-07-06", timeline: generateDateRangeObj(7), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🪚 Build Planter Box", status: "Not Started", priority: "High", dueDate: "2025-09-10", timeline: generateDateRangeObj(9), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() }
                    ]
                },
                {
                    id: makeId(),
                    title: "🧼 Routine Cleaning",
                    color: "#579bfc",
                    tasks: [
                        { id: makeId(), title: "🧹 Vacuum Living Room", status: "Done", priority: "Critical ⚠️", dueDate: "2025-01-26", timeline: generateDateRangeObj(1), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🪟 Clean Windows", status: "Working on it", priority: "High", dueDate: "2025-04-30", timeline: generateDateRangeObj(4), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🧽 Scrub Bathrooms", status: "Not Started", priority: "Medium", dueDate: "2025-06-02", timeline: generateDateRangeObj(6), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🗑️ Take Out Recycling", status: "Done", priority: "Low", dueDate: "2025-02-25", timeline: generateDateRangeObj(2), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🧯 Test Smoke Detectors", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-08-07", timeline: generateDateRangeObj(8), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() }
                    ]
                },
                {
                    id: makeId(),
                    title: "🔧 Repairs & Upgrades",
                    color: "#ffcb00",
                    tasks: [
                        { id: makeId(), title: "🚰 Fix Sink Leak", status: "Done", priority: "High", dueDate: "2025-02-29", timeline: generateDateRangeObj(2), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🔌 Replace Hallway Light", status: "Working on it", priority: "Medium", dueDate: "2025-03-31", timeline: generateDateRangeObj(3), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🪜 Clean Gutters", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-10-06", timeline: generateDateRangeObj(10), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🖼️ Paint Bedroom Walls", status: "Done", priority: "Low", dueDate: "2025-07-08", timeline: generateDateRangeObj(7), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() },
                        { id: makeId(), title: "🔒 Install Doorbell Cam", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-11-09", timeline: generateDateRangeObj(11), files: generateFilesFor("Home Maintenance"), updates: generateUpdates() }
                    ]
                }
            ]
        },

        /* ------------------------------------------------------------------
           3) 🎉  PARTY PLANNER
        ------------------------------------------------------------------ */
        {
            _id: makeId(),
            title: "🎉 Party Planner",
            createdAt: Date.now(),
            members: [],
            groups: [
                {
                    id: makeId(),
                    title: "👥 Guest List",
                    color: "#e0bbe4",
                    tasks: [
                        { id: makeId(), title: "💌 Send Invites", status: "Working on it", priority: "Critical ⚠️", dueDate: "2025-02-02", timeline: generateDateRangeObj(2), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "📞 Confirm RSVPs", status: "Stuck", priority: "Medium", dueDate: "2025-03-05", timeline: generateDateRangeObj(3), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🎖️ VIP List", status: "Done", priority: "Critical ⚠️", dueDate: "2025-04-04", timeline: generateDateRangeObj(4), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🪑 Seating Plan", status: "Not Started", priority: "Low", dueDate: "2025-05-07", timeline: generateDateRangeObj(5), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🎁 Party Favors", status: "Done", priority: "High", dueDate: "2025-06-09", timeline: generateDateRangeObj(6), files: generateFilesFor("Party Planner"), updates: generateUpdates() }
                    ]
                },
                {
                    id: makeId(),
                    title: "🍕 Food & Drinks",
                    color: "#ffdfba",
                    tasks: [
                        { id: makeId(), title: "🍕 Order Pizza", status: "Done", priority: "Medium", dueDate: "2025-01-26", timeline: generateDateRangeObj(1), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🍹 Stock Bar", status: "Not Started", priority: "High", dueDate: "2025-03-02", timeline: generateDateRangeObj(3), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🍿 Buy Snacks", status: "Working on it", priority: "Low", dueDate: "2025-02-01", timeline: generateDateRangeObj(2), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🍰 Order Cake", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-04-03", timeline: generateDateRangeObj(4), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🧊 Rent Cooler", status: "Not Started", priority: "Low", dueDate: "2025-05-04", timeline: generateDateRangeObj(5), files: generateFilesFor("Party Planner"), updates: generateUpdates() }
                    ]
                },
                {
                    id: makeId(),
                    title: "🎶 Entertainment",
                    color: "#b6cfb6",
                    tasks: [
                        { id: makeId(), title: "🎧 Book DJ", status: "Stuck", priority: "Critical ⚠️", dueDate: "2025-02-04", timeline: generateDateRangeObj(2), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🎈 Buy Decorations", status: "Working on it", priority: "Medium", dueDate: "2025-03-03", timeline: generateDateRangeObj(3), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "🎤 Rent Karaoke Machine", status: "Not Started", priority: "Low", dueDate: "2025-04-08", timeline: generateDateRangeObj(4), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "📸 Hire Photographer", status: "Done", priority: "Critical ⚠️", dueDate: "2025-05-05", timeline: generateDateRangeObj(5), files: generateFilesFor("Party Planner"), updates: generateUpdates() },
                        { id: makeId(), title: "💡 Lights & Effects", status: "Done", priority: "High", dueDate: "2025-06-06", timeline: generateDateRangeObj(6), files: generateFilesFor("Party Planner"), updates: generateUpdates() }
                    ]
                }
            ]
        }
    ];

    /* ---------- helper generators (copy once) ---------- */
    function generateDateRangeObj(month) {
        const start = new Date(`2025-${String(month).padStart(2, "0")}-01`);
        const offset = Math.floor(Math.random() * 25);
        const startDate = new Date(start.getTime() + offset * 86400000);
        const endDate = new Date(startDate.getTime() + (3 + Math.random() * 2) * 86400000);
        return {
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10)
        };
    }
    function generateUpdates() {
        const users = [
            { _id: "u101", fullname: "John Doe", imgUrl: "https://i.pravatar.cc/40?img=15" },
            { _id: "u102", fullname: "Shani Cohen", imgUrl: "https://i.pravatar.cc/40?img=30" },
            { _id: "u103", fullname: "Alex Kim", imgUrl: "https://i.pravatar.cc/40?img=12" },
            { _id: "u104", fullname: "Maya Singh", imgUrl: "https://i.pravatar.cc/40?img=47" }
        ];
        const texts = [
            "Task reviewed and feedback provided ✅",
            "Performance optimized ⚡",
            "Code cleanup done 🧹",
            "Synced with backend updates 🔄"
        ];
        return Array.from({ length: 2 }, () => {
            const user = users[Math.floor(Math.random() * users.length)];
            return {
                id: makeId(),
                text: texts[Math.floor(Math.random() * texts.length)],
                type: "text",
                createdAt: Date.now() - Math.floor(Math.random() * 5) * 86400000,
                byMember: user
            };
        });
    }
}