import { useMemo, useState } from 'react'

export function TimelineDistribution({ tasks }) {
    const [isHovered, setIsHovered] = useState(false)

    const timelines = tasks
        .filter(task => task.timeline?.startDate && task.timeline?.endDate)
        .map(task => ({
            start: new Date(task.timeline.startDate),
            end: new Date(task.timeline.endDate)
        }))

    const summary = useMemo(() => {
        if (timelines.length === 0) return null

        const startDates = timelines.map(t => t.start)
        const endDates = timelines.map(t => t.end)

        const minStartDate = new Date(Math.min(...startDates.map(d => d.getTime())))
        const maxEndDate = new Date(Math.max(...endDates.map(d => d.getTime())))

        const totalDuration = maxEndDate.getTime() - minStartDate.getTime()

        const now = new Date()
        const elapsedDuration = now.getTime() - minStartDate.getTime()

        const progressPercentage = totalDuration > 0
            ? Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100)
            : 0

        const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24))

        return { minStartDate, maxEndDate, totalDays, progressPercentage }
    }, [timelines])

    if (!summary) {
        return <div className="timeline-distribution-container empty">-</div>
    }

    const { minStartDate, maxEndDate, totalDays, progressPercentage } = summary

    const formatDate = (date) => {
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    }

    const getTimelineBackground = () => {
        return `linear-gradient(to right, rgb(87, 155, 252) ${progressPercentage}%, rgb(51, 51, 51) ${progressPercentage}%)`
    }

    return (
        <div
            className="timeline-distribution-container"
            style={{ background: getTimelineBackground() }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <span className="timeline-duration">{totalDays}d</span>
            ) : (
                <span className="timeline-duration">
                    {formatDate(minStartDate)} - {formatDate(maxEndDate)}
                </span>
            )}
        </div>
    )
}