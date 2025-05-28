export function GroupHeader({ group }) {

    const demoGroup = group || {
        id: 'g1',
        title: 'Development Tasks',
        tasksCount: 5,
        color: '#0073ea'
    }

    return (
        <div className="group-header">
            <div className="group-title">
                <span className="group-color" style={{ backgroundColor: demoGroup.color }}></span>
                <h3>{demoGroup.title}</h3>
                <span className="tasks-count">({demoGroup.tasksCount} tasks)</span>
            </div>
            <div className="group-actions">
                <button className="add-task-btn">+ Add Task</button>
                <button className="group-menu-btn">⋯</button>
            </div>
        </div>
    )
}