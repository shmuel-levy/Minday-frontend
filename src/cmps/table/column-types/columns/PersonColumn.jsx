import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../../../services/user'
import { UserAvatar } from '../../../UserAvatar'

const PlusIcon = () => (
    <div className="plus-icon-date">
        <div className="icon-dapulse-addbtn"></div>
    </div>
)

export function PersonColumn({ value, onUpdate, task }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [availableUsers, setAvailableUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const { board } = useSelector(state => state.boardModule)

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            setLoading(true)
            const users = await userService.getUsers()
            
            const transformedUsers = users.map(user => ({
                ...user,
                fullname: user.fullname || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                username: user.username || user.email,
                imgUrl: user.imgUrl || user.profileImg,
                initials: getInitials(user.firstName, user.lastName, user.fullname)
            }))
            
            setAvailableUsers(transformedUsers)
        } catch (error) {
            console.error('Failed to load users:', error)
            setAvailableUsers([])
        } finally {
            setLoading(false)
        }
    }

    function getInitials(firstName, lastName, fullname) {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
        if (fullname) {
            const names = fullname.split(' ')
            return names.length > 1 
                ? `${names[0][0]}${names[names.length-1][0]}`.toUpperCase()
                : fullname[0].toUpperCase()
        }
        return '?'
    }

    const currentValue = task?.assignee || value || ''
    
    const currentUser = availableUsers.find(user =>
        user.fullname === currentValue ||
        user._id === currentValue ||
        user.username === currentValue ||
        user.email === currentValue
    )

    function handlePersonChange(person) {
        if (onUpdate && task) {
            const updatedTask = {
                ...task,
                assignee: person ? person.fullname : ''
            }
            onUpdate(updatedTask)
        } else if (onUpdate) {
            onUpdate(person ? person.fullname : '')
        }
        setIsOpen(false)
    }

    if (loading) {
        return (
            <div className="person-column">
                <div className="person-display loading">
                    <div className="avatar-placeholder">...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="person-column"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div
                className={`person-display multiple-person-cell-component ${currentUser ? 'assigned' : 'unassigned'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentUser ? (
                    <div className="person-with-plus">
                        {isHovered && <PlusIcon />}
                        <UserAvatar
                            src={currentUser.imgUrl}
                            fullname={currentUser.fullname}
                            userId={currentUser._id}
                            className="person-avatar"
                        />
                    </div>
                ) : (
                    <div className="person-with-plus">
                        {isHovered && <PlusIcon />}
                        <UserAvatar
                            fullname="Unassigned"
                            className="person-icon-small"
                        />
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="person-dropdown">
                    <div
                        className="person-option unassigned"
                        onClick={() => handlePersonChange(null)}
                    >
                        <UserAvatar
                            fullname="Unassigned"
                            className="person-icon-large"
                        />
                        <span>Unassigned</span>
                    </div>

                    {availableUsers.length > 0 ? (
                        availableUsers.map(user => (
                            <div
                                key={user._id}
                                className={`person-option ${currentUser?._id === user._id ? 'selected' : ''}`}
                                onClick={() => handlePersonChange(user)}
                            >
                                <UserAvatar
                                    src={user.imgUrl}
                                    fullname={user.fullname}
                                    userId={user._id}
                                    className="person-avatar-large"
                                />
                                <span className="person-name">
                                    {user.fullname}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="person-option disabled">
                            <span>No users available</span>
                        </div>
                    )}
                </div>
            )}

            {isOpen && <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />}
        </div>
    )
}