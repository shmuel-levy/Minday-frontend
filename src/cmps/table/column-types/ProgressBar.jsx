import { useState } from 'react'

export function ProgressBar({ tasks }) {
    const [showPercentage, setShowPercentage] = useState(false)
    
    const completedTasks = tasks.filter(task => task.status === 'Done').length
    const totalTasks = tasks.length
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return (
        <div 
            className="progress-bar-container"
            onMouseEnter={() => setShowPercentage(true)}
            onMouseLeave={() => setShowPercentage(false)}
        >
            <div 
                className="progress-bar"
                style={{ width: `${percentage}%` }}
            />
            {showPercentage && (
                <div className="progress-percentage">
                    {percentage}%
                </div>
            )}
        </div>
    )
} 