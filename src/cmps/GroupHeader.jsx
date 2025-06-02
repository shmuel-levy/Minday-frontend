export function GroupHeader({ group }) {
    return (
        <div className="group-header" >
            <button className="collapse-btn">▼</button>
            <h3 className="group-title" style={{ color: group.color }}>{group.title}</h3>
            <div className="progress-indicator">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}