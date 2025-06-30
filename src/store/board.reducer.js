export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const ADD_BOARD_ACTIVITY = 'ADD_BOARD_ACTIVITY'
export const REMOVE_TASK_UPDATE = 'REMOVE_TASK_UPDATE'
export const ADD_UPDATE_TO_TASK = 'ADD_UPDATE_TO_TASK'

const initialState = {
    boards: [],
    board: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case REMOVE_TASK_UPDATE: {
            const { groupId, taskId, updateId } = action.payload

            const updatedBoard = {
                ...state.board,
                groups: state.board.groups.map(group => {
                    if (group.id !== groupId) return group
                    return {
                        ...group,
                        tasks: group.tasks.map(task => {
                            if (task.id !== taskId) return task
                            return {
                                ...task,
                                updates: task.updates.filter(u => u.id !== updateId)
                            }
                        })
                    }
                })
            }

            newState = { ...state, board: updatedBoard }
            break
        }
        case ADD_UPDATE_TO_TASK: {
            const { update } = action;
            if (!state.board) return state;
            const updatedBoard = {
                ...state.board,
                groups: state.board.groups.map(group => {
                    if (group.id !== update.groupId) return group;
                    return {
                        ...group,
                        tasks: group.tasks.map(task => {
                            if (task.id !== update.taskId) return task;
                            return {
                                ...task,
                                updates: [...(task.updates || []), update]
                            };
                        })
                    };
                })
            };
            newState = { ...state, board: updatedBoard };
            break;
        }
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD: {
            const boards = state.boards.map(b =>
                b._id === action.board._id ? action.board : b
            )
            newState = {
                ...state,
                boards,
                board:
                    state.board && state.board._id === action.board._id
                        ? action.board         // <- keep the screen in sync
                        : state.board
            }
            break
        }
        case ADD_BOARD_ACTIVITY:
            newState = { ...state, board: { ...state.board, activities: [...state.board.activities || [], action.activity] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const board1 = { _id: 'b101', title: 'Board ' + parseInt(Math.random() * 10), activities: [] }
    const board2 = { _id: 'b102', title: 'Board ' + parseInt(Math.random() * 10), activities: [] }

    state = boardReducer(state, { type: SET_BOARDS, boards: [board1] })
    console.log('After SET_BOARDS:', state)

    state = boardReducer(state, { type: ADD_BOARD, board: board2 })
    console.log('After ADD_BOARD:', state)

    state = boardReducer(state, { type: UPDATE_BOARD, board: { ...board2, title: 'Updated Board' } })
    console.log('After UPDATE_BOARD:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board2._id })
    console.log('After REMOVE_BOARD:', state)

    const activity = { id: 'a' + parseInt(Math.random() * 100), txt: 'Board activity added' }
    state = boardReducer(state, { type: ADD_BOARD_ACTIVITY, boardId: board1._id, activity })
    console.log('After ADD_BOARD_ACTIVITY:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board1._id })
    console.log('After REMOVE_BOARD:', state)
}