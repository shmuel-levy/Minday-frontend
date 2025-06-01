import { useState } from 'react'

export function StatusColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)

    const statusOptions = [
        { label: 'Not Started', cssClass: 'not-started', bg: '#c4c4c4', color: '#323338' },
        { label: 'Working on it', cssClass: 'working-on-it', bg: '#fdab3d', color: '#ffffff' },
        { label: 'Stuck', cssClass: 'stuck', bg: '#e2445c', color: '#ffffff' },
        { label: 'Done', cssClass: 'done', bg: '#00c875', color: '#ffffff' },
        { label: 'On Hold', cssClass: 'on-hold', bg: '#a25ddc', color: '#ffffff' }
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
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentStatus.label}
            </div>

            {isOpen && (
                <div className="status-dropdown">
                    {statusOptions.map(option => (
                        <div
                            key={option.label}
                            className="status-option"
                            onClick={() => handleStatusChange(option)}
                        >
                            <span 
                                className="status-preview"
                                style={{ 
                                    backgroundColor: option.bg, 
                                    color: option.color 
                                }}
                            >
                                {option.label}
                            </span>
                        </div>
                    ))}
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