import { TextColumn } from './column-types/TextColumn'
import { StatusColumn } from './column-types/StatusColumn'
import { PersonColumn } from './column-types/PersonColumn'
import { DateColumn } from './column-types/DateColumn'

export function DynamicTaskRow({ task, columns = [], onUpdateTask, isDragging = false }) {
    const defaultColumns = [
        { id: 'checkbox', type: 'checkbox', width: '40px' },
        { id: 'task', type: 'text', width: 'auto' },
        { id: 'status', type: 'status', width: '140px' },
        { id: 'owner', type: 'person', width: '120px' },
        { id: 'date', type: 'date', width: '120px' }
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
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={task.isChecked || false}
                        onChange={(e) => {
                            const updatedTask = { ...task, isChecked: e.target.checked }
                            onUpdateTask?.(updatedTask)
                        }}
                    />
                )
            case 'task':
                value = task.title
                break
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
            case 'checkbox':
                return <input type="checkbox" />
            default:
                return <span>{value}</span>
        }
    }

    return (
        <div className={`task-row${isDragging ? ' drag-preview' : ''}`}>
            <div className="col-checkbox">
                {renderCell(columnsToRender[0])}
            </div>
            <div className="col-task">
                {renderCell(columnsToRender[1])}
            </div>
            <div className="col-status">
                {renderCell(columnsToRender[2])}
            </div>
            <div className="col-owner">
                {renderCell(columnsToRender[3])}
            </div>
            <div className="col-date">
                {renderCell(columnsToRender[4])}
            </div>
        </div>
    )
}