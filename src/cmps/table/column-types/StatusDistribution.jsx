export function StatusDistribution({ tasks }) {
    const statusOptions = [
        { label: 'Not Started', cssClass: 'not-started', bg: '#c4c4c4', color: '#323338' },
        { label: 'Working on it', cssClass: 'working-on-it', bg: '#fdab3d', color: '#ffffff' },
        { label: 'Stuck', cssClass: 'stuck', bg: '#df2f4a', color: '#ffffff' },
        { label: 'Done', cssClass: 'done', bg: '#00c875', color: '#ffffff' }
    ]

    const statusCounts = tasks.reduce((acc, task) => {
        const status = task.status || 'Not Started' 
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, {})

    const totalTasks = tasks.length

    return (
        <div className="status-distribution-container">
            {statusOptions.map(option => {
                const count = statusCounts[option.label] || 0
                const percentage = totalTasks > 0 ? (count / totalTasks) * 100 : 0
                return (
                    <div
                        key={option.label}
                        className="status-segment"
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