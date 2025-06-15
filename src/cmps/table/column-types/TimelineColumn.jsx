import { useState, useMemo } from 'react'
import { CloseDateIcon } from '../../svg/CloseDateIcon'

export function TimelineColumn({ value, onUpdate }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [dates, setDates] = useState(() => ({
        start: value?.startDate ? new Date(value.startDate) : null,
        end: value?.endDate ? new Date(value.endDate) : null
    }))

    const displayText = useMemo(() => {
        if (!dates.start || !dates.end) return "-"
        const start = dates.start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        const end = dates.end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        return dates.start.getMonth() === dates.end.getMonth() ?
            `${start} - ${dates.end.getDate()}` : `${start} - ${end}`
    }, [dates])

    const totalDays = useMemo(() => {
        if (!dates.start || !dates.end) return null
        const diffTime = Math.abs(dates.end.getTime() - dates.start.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    }, [dates])

    const getTimelineBackground = () => {
        if (!dates.start || !dates.end) return '#C4C4C4'
        const total = dates.end.getTime() - dates.start.getTime()
        const now = new Date()
        const progress = Math.min(Math.max((now.getTime() - dates.start.getTime()) / total, 0), 1)
        const percentage = Math.floor(progress * 100)
        return `linear-gradient(to right, #579bfc ${percentage}%, #333333 ${percentage}%)`
    }

    const handleDateClick = (date) => {
        const clicked = new Date(date)
        clicked.setHours(0, 0, 0, 0)

        if (!dates.start || (dates.start && dates.end)) {
            setDates({ start: clicked, end: null })
        } else {
            const newEnd = clicked >= dates.start ? clicked : dates.start
            const newStart = clicked >= dates.start ? dates.start : clicked
            setDates({ start: newStart, end: newEnd })
            onUpdate?.({
                startDate: newStart.toISOString().split('T')[0],
                endDate: newEnd.toISOString().split('T')[0]
            })
            setIsOpen(false)
        }
    }

    const generateCalendar = () => {
        const now = new Date()
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
        const startCal = new Date(firstDay)
        startCal.setDate(startCal.getDate() - firstDay.getDay())

        const days = []
        for (let i = 0; i < 42; i++) {
            days.push(new Date(startCal))
            startCal.setDate(startCal.getDate() + 1)
        }
        return days
    }

    const isInRange = (date) => dates.start && dates.end && date >= dates.start && date <= dates.end
    const isSelected = (date) => (dates.start && date.getTime() === dates.start.getTime()) ||
        (dates.end && date.getTime() === dates.end.getTime())

    const calendarDays = generateCalendar()
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div className="timeline-container">
            <div
                className="timeline"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(!isOpen)}
                style={{ background: getTimelineBackground() }}
            >
                {!isHovered ? (
                    <span>{displayText}</span>
                ) : (
                    <>
                        <span>
                            {(!dates.start || !dates.end)
                                ? 'Set Dates'
                                : `${totalDays}d`
                            }
                        </span>
                        {dates.end && (
                            <span className="reset-btn">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDates({ start: null, end: null });
                                        onUpdate?.({ startDate: '', endDate: '' });
                                    }}
                                >
                                    <CloseDateIcon />
                                </button>
                            </span>
                        )}
                    </>
                )}
            </div>

            {isOpen && (
                <>
                    <div className="timeline-modal">
                        <div className="modal-header">
                            <span>Set Dates</span>
                            <span>{dates.start && dates.end ? `${totalDays} days selected` : ''}</span>
                        </div>

                        <div className="date-inputs">
                            <input
                                type="date"
                                value={dates.start ? dates.start.toISOString().split('T')[0] : ''}
                                onChange={(e) => setDates(prev => ({ ...prev, start: new Date(e.target.value) }))}
                            />
                            <input
                                type="date"
                                value={dates.end ? dates.end.toISOString().split('T')[0] : ''}
                                onChange={(e) => setDates(prev => ({ ...prev, end: new Date(e.target.value) }))}
                            />
                        </div>

                        <div className="calendar">
                            <div className="cal-header">
                                <span>{currentMonth}</span>
                            </div>
                            <div className="weekdays">
                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                    <div key={day}>{day}</div>
                                ))}
                            </div>
                            <div className="cal-grid">
                                {calendarDays.map((day, i) => (
                                    <button
                                        key={i}
                                        className={`cal-day ${day.getMonth() !== new Date().getMonth() ? 'other' : ''} ${new Date().toDateString() === day.toDateString() ? 'today' : ''} ${isInRange(day) ? 'range' : ''} ${isSelected(day) ? 'selected' : ''}`}
                                        onClick={() => handleDateClick(day)}
                                    >
                                        {day.getDate()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="overlay" onClick={() => setIsOpen(false)} />
                </>
            )}
        </div>
    )
}