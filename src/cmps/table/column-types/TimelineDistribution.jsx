import { useMemo } from 'react'

export function TimelineDistribution({ tasks }) {
    const timelines = tasks.filter(task => task.timeline?.startDate && task.timeline?.endDate)
                            .map(task => ({
                                start: new Date(task.timeline.startDate),
                                end: new Date(task.timeline.endDate)
                            }));

    const overallTimeline = useMemo(() => {
        if (timelines.length === 0) return null;

        let minStartDate = new Date(timelines[0].start);
        let maxEndDate = new Date(timelines[0].end);

        timelines.forEach(tl => {
            if (tl.start < minStartDate) minStartDate = tl.start;
            if (tl.end > maxEndDate) maxEndDate = tl.end;
        });

        const totalDuration = maxEndDate.getTime() - minStartDate.getTime();
        const now = new Date();
        const elapsedDuration = now.getTime() - minStartDate.getTime();

        const progressPercentage = totalDuration > 0 ? Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100) : 0;

        const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));

        return {
            minStartDate,
            maxEndDate,
            progressPercentage,
            totalDays
        };
    }, [timelines]);

    if (!overallTimeline) {
        return <div className="timeline-distribution-container empty">-</div>;
    }

    const { progressPercentage, totalDays } = overallTimeline;

    const getTimelineBackground = () => {
        return `linear-gradient(to right, #579bfc ${progressPercentage}%, #333333 ${progressPercentage}%)`;
    };

    return (
        <div
            className="timeline-distribution-container"
            style={{ background: getTimelineBackground() }}
        >
            <span className="timeline-duration">{totalDays}d</span>
        </div>
    );
} 