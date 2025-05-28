export function TaskRow({ task, onTaskClick }) {

    const demoTask = task || {
        id: 't1',
        title: 'Setup Database Schema',
        status: 'Working on it',
        priority: 'High',
        assignee: 'John Doe',
        dueDate: '2025-06-15',
        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    }

    return (
        <div className="task-row" onClick={() => onTaskClick && onTaskClick(demoTask)}>
            <div className="task-title">
                <span>{demoTask.title}</span>
            </div>
            <div className="task-status">
                <span className={`status-badge ${demoTask.status.toLowerCase().replace(' ', '-')}`}>
                    {demoTask.status}
                </span>
            </div>
            <div className="task-assignee">
                <img src={demoTask.avatar} alt={demoTask.assignee} />
                <span>{demoTask.assignee}</span>
            </div>
            <div className="task-priority">
                <span className={`priority-badge ${demoTask.priority.toLowerCase()}`}>
                    {demoTask.priority}
                </span>
            </div>
            <div className="task-date">
                <span>{demoTask.dueDate}</span>
            </div>
        </div>
    )
}