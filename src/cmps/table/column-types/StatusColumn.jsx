import { useState } from 'react'

export function StatusColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)

    const statusOptions = [
        { label: 'Not Started', cssClass: 'not-started', bg: '#c4c4c4', color: '#323338' },
        { label: 'Working on it', cssClass: 'working-on-it', bg: '#fdab3d', color: '#ffffff' },
        { label: 'Stuck', cssClass: 'stuck', bg: '#e2445c', color: '#ffffff' },
        { label: 'Done', cssClass: 'done', bg: '#00c875', color: '#ffffff' }
    ]

    const currentStatus = statusOptions.find(option => option.label === value) || statusOptions[0]

    function handleStatusChange(newStatus) {
        if (onUpdate) {
            onUpdate(newStatus.label)
        }
        setIsOpen(false)
    }

    return (
        <div className="status-column">
            <div 
                className={`status-badge ${currentStatus.cssClass}`}
                style={{ 
                    backgroundColor: currentStatus.bg,
                    color: currentStatus.color 
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentStatus.label}
                <div className="corner-fold"></div>
            </div>

            {isOpen && (
                <div className="status-dropdown">
                    <ul className="change-label-container">
                        {statusOptions.map(option => (
                            <li
                                key={option.label}
                                style={{ 
                                    backgroundColor: option.bg, 
                                    color: option.color 
                                }}
                                onClick={() => handleStatusChange(option)}
                            >
                                {option.label}
                                <div className="corner-fold"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && (
                <div 
                    className="dropdown-overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}