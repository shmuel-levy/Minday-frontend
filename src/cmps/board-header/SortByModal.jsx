import { useState } from 'react';

export function SortByModal({ onSetSortBy, onClose }) {
    const [selectedColumn, setSelectedColumn] = useState('status');
    const [sortDirection, setSortDirection] = useState('asc');

    // עדכון של העמודה שנבחרה
    function handleColumnChange(event) {
        setSelectedColumn(event.target.value);
    }

    // עדכון של כיוון המיון
    function handleSortDirectionChange(event) {
        setSortDirection(event.target.value);
    }

    // שליחה של המידע למקום המתאים
    function handleApplySort() {
        onSetSortBy({ column: selectedColumn, direction: sortDirection });
        onClose();  // סגירת המודל
    }

    return (
        <div className="sort-modal">
            <h3>Sort By:</h3>
            <div>
                <label>
                    <span>Choose Column:</span>
                    <select value={selectedColumn} onChange={handleColumnChange}>
                        <option value="status">STATUS</option>
                        <option value="date">DATE</option>
                        <option value="priority">Priority</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    <span>Sort Direction:</span>
                    <select value={sortDirection} onChange={handleSortDirectionChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <button onClick={handleApplySort}>Apply</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
