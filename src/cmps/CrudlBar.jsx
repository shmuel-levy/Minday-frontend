import { useState } from 'react'
import { Delete, Duplicate, MoveArrowRight, Close, Upload } from "@vibe/icons"

export function CrudlBar({ selectedTasks, groups, onDuplicate, onDelete, onMoveToGroup, onClearSelection }) {
    const [showMoveMenu, setShowMoveMenu] = useState(false)

    function getTotalSelected() {
        return selectedTasks.reduce((total, group) => total + group.taskIds.length, 0)
    }

    function getTaskText() {
        const count = getTotalSelected()
        return count === 1 ? 'Task selected' : 'Tasks selected'
    }

    function getSelectedTasksDots() {
        return (
            <div className="dot-container">
                {selectedTasks.flatMap(selectedGroup => {
                    const group = groups.find(g => g.id === selectedGroup.groupId)
                    const groupColor = group?.color || '#ccc'
                    
                    return selectedGroup.taskIds.map((taskId, index) => (
                        <div
                            key={`${selectedGroup.groupId}-${taskId}-${index}`}
                            className="dot"
                            style={{ backgroundColor: groupColor }}
                        />
                    ))
                })}
            </div>
        )
    }

    function handleMoveToGroup(groupId) {
        onMoveToGroup(groupId)
        setShowMoveMenu(false)
    }

    if (getTotalSelected() === 0) return null

    return (
        <section className="crudl-bar">
            <section className="select-count">
                <h2>{getTotalSelected()}</h2>
            </section>

            <section className="tasks-selected">
                <h2 className="task-selected-heading">{getTaskText()}</h2>
                {getSelectedTasksDots()}
            </section>

            <section onClick={onDuplicate} className="duplicate crud-btn">
                <Duplicate className="icon" />
                <span>Duplicate</span>
            </section>

            <section onClick={onDelete} className="delete crud-btn">
                <Delete className="icon" />
                <span>Delete</span>
            </section>

            <div className="move-to crud-btn" onClick={() => setShowMoveMenu(!showMoveMenu)}>
                <MoveArrowRight className="icon" />
                <span>Move to</span>
                
                {showMoveMenu && (
                    <div className="move-menu">
                        {groups.map(group => (
                            <button
                                key={group.id}
                                className="move-menu-item"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleMoveToGroup(group.id)
                                }}
                            >
                                <div 
                                    className="group-color-dot" 
                                    style={{ backgroundColor: group.color }}
                                />
                                {group.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <section onClick={onClearSelection} className="unselect">
                <Close className="icon" />
            </section>
        </section>
    )
}