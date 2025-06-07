import { useState } from 'react'
import { Plus } from "../svg/Plus"

export function TableHeader({ columns = [], onToggleAll, groupColor }) {
    const defaultColumns = [
        { id: 'left-indicator', type: 'left-indicator', title: '', width: '6px', editable: false },
        { id: 'checkbox', type: 'checkbox', title: '☐', width: '33px', editable: false },
        { id: 'task', type: 'text', title: 'Task', width: '360px', editable: false },
        { id: 'status', type: 'status', title: 'Status', width: '139px', editable: true },
        { id: 'owner', type: 'person', title: 'Owner', width: '97px', editable: true },
        { id: 'date', type: 'date', title: 'Due date', width: '139px', editable: true },  
        { id: 'add-cell', type: 'add-cell', title: <Plus />, width: 'auto', editable: false }
    ]

    const [headerTitles, setHeaderTitles] = useState(
        Object.fromEntries(defaultColumns.map(col => [col.id, col.title]))
    )

    function handleTitleChange(id, value) {
        setHeaderTitles(prev => ({ ...prev, [id]: value }))
    }

    const columnsToRender = columns.length ? columns : defaultColumns

    return (
        <div className="table-header" style={{ '--group-color': groupColor }}>
            {columnsToRender.map(column => (
                <div
                    key={column.id}
                    className={`col-${column.id}`}
                    style={{ width: column.width }}
                >
                    {column.id === 'checkbox' ? (
                        <input
                            type="checkbox"
                            className="header-checkbox"
                            onChange={(e) => onToggleAll?.(e.target.checked)}
                        />
                    ) : column.editable ? (
                        <input
                            type="text"
                            value={headerTitles[column.id]}
                            onChange={e => handleTitleChange(column.id, e.target.value)}
                            className="header-input"
                        />
                    ) : (
                        headerTitles[column.id]
                    )}
                </div>
            ))}
        </div>
    )
}