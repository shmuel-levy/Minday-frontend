import { TextColumn } from './column-types/TextColumn'
import { StatusColumn } from './column-types/StatusColumn'
import { PersonColumn } from './column-types/PersonColumn'
import { DateColumn } from './column-types/DateColumn'
import { AddUpdateIcon } from '../svg/AddUpdateIcon' 

// UPDATE: Add the new props here
export function DynamicTaskRow({ 
    task, 
    groupColor, 
    columns = [], 
    onUpdateTask, 
    onOpenUpdates, 
    isDragging = false,
    onTaskSelection,    // NEW PROP
    isSelected = false  // NEW PROP
}) {
    const defaultColumns = [
        { id: 'left-indicator', type: 'left-indicator', width: '6px'},
        { id: 'checkbox', type: 'checkbox', width: '33px'},
        { id: 'task', type: 'text', width: '295px'},
        { id: 'add-update', type: 'add-update', width: '65px'},
        { id: 'status', type: 'status', width: '139px'},
        { id: 'owner', type: 'person', width: '97px'},
        { id: 'date', type: 'date', width: '139px'},
        { id: 'add-cell', type: 'add-cell', width: 'auto'}
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
                    <input
                        type="checkbox"
                        checked={isSelected}  // CHANGED: Use isSelected instead of task.isChecked
                        onChange={(e) => {
                            // CHANGED: Call selection handler first
                            if (onTaskSelection) {
                                onTaskSelection(e.target.checked)
                            }
                            
                            // Still update the task's isChecked property if needed
                            const updatedTask = { ...task, isChecked: e.target.checked }
                            onUpdateTask?.(updatedTask)
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
                   return (
                          <button
                            onClick={() => onOpenUpdates?.(task.id)}
                            title="Add update"
                        >
                            <AddUpdateIcon />
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
        }

        switch (column.type) {
            case 'text':
                return (
                    <TextColumn
                        value={value}
                        onUpdate={(newValue) => handleCellUpdate(column.id, newValue)}
                        placeholder={`Enter ${column.id}...`}
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
                  case 'col-add-cell':
                return <></>;
           
            default:
                return <span>{value}</span>
        }
    }

    return (
        <div
            className={`task-row${isDragging ? ' drag-preview' : ''}`}
            style={{ '--group-color': groupColor }}
        >
             <div className="col-left-indicator">
                {renderCell(columnsToRender[0])}
            </div>
            <div className="col-checkbox">
                {renderCell(columnsToRender[1])}
            </div>
            <div className="col-task">
                {renderCell(columnsToRender[2])}
            </div>
            <div className="btn-add-update">
                {renderCell(columnsToRender[3])}
            </div>
            <div className="col-status">
                {renderCell(columnsToRender[4])}
            </div>
            <div className="col-owner">
                {renderCell(columnsToRender[5])}
            </div>
            <div className="col-date">
                {renderCell(columnsToRender[6])}
            </div>
             <div className="col-add-cell">
                {renderCell(columnsToRender[7])}
            </div>
             
        </div>
    )
}