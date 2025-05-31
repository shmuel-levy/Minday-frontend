export function TaskRow({ task }) {
    function getStatusColor(status) {
        if (status === 'Done') return '#00c875'
        if (status === 'Working on it') return '#fdab3d'
        if (status === 'Stuck') return '#df2f4a'
        return '#c4c4c4'
    }

    return (
        <div className="task-row">
            <div className="col-checkbox">
                <input type="checkbox" />
            </div>
            <div className="col-task">
                <span>{task.title}</span>
                <button className="task-chat">💬</button>
            </div>
            <div className="col-status">
                <div 
                    className="status-label" 
                    style={{ backgroundColor: getStatusColor(task.status) }}
                >
                    {task.status}
                </div>
            </div>
            <div className="col-owner">
                <div className="owner-avatar">{task.assignee}</div>
            </div>
            <div className="col-date">{task.dueDate}</div>
        </div>
    )
}