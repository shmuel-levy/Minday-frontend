import { useState } from "react";
import { useSelector } from "react-redux";

export function StatusDistribution({ tasks }) {
    /* 1. Detect which board is open */
    const boardTitle =
        useSelector(state => state.boardModule?.board?.title) || "";

    /* 2. Define all palettes once */
    const palettes = {
        default: [
            { label: "Not Started", bg: "#c4c4c4", color: "#323338" },
            { label: "Working on it", bg: "#fdab3d", color: "#ffffff" },
            { label: "Stuck", bg: "#df2f4a", color: "#ffffff" },
            { label: "Done", bg: "#00c875", color: "#ffffff" }
        ],
        party: [
            { label: 'Not Started', bg: '#FBF3C1', color: '#323338' },
            { label: 'Working on it', bg: '#DC8BE0', color: '#323338' },
            { label: 'Stuck', bg: '#D50B8B', color: '#ffffff' },
            { label: 'Done', bg: '#59d1a8', color: '#323338' }
        ]
    };

    /* 3. Choose palette */
    const statusOptions =
        boardTitle.includes("Party") ? palettes.party : palettes.default;

    /* 4. Compute counts */
    const statusCounts = tasks.reduce((acc, task) => {
        const status = task.status || "Not Started";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});
    const totalTasks = tasks.length;

    /* 5. Hover tooltip state */
    const [hovered, setHovered] = useState(null);

    return (
        <div className="status-distribution-container">
            {statusOptions.map(opt => {
                const count = statusCounts[opt.label] || 0;
                const pct = totalTasks ? (count / totalTasks) * 100 : 0;
                return (
                    <div
                        key={opt.label}
                        className="status-segment"
                        style={{ backgroundColor: opt.bg, width: `${pct}%` }}
                        onMouseEnter={() => setHovered({ label: opt.label, count, pct })}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {hovered?.label === opt.label && (
                            <div className="tooltip">
                                {`${opt.label}  ${count}/${totalTasks}  ${pct.toFixed(1)}%`}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}