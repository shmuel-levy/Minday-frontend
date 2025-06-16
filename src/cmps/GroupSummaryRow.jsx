import { StatusDistribution } from "./table/column-types/StatusDistribution"
import { TimelineDistribution } from "./table/column-types/TimelineDistribution"
import { PriorityDistribution } from "./table/column-types/PriorityDistribution"
import { MembersDistribution } from "./table/column-types/MembersDistribution"
import { FilesDistribution } from "./table/column-types/FilesDistribution"

export function GroupSummaryRow({ group }) {

    const { tasks, color } = group
    const timelines = tasks.filter(task => task.timeline?.startDate && task.timeline?.endDate)
        .map(task => ({
            start: new Date(task.timeline.startDate),
            end: new Date(task.timeline.endDate)
        }));

    return (
        <div className="group-summary-row" style={{ '--group-color': color }}>
            <div className="sticky"></div>



            <div className="col-owner"></div>
            <div className="col-status">
                <StatusDistribution tasks={tasks} />
            </div>
            <div className="col-date"></div>
            <div className="col-timeline">
                <TimelineDistribution tasks={tasks} />
            </div>
            <div className="col-priority">
                <PriorityDistribution tasks={tasks} />
            </div>
            <div className="col-members">
                <MembersDistribution tasks={tasks} />
            </div>
            <div className="col-files">
                <FilesDistribution tasks={tasks} />
            </div>
            <div className="col-add-cell"></div>

        </div>
    )
}