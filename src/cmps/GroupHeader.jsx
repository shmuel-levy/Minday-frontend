export function GroupHeader({ group }) {
    return (
        <div className="group-header" style={{ borderLeftColor: group.color }}>
            <button className="collapse-btn">▼</button>
            <div className="group-color" style={{ backgroundColor: group.color }}></div>
            <h3 className="group-title">{group.title}</h3>
            <div className="progress-indicator">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}