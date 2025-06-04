import { useState } from 'react'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'
import { NewGroupIcon } from '../svg/NewGroupIcon'
import { ImportTasksIcon } from '../svg/ImportTasksIcon'

export function NewTaskButton({ onAddTask, onAddNewGroup }) {
    const [showDropdown, setShowDropdown] = useState(false)

    function handleNewTask() {
        if (onAddTask) {
            onAddTask()
        }
    }

    function handleDropdownToggle() {
        setShowDropdown(!showDropdown)
    }

    function handleNewGroup() {
        if (onAddNewGroup) {
            onAddNewGroup()
        }
        setShowDropdown(false)
    }

    function handleImportTasks() {
        console.log('Import tasks')
        setShowDropdown(false)
    }

    return (
        <div className="new-task-split-button">
            {/* Main New Task Button */}
            <button 
                className="btn-new-task-main"
                onClick={handleNewTask}
            >
                New task
            </button>
            
            {/* Dropdown Arrow Button */}
            <button 
                className="btn-new-task-dropdown"
                onClick={handleDropdownToggle}
            >
                <DropdownArrowIcon />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="new-task-dropdown">
                    <div className="dropdown-item" onClick={handleNewGroup}>
                        <NewGroupIcon />
                        New group of tasks
                    </div>
                    <div className="dropdown-item" onClick={handleImportTasks}>
                        <ImportTasksIcon />
                        Import tasks
                    </div>
                </div>
            )}
        </div>
    )
}