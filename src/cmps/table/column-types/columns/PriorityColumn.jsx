import { useState } from "react";
import { useSelector } from "react-redux";

/* ─── palettes ───────────────────────────────────────────── */
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

export function PriorityColumn({ value, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  /* 1. detect which board is open */
  const boardTitle =
    useSelector(state => state.boardModule?.board?.title) || "";

  /* 2. choose palette */
  const priorityOptions =
    boardTitle.includes("Party") ? palettes.party : palettes.default;

  const current =
  priorityOptions.find(opt => value && value.startsWith(opt.label.split(" ")[0])) || priorityOptions[0];

  function setPriority(opt) {
    onUpdate?.(opt.label);
    setIsOpen(false);
  }

  return (
    <div className="priority-column">
      <div
        className="priority-badge"
        style={{ backgroundColor: current.bg, color: current.color }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {current.label}
        <div className="corner-fold" />
      </div>

      {isOpen && (
        <>
          <div className="priority-dropdown">
            <div className="priority-caret" />
            <ul className="change-label-container">
              {priorityOptions.map(opt => (
                <li
                  key={opt.label}
                  style={{ backgroundColor: opt.bg, color: opt.color }}
                  onClick={() => setPriority(opt)}
                >
                  {opt.label}
                  <div className="corner-fold" />
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}