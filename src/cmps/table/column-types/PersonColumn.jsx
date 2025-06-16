import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../../services/user'
import { formatUsersForSelect } from '../../../services/util.service'
import { UserAvatar } from '../../UserAvatar'

export function PersonColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)
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
            const formattedUsers = formatUsersForSelect(users)
            setAvailableUsers(formattedUsers)
        } catch (error) {
            console.error('Failed to load users:', error)
            setAvailableUsers([])
        } finally {
            setLoading(false)
        }
    }

    const currentUser = availableUsers.find(user =>
        user.fullname === value ||
        user._id === value ||
        user.username === value
    )

    function handlePersonChange(person) {
        if (onUpdate) {
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
        <div className="person-column">
            <div
                className={`person-display multiple-person-cell-component ${currentUser ? 'assigned' : 'unassigned'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className="add-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(true)
                    }}
                >
                    +
                </div>

                {currentUser ? (
                    <UserAvatar
                        src={currentUser.imgUrl}
                        fullname={currentUser.fullname}
                        userId={currentUser._id}
                        className="person-avatar"
                    />
                ) : (
                    <UserAvatar
                        fullname="Unassigned"
                        className="person-icon-small"
                    />
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
                                <span className="person-name">{user.fullname}</span>
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
