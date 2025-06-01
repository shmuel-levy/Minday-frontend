import { useState } from 'react'

export function DateColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(value || '')

    function formatDisplayDate(dateStr) {
        if (!dateStr) return ''
        
        if (dateStr.includes('/') || dateStr.includes('-')) {
            const date = new Date(dateStr)
            if (!isNaN(date)) {
                return date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                })
            }
        }
        
        return dateStr
    }

    function getDateClass() {
        if (!selectedDate) return 'empty'
        
        const today = new Date()
        const taskDate = new Date(selectedDate)
        
        if (isNaN(taskDate)) return 'normal'
        
        if (taskDate < today) return 'overdue'
        if (taskDate.toDateString() === today.toDateString()) return 'today'
        return 'normal'
    }

    function handleDateChange(e) {
        const newDate = e.target.value
        if (newDate) {
            const date = new Date(newDate)
            const formatted = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            })
            setSelectedDate(formatted)
            if (onUpdate) {
                onUpdate(formatted)
            }
        }
        setIsOpen(false)
    }

    function clearDate() {
        setSelectedDate('')
        if (onUpdate) {
            onUpdate('')
        }
        setIsOpen(false)
    }

    return (
        <div className="date-column">
            <div 
                className={`date-display ${getDateClass()}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedDate || '+ Date'}
            </div>

            {isOpen && (
                <div className="date-dropdown">
                    <input
                        type="date"
                        className="date-input"
                        onChange={handleDateChange}
                        autoFocus
                    />
                    
                    {selectedDate && (
                        <button
                            className="clear-date-btn"
                            onClick={clearDate}
                        >
                            Clear date
                        </button>
                    )}
                </div>
            )}

            {isOpen && <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />}
        </div>
    )
}