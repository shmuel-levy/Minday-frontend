import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupHeader } from './GroupHeader'
import { TableHeader } from './table/TableHeader'
import { DynamicTaskRow } from './table/DynamicTaskRow'

export function BoardTable({ board, onUpdateTask }) {
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

        const updatedBoard = { ...demoBoard, groups: updatedGroups }
        setDemoBoard(updatedBoard)
        
        if (onUpdateTask) {
            onUpdateTask(updatedBoard)
        }
        
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
        
        const updatedBoard = { ...demoBoard, groups: updatedGroups }
        setDemoBoard(updatedBoard)
        
        if (onUpdateTask) {
            onUpdateTask(updatedBoard)
        }
    }

    return (
        <div className="board-table">
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