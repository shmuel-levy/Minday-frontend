import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupHeader } from './GroupHeader'
import { TableHeader } from './table/TableHeader'
import { DynamicTaskRow } from './table/DynamicTaskRow'
import { getRandomColor } from '../services/util.service'
import { AddBoard } from './svg/AddBoard'

export function BoardTable({ board, onUpdateTask }) {
    const currentBoard = board || useSelector(storeState => storeState.boardModule.board)
    const [taskDrafts, setTaskDrafts] = useState({})
    const [checkedTasks, setCheckedTasks] = useState({})

    const [demoBoard, setDemoBoard] = useState(() =>
        currentBoard?.groups?.length ? currentBoard : {
            ...currentBoard,
            title: currentBoard?.title || "Monday - Sprint 4 - Design Approval",
            groups: [
                {
                    id: 'g1',
                    title: 'Frontend',
                    color: getRandomColor(),
                    tasks: [
                        { id: 't1', title: 'Implement Task Preview UI 2', status: 'Working on it', assignee: 'John', dueDate: 'May 26', isChecked: false },
                        { id: 't2', title: 'Build Board List component', status: 'Done', assignee: 'SS', dueDate: 'May 25', isChecked: false },
                        { id: 't3', title: 'Create Task Details modal', status: 'Stuck', assignee: 'Mike', dueDate: 'May 27', isChecked: false },
                        { id: 't4', title: 'Add drag & drop for tasks', status: 'Working on it', assignee: 'SS', dueDate: 'May 28', isChecked: false }
                    ]
                },
                {
                    id: 'g2',
                    title: 'Backend',
                    color: getRandomColor(),
                    tasks: [
                        { id: 't5', title: 'Set up Express server', status: 'Working on it', assignee: 'SS', dueDate: 'May 30', isChecked: false },
                        { id: 't6', title: 'Create MongoDB schema files', status: 'Working on it', assignee: 'John', dueDate: 'May 30', isChecked: false },
                        { id: 't7', title: 'Build Login & Signup pages', status: 'Working on it', assignee: 'Mike', dueDate: 'May 31', isChecked: false }
                    ]
                },
                {
                    id: 'g3',
                    title: 'QA',
                    color: getRandomColor(),
                    tasks: [
                        { id: 't8', title: 'Write test cases for Auth', status: 'Not started', assignee: 'Dana', dueDate: 'Jun 2', isChecked: false },
                        { id: 't9', title: 'Test drag-and-drop tasks', status: 'Working on it', assignee: 'Eli', dueDate: 'Jun 3', isChecked: false }
                    ]
                },
                {
                    id: 'g4',
                    title: 'Bugs & Issues',
                    color: getRandomColor(),
                    tasks: [
                        { id: 't10', title: 'Fix login redirect bug', status: 'Stuck', assignee: 'John', dueDate: 'Jun 4', isChecked: false },
                        { id: 't11', title: 'Resolve layout shift on Safari', status: 'Working on it', assignee: 'SS', dueDate: 'Jun 5', isChecked: false }
                    ]
                }
            ]
        }
    )

    function handleAdd(groupId) {
        const title = (taskDrafts[groupId] || '').trim()
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
        setTaskDrafts(prev => ({ ...prev, [groupId]: '' }))
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

    function handleAddGroup() {
        const newColor = getRandomColor()
        const newGroup = {
            id: `g${Date.now()}`,
            title: 'New Group',
            color: newColor,
            tasks: []
        }

        setDemoBoard(prev => ({
            ...prev,
            groups: [...prev.groups, newGroup]
        }))
    }

    function toggleAllInGroup(groupId, isChecked) {
        const updatedGroups = demoBoard.groups.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    tasks: group.tasks.map(task => ({
                        ...task,
                        isChecked,
                    })),
                }
                : group
        )

        setDemoBoard({ ...demoBoard, groups: updatedGroups })
    }

    return (
        <div className="board-table">
            <div className="table-wrapper">
                {demoBoard.groups?.map(group => (
                    <div key={group.id} className="group-section">
                        <GroupHeader group={group} />

                        <div className="tasks-container" style={{ borderLeft: `6px solid ${group.color}` }}>
                            <TableHeader
                                onToggleAll={(checked) => toggleAllInGroup(group.id, checked)}
                            />
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
                                        value={taskDrafts[group.id] || ''}
                                        onChange={e =>
                                            setTaskDrafts(prev => ({ ...prev, [group.id]: e.target.value }))
                                        }
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

            <div className="add-group-container">
                <button className="btn-add-group" onClick={handleAddGroup}>
                    <AddBoard className="icon" />
                    <span>Add new group</span>
                </button>
            </div>
        </div>
    )
}