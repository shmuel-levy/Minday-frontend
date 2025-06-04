import { CollapseGroupDown } from "./svg/CollapseGroupDown"
export function GroupHeader({ group }) {
    return (
        <div className="group-header">
            <button className="collapse-btn" style={{ color: group.color }}>
                <CollapseGroupDown />
            </button>
            <h3 className="group-title" style={{ color: group.color }}>{group.title}</h3>
            <div className="progress-indicator">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}