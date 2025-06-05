import { useState, forwardRef, useImperativeHandle } from 'react'
import { useSelector } from 'react-redux'
import { GroupHeader } from './GroupHeader'
import { TableHeader } from './table/TableHeader'
import { DynamicTaskRow } from './table/DynamicTaskRow'
import { getRandomColor } from '../services/util.service'
import { AddBoard } from './svg/AddBoard'
import { UpdateModal } from './UpdateModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export const BoardTable = forwardRef(function BoardTable({ board, onUpdateTask, onAddNewTask }, ref) {
    const currentBoard = board || useSelector(storeState => storeState.boardModule.board)
    const [taskDrafts, setTaskDrafts] = useState({})
    const [focusTaskId, setFocusTaskId] = useState(null)
    const [openTaskId, setOpenTaskId] = useState(null)

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
                }
            ]
        }
    )

    function handleAddNewTask() {
        let updatedBoard = { ...demoBoard }

        // Create default group if none exist
        if (!updatedBoard.groups?.length) {
            updatedBoard.groups = [{
                id: `g${Date.now()}`,
                title: 'New Group',
                color: getRandomColor(),
                tasks: []
            }]
        }

        const newTask = {
            id: `t${Date.now()}`,
            title: 'New task',
            status: 'Not Started',
            assignee: '',
            dueDate: '',
            isChecked: false
        }

        // Add to FIRST position in first group
        updatedBoard.groups[0].tasks = [newTask, ...updatedBoard.groups[0].tasks]

        setDemoBoard(updatedBoard)
        setFocusTaskId(newTask.id)

        if (onAddNewTask) onAddNewTask(newTask, updatedBoard.groups[0].id)
    }

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
                ? { ...group, tasks: group.tasks.map(task => task.id === updatedTask.id ? updatedTask : task) }
                : group
        )
        setDemoBoard({ ...demoBoard, groups: updatedGroups })
    }

    function handleAddGroup() {
        const newGroup = {
            id: `g${Date.now()}`,
            title: 'New Group',
            color: getRandomColor(),
            tasks: []
        }
        setDemoBoard(prev => ({ ...prev, groups: [...prev.groups, newGroup] }))
    }

    function handleAddGroupAtTop() {
        const newGroup = {
            id: `g${Date.now()}`,
            title: 'New Group',
            color: getRandomColor(),
            tasks: []
        }
        setDemoBoard(prev => ({ ...prev, groups: [newGroup, ...prev.groups] }))
    }

    function toggleAllInGroup(groupId, isChecked) {
        const updatedGroups = demoBoard.groups.map(group =>
            group.id === groupId
                ? { ...group, tasks: group.tasks.map(task => ({ ...task, isChecked })) }
                : group
        )
        setDemoBoard({ ...demoBoard, groups: updatedGroups })
    }

    function handleDragEnd(result) {
        const { source, destination } = result
        if (!destination) return

        const srcGroupIdx = demoBoard.groups.findIndex(g => g.id === source.droppableId)
        const destGroupIdx = demoBoard.groups.findIndex(g => g.id === destination.droppableId)
        if (srcGroupIdx === -1 || destGroupIdx === -1) return

        const srcGroup = demoBoard.groups[srcGroupIdx]
        const destGroup = demoBoard.groups[destGroupIdx]

        const [movedTask] = srcGroup.tasks.splice(source.index, 1)
        destGroup.tasks.splice(destination.index, 0, movedTask)

        const updatedGroups = [...demoBoard.groups]
        updatedGroups[srcGroupIdx] = { ...srcGroup }
        updatedGroups[destGroupIdx] = { ...destGroup }

        setDemoBoard(prev => ({ ...prev, groups: updatedGroups }))
    }

    useImperativeHandle(ref, () => ({
        handleAddNewTask,
        handleAddGroupAtTop
    }))


    return (
        <div className="board-table">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="table-wrapper">
                    {demoBoard.groups?.map(group => (
                        <Droppable droppableId={group.id} key={group.id}>
                            {(provided) => (
                                <div
                                    className="group-section"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <GroupHeader group={group} />
                                    <div className="tasks-container" >
                                        <TableHeader onToggleAll={(checked) => toggleAllInGroup(group.id, checked)}
                                            groupColor={group.color} />
                                        {group.tasks?.map((task, idx) => (
                                            <Draggable draggableId={task.id} index={idx} key={task.id}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <DynamicTaskRow
                                                            task={task}
                                                            groupColor={group.color}
                                                            onUpdateTask={(updatedTask) => handleUpdateTask(group.id, updatedTask)}
                                                            shouldFocus={focusTaskId === task.id}
                                                            onFocusHandled={() => setFocusTaskId(null)}
                                                            isDragging={snapshot.isDragging}
                                                            onOpenUpdates={(taskId) => setOpenTaskId(taskId)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        <div className="add-task-row" style={{ '--group-color': group.color }}>
                                            <div className="col-checkbox"></div>
                                            <div className="col-task">
                                                <input
                                                    type="text"
                                                    placeholder="+ Add task"
                                                    className="input-add-task"
                                                    value={taskDrafts[group.id] || ''}
                                                    onChange={e => setTaskDrafts(prev => ({ ...prev, [group.id]: e.target.value }))}
                                                    onBlur={() => handleAdd(group.id)}
                                                    onKeyDown={e => e.key === 'Enter' && handleAdd(group.id)}
                                                />
                                            </div>
                                            <div className="col-status"></div>
                                            <div className="col-owner"></div>
                                            <div className="col-date"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            {openTaskId && (
                <UpdateModal
                    task={demoBoard.groups.flatMap(g => g.tasks).find(t => t.id === openTaskId)}
                    onClose={() => setOpenTaskId(null)}
                />
            )}

            <div className="add-group-container">
                <button className="btn-add-group" onClick={handleAddGroup}>
                    <AddBoard className="icon" />
                    <span>Add new group</span>
                </button>
            </div>
        </div>
    )
})