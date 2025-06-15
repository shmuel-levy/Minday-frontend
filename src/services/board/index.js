const { DEV, VITE_LOCAL } = import.meta.env
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

// console.log('VITE_LOCAL:', VITE_LOCAL)
const service = VITE_LOCAL === 'true' ? local : remote

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.boardService = boardService

