export function TableHeader({ columns = [] }) {
    const defaultColumns = [
        { id: 'checkbox', type: 'checkbox', title: '☐', width: '40px' },
        { id: 'task', type: 'text', title: 'Task', width: 'auto' },
        { id: 'status', type: 'status', title: 'Status', width: '140px' },
        { id: 'owner', type: 'person', title: 'Owner', width: '120px' },
        { id: 'date', type: 'date', title: 'Due date', width: '120px' }
    ]

    const columnsToRender = columns.length ? columns : defaultColumns

    return (
        <div className="table-header">
            {columnsToRender.map(column => (
                <div 
                    key={column.id} 
                    className={`col-${column.id}`}
                    style={{ width: column.width }}
                >
                    {column.title}
                </div>
            ))}
        </div>
    )
}