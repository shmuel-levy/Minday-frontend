import { useState } from 'react'

export function PriorityColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)

    const priorityOptions = [
        { label: 'Critical ⚠️', cssClass: 'critical', bg: 'rgb(86, 62, 62)', color: 'rgb(247, 247, 248)' },
        { label: 'High', cssClass: 'high', bg: 'rgb(64, 22, 148)', color: 'rgb(247, 247, 248)' },
        { label: 'Medium', cssClass: 'medium', bg: 'rgb(85, 89, 223)', color: 'rgb(247, 247, 248)' },
        { label: 'Low', cssClass: 'low', bg: 'rgb(87, 155, 252)', color: 'rgb(247, 247, 248)' }
    ]

    const currentPriority = priorityOptions.find(option => option.label === value) || priorityOptions[2] // Default to Medium

    function handlePriorityChange(newPriority) {
        if (onUpdate) {
            onUpdate(newPriority.label)
        }
        setIsOpen(false)
    }

    return (
        <div className="priority-column">
            <div 
                className={`priority-cell ${currentPriority.cssClass}`}
                style={{ 
                    backgroundColor: currentPriority.bg,
                    color: currentPriority.color 
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentPriority.label}
                <div className="corner-fold"></div>
            </div>

            {isOpen && (
                <div className="priority-dropdown">
                    <ul className="change-label-container">
                        {priorityOptions.map(option => (
                            <li
                                key={option.label}
                                style={{ 
                                    backgroundColor: option.bg, 
                                    color: option.color 
                                }}
                                onClick={() => handlePriorityChange(option)}
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