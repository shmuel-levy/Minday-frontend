import { TextColumn } from './column-types/TextColumn'
import { StatusColumn } from './column-types/StatusColumn'
import { PersonColumn } from './column-types/PersonColumn'
import { DateColumn } from './column-types/DateColumn'
import { TimelineColumn } from './column-types/TimelineColumn'
import { PriorityColumn } from './column-types/PriorityColumn'
import { MembersColumn } from './column-types/MembersColumn'
import { FilesColumn } from './column-types/FilesColumn'
import { AddUpdateIcon } from '../svg/AddUpdateIcon'
import { TaskCheckbox } from '../TaskCheckbox'

export function DynamicTaskRow({
    task,
    groupColor,
    columns = [],
    onUpdateTask,
    onOpenUpdates,
    isDragging = false,
    onTaskSelection,
    isSelected = false
}) {
    const defaultColumns = [
        { id: 'left-indicator', type: 'left-indicator', width: '6px'},
        { id: 'checkbox', type: 'checkbox', width: '33px'},
        { id: 'task', type: 'text', width: '295px'},
        { id: 'add-update', type: 'add-update', width: '65px'},
        { id: 'status', type: 'status', width: '139px'},
        { id: 'owner', type: 'person', width: '97px'},
        { id: 'date', type: 'date', width: '139px'},
        { id: 'timeline', type: 'timeline', width: '180px'},
        { id: 'priority', type: 'priority', width: '139px'},
        { id: 'members', type: 'members', width: '150px'},
        { id: 'files', type: 'files', width: '150px'},
        { id: 'add-cell', type: 'add-cell', width: 'auto' }
    ]

    const columnsToRender = columns.length ? columns : defaultColumns

    function handleCellUpdate(columnId, newValue) {
        if (onUpdateTask) {
            const updatedTask = { ...task }

            switch (columnId) {
                case 'task':
                    updatedTask.title = newValue
                    break
                case 'status':
                    updatedTask.status = newValue
                    break
                case 'owner':
                    updatedTask.assignee = newValue
                    break
                case 'date':
                    updatedTask.dueDate = newValue
                    break
                case 'timeline':
                    updatedTask.timeline = newValue
                    break
                case 'priority':
                    updatedTask.priority = newValue
                    break
                case 'members':
                    updatedTask.members = newValue
                    break
                case 'files':
                    updatedTask.files = newValue
                    break
                default:
                    // Handle dynamic columns
                    updatedTask[columnId] = newValue
                    break
            }

            onUpdateTask(updatedTask)
        }
    }

    function renderCell(column) {
        let value = ''

        switch (column.id) {
            case 'left-indicator':
                return <></>;

            case 'checkbox':
                return (
                    <TaskCheckbox
                        checked={isSelected}
                        onChange={(newValue) => {
                            onTaskSelection?.(newValue)
                            onUpdateTask?.({ ...task, isChecked: newValue })
                        }}
                    />
                )

            case 'task':
                return (
                    <div className="task-with-icon">
                        <TextColumn
                            value={task.title}
                            onUpdate={(newValue) => handleCellUpdate('task', newValue)}
                            placeholder="Enter task..."
                        />
                    </div>
                )

            case 'add-update':
                const updatesCount = task.updates?.length || 0;

                return (
                    <button
                        onClick={() => onOpenUpdates?.(task.id)}
                        title="Add update"
                        className="add-update-button"
                    >
                        <AddUpdateIcon updatesCount={updatesCount} />
                    </button>
                )

            case 'status':
                value = task.status
                break
            case 'owner':
                value = task.assignee
                break
            case 'date':
                value = task.dueDate
                break
            case 'timeline':
                value = task.timeline || { startDate: '', endDate: '' }
                break
            case 'priority':
                value = task.priority
                break
            case 'members':
                value = task.members
                break
            case 'files':
                value = task.files
                break
            case 'add-cell':
                return <></>;
            default:
                value = task[column.id] || ''
                break
        }

        switch (column.type) {
            case 'text':
                return (
                    <TextColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        placeholder={`Enter ${column.title || column.id}...`}
                    />
                )

            case 'status':
                return (
                    <StatusColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                    />
                )

            case 'person':
                return (
                    <PersonColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                    />
                )

            case 'date':
                return (
                    <DateColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                    />
                )

            case 'timeline':
                return (
                    <TimelineColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        task={task}
                    />
                )

            case 'priority':
                return (
                    <PriorityColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                    />
                )

            case 'members':
                return (
                    <MembersColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        task={task}
                    />
                )

            case 'files':
                return (
                    <FilesColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        task={task}
                    />
                )

            case 'numbers':
                return (
                    <TextColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        placeholder="0"
                        type="number"
                    />
                )

            case 'add-cell':
                return <></>;

            default:
                return (
                    <TextColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        placeholder={`Enter ${column.title || column.id}...`}
                    />
                )
        }
    }

    return (
        <div
            className={`task-row${isDragging ? ' drag-preview' : ''}`}
            style={{ '--group-color': groupColor }}
        >
            {columnsToRender.map((column, index) => (
                <div
                    key={column.id}
                    className={`col-${column.id}`}
                    style={{ width: column.width }}
                >
                    {renderCell(column)}
                </div>
            ))}
        </div>
    )
}