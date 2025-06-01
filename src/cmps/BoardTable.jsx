import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupHeader } from './GroupHeader'
import { TableHeader } from './table/TableHeader'
import { DynamicTaskRow } from './table/DynamicTaskRow'

export function BoardTable({ board }) {
    const currentBoard = board || useSelector(storeState => storeState.boardModule.board)
    const [taskDraft, setTaskDraft] = useState('')

    const [demoBoard, setDemoBoard] = useState(() =>
        currentBoard?.groups?.length ? currentBoard : {
            ...currentBoard,
            title: currentBoard?.title || "Monday - Sprint 4 - Design Approval",
            groups: [
                {
                    id: 'g1',
                    title: 'Frontend',
                    color: '#ffcb00',
                    tasks: [
                        { id: 't1', title: 'Implement Task Preview UI 2', status: 'Working on it', assignee: 'John', dueDate: 'May 26' },
                        { id: 't2', title: 'Build Board List component', status: 'Done', assignee: 'SS', dueDate: 'May 25' },
                        { id: 't3', title: 'Create Task Details modal', status: 'Stuck', assignee: 'Mike', dueDate: 'May 27' },
                        { id: 't4', title: 'Add drag & drop for tasks', status: 'Working on it', assignee: 'SS', dueDate: 'May 28' }
                    ]
                },
                {
                    id: 'g2',
                    title: 'Backend',
                    color: '#00c875',
                    tasks: [
                        { id: 't5', title: 'Set up Express server', status: 'Working on it', assignee: 'SS', dueDate: 'May 30' },
                        { id: 't6', title: 'Create MongoDB schema files', status: 'Working on it', assignee: 'John', dueDate: 'May 30' },
                        { id: 't7', title: 'Build Login & Signup pages', status: 'Working on it', assignee: 'Mike', dueDate: 'May 31' }
                    ]
                }
            ]
        }
    )

    function handleAdd(groupId) {
        const title = taskDraft.trim()
        if (!title) return

        const newTask = {
            id: `t${Date.now()}`,
            title,
            status: 'Not Started',
            assignee: '',
            dueDate: ''
        }

        const updatedGroups = demoBoard.groups.map(group =>
            group.id === groupId
                ? { ...group, tasks: [...group.tasks, newTask] }
                : group
        )

        setDemoBoard({ ...demoBoard, groups: updatedGroups })
        setTaskDraft('')
    }

    function handleUpdateTask(groupId, updatedTask) {
        const updatedGroups = demoBoard.groups.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    tasks: group.tasks.map(task =>
                        task.id === updatedTask.id ? updatedTask : task
                    )
                }
                : group
        )
        setDemoBoard({ ...demoBoard, groups: updatedGroups })
    }

    return (
        <div className="board-table">
            <div className="board-header">
                <div className="board-title-section">
                    <h1>{demoBoard.title}</h1>
                    <div className="board-actions">
                        <button className="btn">Integrate</button>
                        <button className="btn">Automate</button>
                        <div className="board-members">
                            <div className="avatar">S</div>
                            <div className="avatar">SS</div>
                            <div className="invite">+1</div>
                        </div>
                        <button className="btn-primary">Invite / 1</button>
                    </div>
                </div>

                <div className="board-controls">
                    <div className="view-controls">
                        <button className="view-btn active">📋 Main table</button>
                    </div>
                    <div className="table-actions">
                        <button className="btn-new-task">New task</button>
                        <button className="btn-control">🔍 Search</button>
                        <button className="btn-control">👤 Person</button>
                        <button className="btn-control">🔽 Filter</button>
                        <button className="btn-control">⬇️ Sort</button>
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                {demoBoard.groups?.map(group => (
                    <div key={group.id} className="group-section">
                        <GroupHeader group={group} />

                        <TableHeader />

                        <div className="tasks-container">
                            {group.tasks?.map(task => (
                                <DynamicTaskRow 
                                    key={task.id} 
                                    task={task}
                                    onUpdateTask={(updatedTask) => handleUpdateTask(group.id, updatedTask)}
                                />
                            ))}
                            <div className="add-task-row">
                                <div className="col-checkbox"></div>
                                <div className="col-task">
                                    <input
                                        type="text"
                                        placeholder="+ Add task"
                                        className="input-add-task"
                                        value={taskDraft}
                                        onChange={e => setTaskDraft(e.target.value)}
                                        onBlur={() => handleAdd(group.id)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') handleAdd(group.id)
                                        }}
                                    />
                                </div>
                                <div className="col-status"></div>
                                <div className="col-owner"></div>
                                <div className="col-date"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}