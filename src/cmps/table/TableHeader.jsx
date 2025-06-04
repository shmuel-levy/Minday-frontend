import { useState } from 'react'

export function TableHeader({ columns = [], onToggleAll, groupColor }) {
    const defaultColumns = [
        { id: 'checkbox', type: 'checkbox', title: '☐', width: '40px', editable: false },
        { id: 'task', type: 'text', title: 'Task', width: 'auto', editable: false },
        { id: 'status', type: 'status', title: 'Status', width: '140px', editable: true },
        { id: 'owner', type: 'person', title: 'Owner', width: '120px', editable: true },
        { id: 'date', type: 'date', title: 'Due date', width: '120px', editable: true }
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