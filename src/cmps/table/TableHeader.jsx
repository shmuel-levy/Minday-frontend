import { useState } from 'react'
import { TaskCheckbox } from '../TaskCheckbox'

export function TableHeader({ 
    columns = [], 
    onToggleAll, 
    groupColor, 
    isAllSelected = false,
    onAddColumnBtnClick,
    addColumnBtnRef
}) {
    const defaultColumns = [
        { id: 'left-indicator', type: 'left-indicator', title: '', width: '6px', editable: false },
        { id: 'checkbox', type: 'checkbox', title: '☐', width: '33px', editable: false },
        { id: 'task', type: 'text', title: 'Task', width: '360px', editable: false },
        { id: 'owner', type: 'person', title: 'Person', width: '97px', editable: true },
        { id: 'status', type: 'status', title: 'Status', width: '139px', editable: true },
        { id: 'date', type: 'date', title: 'Date', width: '139px', editable: true },
        { id: 'timeline', type: 'timeline', title: 'Timeline', width: '180px', editable: true },
        { id: 'priority', type: 'priority', title: 'Priority', width: '139px', editable: true },
        { id: 'members', type: 'members', title: 'People', width: '100px', editable: true },
        { id: 'files', type: 'files', title: 'Files', width: '150px', editable: true },
        { id: 'add-cell', type: 'add-cell', title: '', width: 'auto', editable: false }
    ]

    const [headerTitles, setHeaderTitles] = useState(
        Object.fromEntries(defaultColumns.map(col => [col.id, col.title]))
    )

    function handleTitleChange(id, value) {
        setHeaderTitles(prev => ({ ...prev, [id]: value }))
    }

    const columnsToRender = columns.length ? columns : defaultColumns

    return (
        <div className={`table-header`} style={{ '--group-color': groupColor }}>
            {columnsToRender.map(column => (
                <div
                    key={column.id}
                    className={`col-${column.id}`}
                    style={{ width: column.width }}
                >
                    {column.id === 'checkbox' ? (
                        <TaskCheckbox
                            checked={isAllSelected}
                            onChange={(value) => onToggleAll?.(value)}
                        />
                    ) : column.id === 'add-cell' ? (
                        <button
                            ref={addColumnBtnRef}
                            className="add-column-btn"
                            onClick={onAddColumnBtnClick}
                            title="Add column"
                        >
                            +
                        </button>
                    ) : column.editable ? (
                        <div
                            contentEditable
                            onBlur={e => handleTitleChange(column.id, e.target.textContent)}
                            className="header-input"
                            suppressContentEditableWarning
                        >
                            <span>{headerTitles[column.id]}</span>
                        </div>
                    ) : (
                        headerTitles[column.id]
                    )}
                </div>
            ))}
        </div>
    )
}