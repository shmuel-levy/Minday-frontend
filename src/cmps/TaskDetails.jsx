// === 1. TaskDetails.jsx ===
export function TaskDetails({ task, isOpen, onClose }) {
    // Demo task data
    const demoTask = task || {
        id: 't1',
        title: 'Design Homepage Layout',
        status: 'Working on it',
        priority: 'High',
        assignee: 'John Doe',
        dueDate: '2025-06-15',
        description: 'Create wireframes and design for the main homepage'
    }

    if (!isOpen) return null

    return (
        <div className="task-details-modal">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>{demoTask.title}</h2>
                    <div className="task-info">
                        <p><strong>Status:</strong> {demoTask.status}</p>
                        <p><strong>Priority:</strong> {demoTask.priority}</p>
                        <p><strong>Assignee:</strong> {demoTask.assignee}</p>
                        <p><strong>Due Date:</strong> {demoTask.dueDate}</p>
                        <p><strong>Description:</strong> {demoTask.description}</p>
                    </div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

// === 2. GroupHeader.jsx ===
export function GroupHeader({ group }) {
    // Demo group data
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

// === 3. TaskRow.jsx ===
export function TaskRow({ task, onTaskClick }) {
    // Demo task data
    const demoTask = task || {
        id: 't1',
        title: 'Setup Database Schema',
        status: 'Working on it',
        priority: 'High',
        assignee: 'John Doe',
        dueDate: '2025-06-15',
        avatar: '/avatars/john.jpg'
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

// === 4. BoardTable.jsx ===
export function BoardTable({ board }) {
    // Demo board data with groups and tags
    const demoBoard = board || {
        id: 'b1',
        title: 'Monday Clone Development',
        groups: [
            {
                id: 'g1',
                title: 'Frontend Development',
                color: '#0073ea',
                tasks: [
                    { id: 't1', title: 'Setup React App', status: 'Done', priority: 'High', assignee: 'John Doe', dueDate: '2025-06-01' },
                    { id: 't2', title: 'Create Components', status: 'Working on it', priority: 'High', assignee: 'Jane Smith', dueDate: '2025-06-10' },
                    { id: 't3', title: 'Add Styling', status: 'Stuck', priority: 'Medium', assignee: 'Mike Johnson', dueDate: '2025-06-15' }
                ]
            },
            {
                id: 'g2', 
                title: 'Backend Development',
                color: '#00c875',
                tasks: [
                    { id: 't4', title: 'Setup Database', status: 'Working on it', priority: 'High', assignee: 'Sarah Wilson', dueDate: '2025-06-08' },
                    { id: 't5', title: 'Create API Routes', status: 'Blank', priority: 'Medium', assignee: 'Tom Brown', dueDate: '2025-06-20' }
                ]
            },
            {
                id: 'g3',
                title: 'Testing & QA',
                color: '#e2445c', 
                tasks: [
                    { id: 't6', title: 'Write Unit Tests', status: 'Blank', priority: 'Low', assignee: 'Alex Lee', dueDate: '2025-06-25' }
                ]
            }
        ]
    }

    return (
        <div className="board-table">
            <div className="board-header">
                <h1>{demoBoard.title}</h1>
                <div className="board-actions">
                    <button>Add Group</button>
                    <button>Invite</button>
                    <button>Share</button>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="col-title">Task</div>
                    <div className="col-status">Status</div>
                    <div className="col-assignee">Person</div>
                    <div className="col-priority">Priority</div>
                    <div className="col-date">Due Date</div>
                </div>

                {demoBoard.groups.map(group => (
                    <div key={group.id} className="group-section">
                        <GroupHeader group={group} />
                        <div className="tasks-container">
                            {group.tasks.map(task => (
                                <TaskRow key={task.id} task={task} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}