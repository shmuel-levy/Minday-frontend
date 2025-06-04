import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../../services/user'
import { formatUsersForSelect, formatUserForDisplay } from '../../../services/util.service'

export function PersonColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)
    const [availableUsers, setAvailableUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    // Get current board members from Redux (optional - can show all users or just board members)
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

    // Find current user by matching the stored value (could be user ID, fullname, etc.)
    const currentUser = availableUsers.find(user => 
        user.fullname === value || 
        user._id === value ||
        user.username === value
    )

    function handlePersonChange(person) {
        if (onUpdate) {
            // Store the user's fullname as the value (or you could store _id)
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
                className="person-display"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentUser ? (
                    <>
                        {currentUser.imgUrl ? (
                            <img 
                                src={currentUser.imgUrl} 
                                alt={currentUser.fullname}
                                className="person-avatar"
                            />
                        ) : (
                            <img 
                                src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                                className="person-icon-small" 
                                alt="" 
                                aria-hidden="true"
                            />
                        )}
                        <span className="person-name">{currentUser.fullname}</span>
                    </>
                ) : (
                    <img 
                        src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                        className="person-icon-small" 
                        alt="" 
                        aria-hidden="true"
                    />
                )}
            </div>

            {isOpen && (
                <div className="person-dropdown">
                    <div
                        className="person-option unassigned"
                        onClick={() => handlePersonChange(null)}
                    >
                        <img 
                            src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                            className="person-icon-large" 
                            alt="" 
                            aria-hidden="true"
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
                                {user.imgUrl ? (
                                    <img 
                                        src={user.imgUrl} 
                                        alt={user.fullname}
                                        className="person-avatar-large"
                                    />
                                ) : (
                                    <img 
                                        src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                                        className="person-icon-large" 
                                        alt="" 
                                        aria-hidden="true"
                                    />
                                )}
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