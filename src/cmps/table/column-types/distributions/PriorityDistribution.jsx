import { useState } from "react";
import { useSelector } from "react-redux";

/* palettes --------------------------------------------------------- */
const palettes = {
  default: [
    { label: "Critical ⚠️", bg: "rgb(51,51,51)",  color: "#F7F7F8" },
    { label: "High",        bg: "rgb(64,22,148)", color: "#F7F7F8" },
    { label: "Medium",      bg: "rgb(85,89,223)", color: "#F7F7F8" },
    { label: "Low",         bg: "rgb(87,155,252)",color: "#F7F7F8" }
  ],
  party: [
    { label: "Critical ⚠️", bg: "#6420AA", color: "#fff"      },
    { label: "High ",     bg: "#FF3EA5", color: "#fff"      },
    { label: "Medium ",   bg: "#FF7ED4", color: "#fff"   },
    { label: "Low ",      bg: "#FFB5DA", color: "#fff"   }
  ]
};

export function PriorityDistribution({ tasks }) {
  /* 1. pick palette based on board title */
  const boardTitle =
    useSelector(state => state.boardModule?.board?.title) || "";
  const priorityOptions =
    boardTitle.includes("Party") ? palettes.party : palettes.default;

  /* 2. count tasks – use base label */
  const plain = s => s.split(" ")[0];                          // strip emoji
  const counts = tasks.reduce((acc, t) => {
    const key = plain(t.priority || "Medium");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const total = tasks.length;

  const [hovered, setHovered] = useState(null);

  return (
    <div className="priority-distribution-container">
      {priorityOptions.map(opt => {
        const count = counts[plain(opt.label)] || 0;
        const pct   = total ? (count / total) * 100 : 0;
        return (
          <div
            key={opt.label}
            className="priority-segment"
            style={{ backgroundColor: opt.bg, width: `${pct}%` }}
            onMouseEnter={() => setHovered({ label: opt.label, count, pct })}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered?.label === opt.label && (
              <div className="tooltip">
                {`${opt.label}  ${count}/${total}  ${pct.toFixed(1)}%`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}