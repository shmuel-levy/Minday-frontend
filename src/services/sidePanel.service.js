// sidePanel.service.js

export const panelTypes = {
    home: 'HOME',
    myWork: 'MY_WORK',
    board: 'BOARD',
    task: 'TASK',
    favorites: 'FAVORITES'
}

export const sidePanelService = {
    getDefaultPanelState,
    isPanelOpen,
    getPanelType
}

function getDefaultPanelState() {
    return {
        type: null,
        isOpen: false,
        info: null
    }
}

function isPanelOpen(type, currentState) {
    return currentState.type === type && currentState.isOpen
}

function getPanelType(pathname) {
    if (pathname === '/') return panelTypes.home
    if (pathname.includes('/board/')) return panelTypes.board
    if (pathname.includes('/my-work')) return panelTypes.myWork
    return null
}