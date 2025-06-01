import { useState } from 'react'

export function PersonColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)

    const availableUsers = [
        { id: 'u1', name: 'John', initials: 'JD', color: '#ff7f50' },
        { id: 'u2', name: 'SS', initials: 'SS', color: '#87ceeb' },
        { id: 'u3', name: 'Mike', initials: 'MK', color: '#dda0dd' },
        { id: 'u4', name: 'Anna', initials: 'AN', color: '#98fb98' }
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