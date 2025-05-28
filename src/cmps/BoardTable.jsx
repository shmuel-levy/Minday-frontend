import { GroupHeader } from './GroupHeader'
import { TaskRow } from './TaskRow'
import { TaskDetails } from './TaskDetails'
import { useState } from 'react'

export function BoardTable({ board }) {
    const [selectedTask, setSelectedTask] = useState(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

 
    const demoBoard = board?.groups?.length ? board : {
        ...board,
        groups: [
            {
                id: 'g1',
                title: 'Frontend Development',
                color: '#0073ea',
                tasks: [
                    { 
                        id: 't1', 
                        title: 'Setup React App', 
                        status: 'Done', 
                        priority: 'High', 
                        assignee: 'John Doe', 
                        dueDate: '2025-06-01',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    },
                    { 
                        id: 't2', 
                        title: 'Create Components', 
                        status: 'Working on it', 
                        priority: 'High', 
                        assignee: 'Jane Smith', 
                        dueDate: '2025-06-10',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    },
                    { 
                        id: 't3', 
                        title: 'Add Styling', 
                        status: 'Stuck', 
                        priority: 'Medium', 
                        assignee: 'Mike Johnson', 
                        dueDate: '2025-06-15',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    }
                ]
            },
            {
                id: 'g2', 
                title: 'Backend Development',
                color: '#00c875',
                tasks: [
                    { 
                        id: 't4', 
                        title: 'Setup Database', 
                        status: 'Working on it', 
                        priority: 'High', 
                        assignee: 'Sarah Wilson', 
                        dueDate: '2025-06-08',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    },
                    { 
                        id: 't5', 
                        title: 'Create API Routes', 
                        status: 'Blank', 
                        priority: 'Medium', 
                        assignee: 'Tom Brown', 
                        dueDate: '2025-06-20',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    }
                ]
            },
            {
                id: 'g3',
                title: 'Testing & QA',
                color: '#e2445c', 
                tasks: [
                    { 
                        id: 't6', 
                        title: 'Write Unit Tests', 
                        status: 'Blank', 
                        priority: 'Low', 
                        assignee: 'Alex Lee', 
                        dueDate: '2025-06-25',
                        avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    }
                ]
            }
        ]
    }

    function onTaskClick(task) {
        setSelectedTask(task)
        setIsTaskModalOpen(true)
    }

    function closeTaskModal() {
        setIsTaskModalOpen(false)
        setSelectedTask(null)
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

                {demoBoard.groups?.map(group => (
                    <div key={group.id} className="group-section">
                        <GroupHeader 
                            group={{
                                ...group,
                                tasksCount: group.tasks?.length || 0
                            }} 
                        />
                        <div className="tasks-container">
                            {group.tasks?.map(task => (
                                <TaskRow 
                                    key={task.id} 
                                    task={task} 
                                    onTaskClick={onTaskClick}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {!demoBoard.groups?.length && (
                    <div className="empty-board">
                        <h3>No groups yet</h3>
                        <button>Create First Group</button>
                    </div>
                )}
            </div>

            <TaskDetails 
                task={selectedTask}
                isOpen={isTaskModalOpen}
                onClose={closeTaskModal}
            />
        </div>
    )
}