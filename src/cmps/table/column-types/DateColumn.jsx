import { useState, useMemo } from 'react'

export function DateColumn({ value, onUpdate }) {
    const today = new Date()

    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null)
    const [isOpen, setIsOpen] = useState(false)

    // Separate controlled month/year view
    const [viewedMonth, setViewedMonth] = useState(selectedDate?.getMonth() ?? today.getMonth())
    const [viewedYear, setViewedYear] = useState(selectedDate?.getFullYear() ?? today.getFullYear())

    const formatDisplayDate = () => {
        if (!selectedDate) return '+ Date'
        return selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const calendarDays = useMemo(() => {
        const firstDayOfMonth = new Date(viewedYear, viewedMonth, 1)
        const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1
        const startDate = new Date(firstDayOfMonth)
        startDate.setDate(firstDayOfMonth.getDate() - startDay)

        const days = []
        for (let i = 0; i < 42; i++) {
            days.push(new Date(startDate))
            startDate.setDate(startDate.getDate() + 1)
        }
        return days
    }, [viewedMonth, viewedYear])

    const handleDayClick = (day) => {
        setSelectedDate(day)
        onUpdate?.(day.toISOString())
        setIsOpen(false)
    }

    const handleToday = () => {
        const todayDate = new Date()
        setSelectedDate(todayDate)
        setViewedMonth(todayDate.getMonth())
        setViewedYear(todayDate.getFullYear())
        onUpdate?.(todayDate.toISOString())
        setIsOpen(false)
    }

    const handleMonthChange = (diff) => {
        const newDate = new Date(viewedYear, viewedMonth + diff, 1)
        setViewedMonth(newDate.getMonth())
        setViewedYear(newDate.getFullYear())
    }

    const handleClearDate = () => {
        setSelectedDate(null)
        onUpdate?.('')
        setIsOpen(false)
    }

    return (
        <div className="date-column">
            <div className="date-display" onClick={() => setIsOpen(!isOpen)}>
                {formatDisplayDate()}
            </div>

            {isOpen && (
                <>
                    <div className="date-picker-modal">
                        <button className="today-btn" onClick={handleToday}>Today</button>

                        <div className="month-header">
                            <button onClick={() => handleMonthChange(-1)}>{'<'}</button>
                            <span>{new Date(viewedYear, viewedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            <button onClick={() => handleMonthChange(1)}>{'>'}</button>
                        </div>

                        <div className="weekdays">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>

                        <div className="calendar-grid">
                            {calendarDays.map((day, idx) => {
                                const isToday = day.toDateString() === today.toDateString()
                                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                                const isCurrentMonth = day.getMonth() === viewedMonth

                                return (
                                    <div
                                        key={idx}
                                        className={`day-cell ${isCurrentMonth ? '' : 'other'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        {day.getDate()}
                                    </div>
                                )
                            })}
                        </div>

                        <button className="clear-btn" onClick={handleClearDate}>
                            Clear Date
                        </button>
                    </div>

                    <div className="overlay-due-date" onClick={() => setIsOpen(false)} />
                </>
            )}
        </div>
    )
}