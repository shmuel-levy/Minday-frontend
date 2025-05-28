const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
    return {
        title: 'New Board',
        description: '',
        isStarred: false,
        archivedAt: null,
        createdBy: null,
        style: {
            backgroundImgs: []
        },
        labels: [],
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxMembers: '',
        minTasks: '',
        sortField: '',
        sortDir: '',
        // pageIdx: 0
    }
}

// console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.boardService = boardService

