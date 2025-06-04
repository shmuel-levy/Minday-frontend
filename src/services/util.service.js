export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function getRandomColor() {
    const colors = ['#037F4C', '#00C875', '#9CD326', '#CAB641', '#FFCB00', '#784BD1', '#9D50DD', '#007EB5', '#579BFC', '#66CCFF', '#BB3354', '#FF007F', '#FF5AC4', '#FF642E', '#FDAB3D', '#7F5347', '#C4C4C4', '#757575']
    return colors[Math.floor(Math.random() * colors.length)]
}

// User Utility Functions
export function formatUserForDisplay(user) {
    if (!user) return null
    
    return {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
        initials: getInitials(user.fullname),
        color: generateUserColor(user._id)
    }
}

export function getInitials(fullname) {
    if (!fullname) return '?'
    
    const names = fullname.trim().split(' ')
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export function generateUserColor(userId) {
    // Generate consistent color based on user ID
    const colors = [
        '#ff7f50', // coral
        '#87ceeb', // skyblue  
        '#dda0dd', // plum
        '#98fb98', // palegreen
        '#f0e68c', // khaki
        '#ff69b4', // hotpink
        '#40e0d0', // turquoise
        '#ee82ee', // violet
        '#90ee90', // lightgreen
        '#ffa07a', // lightsalmon
        '#20b2aa', // lightseagreen
        '#87cefa', // lightskyblue
        '#778899', // lightslategray
        '#b0c4de', // lightsteelblue
        '#ffb6c1', // lightpink
    ]
    
    if (!userId) return colors[0]
    
    // Simple hash function to get consistent color
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
}

export function formatUsersForSelect(users) {
    return users.map(formatUserForDisplay).filter(Boolean)
}