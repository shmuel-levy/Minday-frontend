import { useState } from 'react'

export function PersonColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)

    const availableUsers = [
        { id: 'u1', name: 'Shoham', initials: 'SS', color: '#ff7f50' },
        { id: 'u2', name: 'Shmuel', initials: 'SL', color: '#87ceeb' },
        { id: 'u3', name: 'Agam', initials: 'AL', color: '#dda0dd' },
        { id: 'u4', name: 'Shani', initials: 'SC', color: '#98fb98' }
    ]

    const currentUser = availableUsers.find(user => user.name === value)

    function handlePersonChange(person) {
        if (onUpdate) {
            onUpdate(person ? person.name : '')
        }
        setIsOpen(false)
    }

    return (
        <div className="person-column">
            <div 
                className="person-display"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentUser ? (
                    <>
                        <div 
                            className="avatar"
                            style={{ backgroundColor: currentUser.color }}
                        >
                            {currentUser.initials}
                        </div>
                        <span className="person-name">{currentUser.name}</span>
                    </>
                ) : (
                    <div className="avatar-placeholder">+</div>
                )}
            </div>

            {isOpen && (
                <div className="person-dropdown">
                    <div
                        className="person-option unassigned"
                        onClick={() => handlePersonChange(null)}
                    >
                        Unassigned
                    </div>

                    {availableUsers.map(user => (
                        <div
                            key={user.id}
                            className="person-option"
                            onClick={() => handlePersonChange(user)}
                        >
                            <div 
                                className="avatar"
                                style={{ backgroundColor: user.color }}
                            >
                                {user.initials}
                            </div>
                            <span className="person-name">{user.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />}
        </div>
    )
}