import { useState } from 'react'

export function TableActions({ 
    columns, 
    onFilterChange, 
    onSortChange, 
    onSearchChange,
    onAddColumn,
    currentFilters = {},
    currentSort = null 
}) {
    const [showFilters, setShowFilters] = useState(false)
    const [showSort, setShowSort] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    function handleSearch(e) {
        const value = e.target.value
        setSearchTerm(value)
        onSearchChange?.(value)
    }

    function handleFilterByColumn(columnId, filterValue) {
        onFilterChange?.({
            ...currentFilters,
            [columnId]: filterValue
        })
    }

    function handleSort(columnId, direction) {
        onSortChange?.({ columnId, direction })
        setShowSort(false)
    }

    return (
        <div className="table-actions">
            <div className="table-controls-left">
                <button className="btn-new-task">
                    New task
                </button>
                
                <div className="search-container">
                    <button className="btn-control">
                        🔍
                    </button>
                    <input 
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="table-controls-right">
                <div className="filter-dropdown">
                    <button 
                        className={`btn-control ${Object.keys(currentFilters).length > 0 ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        🔽 Filter {Object.keys(currentFilters).length > 0 && `(${Object.keys(currentFilters).length})`}
                    </button>
                    
                    {showFilters && (
                        <div className="filter-menu">
                            {columns.map(column => {
                                if (column.type === 'status') {
                                    return (
                                        <div key={column.id} className="filter-group">
                                            <label>{column.title}</label>
                                            <select 
                                                value={currentFilters[column.id] || ''}
                                                onChange={(e) => handleFilterByColumn(column.id, e.target.value)}
                                            >
                                                <option value="">All</option>
                                                {column.options?.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                }
                                return null
                            })}
                            
                            <button 
                                className="clear-filters-btn"
                                onClick={() => onFilterChange?.({})}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                <div className="sort-dropdown">
                    <button 
                        className={`btn-control ${currentSort ? 'active' : ''}`}
                        onClick={() => setShowSort(!showSort)}
                    >
                        ⬇️ Sort
                    </button>
                    
                    {showSort && (
                        <div className="sort-menu">
                            {columns.map(column => (
                                <div key={column.id} className="sort-group">
                                    <span className="sort-column-name">{column.title}</span>
                                    <div className="sort-buttons">
                                        <button 
                                            onClick={() => handleSort(column.id, 'asc')}
                                            className={currentSort?.columnId === column.id && currentSort?.direction === 'asc' ? 'active' : ''}
                                        >
                                            ↑ A-Z
                                        </button>
                                        <button 
                                            onClick={() => handleSort(column.id, 'desc')}
                                            className={currentSort?.columnId === column.id && currentSort?.direction === 'desc' ? 'active' : ''}
                                        >
                                            ↓ Z-A
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className="btn-control" onClick={() => {}}>
                    👤 Person
                </button>

                <button className="btn-add-column" onClick={onAddColumn}>
                    + Add Column
                </button>
            </div>
        </div>
    )
}