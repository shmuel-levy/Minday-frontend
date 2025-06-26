import io from 'socket.io-client'
import { userService } from '../user'
const { VITE_LOCAL, DEV, PROD } = import.meta.env

// Socket Events
export const SOCKET_EVENT_BOARD_UPDATE = 'board-update'
export const SOCKET_EVENT_MINI_BOARDS_UPDATE = 'mini-boards-update'
export const SOCKET_EVENT_ACTIVITY_ADDED = 'activity-added' // Added for consistency

// Socket Emits
const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = PROD ? '' : '//localhost:3030'

export const socketService = (VITE_LOCAL === 'true') ? createDummySocketService() : createSocketService()

// for debugging from console
if (DEV) window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      // Re-added try-catch for resilience. If the server is down,
      // it won't crash the app. You could fall back to the dummy service here if needed.
      try {
        socket = io(baseUrl)
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      } catch (err) {
        console.error('Cannot connect to socket server', err)
      }
    },
    on(eventName, cb) {
      socket?.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket?.emit(eventName, data)
    },
    login(userId) {
      socket?.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket?.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}

function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login(userId) {
      console.log('Dummy socket login for user:', userId)
    },
    logout() {
      console.log('Dummy socket logout')
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      // Cleaned up the old chat logic
      if (!listenersMap[eventName]) return

      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
  }
  return socketService
}