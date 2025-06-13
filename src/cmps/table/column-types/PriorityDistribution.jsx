export function PriorityDistribution({ tasks }) {
    const priorityOptions = [
        { label: 'Critical ⚠️', cssClass: 'critical', bg: 'rgb(51 ,51, 51)', color: 'rgb(247, 247, 248)' },
        { label: 'High', cssClass: 'high', bg: 'rgb(64, 22, 148)', color: 'rgb(247, 247, 248)' },
        { label: 'Medium', cssClass: 'medium', bg: 'rgb(85, 89, 223)', color: 'rgb(247, 247, 248)' },
        { label: 'Low', cssClass: 'low', bg: 'rgb(87, 155, 252)', color: 'rgb(247, 247, 248)' }
    ]

    const priorityCounts = tasks.reduce((acc, task) => {
        const priority = task.priority || 'Medium' 
        acc[priority] = (acc[priority] || 0) + 1
        return acc
    }, {})

    const totalTasks = tasks.length

    return (
        <div className="priority-distribution-container">
            {priorityOptions.map(option => {
                const count = priorityCounts[option.label] || 0
                const percentage = totalTasks > 0 ? (count / totalTasks) * 100 : 0
                return (
                    <div
                        key={option.label}
                        className="priority-segment"
                        style={{
                            backgroundColor: option.bg,
                            width: `${percentage}%`
                        }}
                    ></div>
                )
            })}
        </div>
    )
} 