import { useState, useMemo } from 'react';
import { CheckmarkIcon } from '../../svg/CheckmarkIcon';
import { CloseDateIcon } from '../../svg/CloseDateIcon';
import { WarningIcon } from '../../svg/WarningIcon';

const getStatusStyle = (status) => {
    switch (status) {
        case 'Done': return { backgroundColor: '#00C875', color: '#F7F7F8' };
        case 'Working on it': return { backgroundColor: '#fdab3d', color: '#F7F7F8' };
        case 'Stuck': return { backgroundColor: '#DF2F4A', color: '#F7F7F8' };
        case 'Not Started': return { backgroundColor: '#C4C4C4', color: '#F7F7F8' };
        case 'Important': return { backgroundColor: '#007EB5', color: '#F7F7F8' };
        default: return { backgroundColor: '#C4C4C4', color: '#F7F7F8' };
    }
};

export function TimelineColumn({ value, onUpdate, task }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dates, setDates] = useState(() => ({
        start: value?.startDate ? new Date(value.startDate) : null,
        end: value?.endDate ? new Date(value.endDate) : null
    }));

    const statusStyle = dates.start && dates.end ? getStatusStyle(task?.status) : { backgroundColor: '#C4C4C4', color: '#F7F7F8' };

    const displayText = useMemo(() => {
        if (!dates.start || !dates.end) return "-";
        const start = dates.start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const end = dates.end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        return dates.start.getMonth() === dates.end.getMonth() ? 
            `${start} - ${dates.end.getDate()}` : `${start} - ${end}`;
    }, [dates]);

    const getSmartTooltip = () => {
        if (!dates.start || !dates.end) return '';
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date(dates.end);
        endDate.setHours(0, 0, 0, 0);
        
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (task?.status === 'Done') {
            return 'Done on time';
        } else if (diffDays < 0) {
            const overdueDays = Math.abs(diffDays);
            return `${overdueDays} days overdue`;
        } else if (diffDays === 0) {
            return 'Due today';
        } else {
            return `${diffDays} days left`;
        }
    };

    const getDaysLeft = () => {
        if (!dates.end) return null;
        const today = new Date();
        const diffDays = Math.ceil((dates.end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays < 0 ? 0 : diffDays;
    };

    const getStatusIcon = () => {
        if (!dates.start || !dates.end) return null;
        
        switch (task?.status) {
            case 'Done':
                return <CheckmarkIcon className="timeline-icon done-icon" />;
            case 'Stuck':
                return <WarningIcon className="timeline-icon" />;
            default:
                return null;
        }
    };

    const handleDateClick = (date) => {
        const clicked = new Date(date);
        clicked.setHours(0, 0, 0, 0);

        if (!dates.start || (dates.start && dates.end)) {
            setDates({ start: clicked, end: null });
        } else {
            const newEnd = clicked >= dates.start ? clicked : dates.start;
            const newStart = clicked >= dates.start ? dates.start : clicked;
            setDates({ start: newStart, end: newEnd });
            onUpdate?.({
                startDate: newStart.toISOString().split('T')[0],
                endDate: newEnd.toISOString().split('T')[0]
            });
            setIsOpen(false);
        }
    };

    const generateCalendar = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const startCal = new Date(firstDay);
        startCal.setDate(startCal.getDate() - firstDay.getDay());
        
        const days = [];
        for (let i = 0; i < 42; i++) {
            days.push(new Date(startCal));
            startCal.setDate(startCal.getDate() + 1);
        }
        return days;
    };

    const isInRange = (date) => dates.start && dates.end && date >= dates.start && date <= dates.end;
    const isSelected = (date) => (dates.start && date.getTime() === dates.start.getTime()) || 
                                 (dates.end && date.getTime() === dates.end.getTime());

    const smartTooltip = getSmartTooltip();
    const daysLeft = getDaysLeft();
    const statusIcon = getStatusIcon();
    const calendarDays = generateCalendar();
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="timeline-container">
            <div
                className="timeline"
                style={statusStyle}
                onClick={() => setIsOpen(!isOpen)}
                title={smartTooltip}
            >
                {statusIcon && <div className="timeline-icon-container">{statusIcon}</div>}
                <span>{displayText}</span>
                {dates.end && (
                    <button 
                        className="reset-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setDates({ start: null, end: null });
                            onUpdate?.({ startDate: '', endDate: '' });
                        }}
                    >
                        <CloseDateIcon />
                    </button>
                )}
            </div>

            {isOpen && (
                <>
                    <div className="timeline-modal">
                        <div className="modal-header">
                            <span>Set dates</span>
                            <span>{dates.start && dates.end ? `${Math.ceil((dates.end.getTime() - dates.start.getTime()) / (1000 * 60 * 60 * 24)) + 1} days selected` : ''}</span>
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
    );
}