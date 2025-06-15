import { useState } from 'react'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'
import { NewGroupIcon } from '../svg/NewGroupIcon'
import { ImportTasksIcon } from '../svg/ImportTasksIcon'

export function NewTaskButton({ onAddTask, onAddNewGroup, boardType = 'Items' }) {
    const [showDropdown, setShowDropdown] = useState(false)

    const getButtonLabel = () => {
        switch (boardType) {
            case 'Tasks':
                return 'New task'
            case 'Employees':
                return 'New employee'
            case 'Leads':
                return 'New lead'
            case 'Creatives':
                return 'New creative'
            case 'Budgets':
                return 'New budget'
            case 'Campaigns':
                return 'New campaign'
            case 'Projects':
                return 'New project'
            case 'Clients':
                return 'New client'
            default:
                return 'New item'
        }
    }

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
        console.log(`Import ${boardType.toLowerCase()}`)
        setShowDropdown(false)
    }

    return (
        <div className="new-task-split-button">
            {/* Main New Task Button */}
            <button 
                className="btn-new-task-main"
                onClick={handleNewTask}
            >
                {getButtonLabel()}
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
                        New group of {boardType.toLowerCase()}
                    </div>
                    <div className="dropdown-item" onClick={handleImportTasks}>
                        <ImportTasksIcon />
                        Import {boardType.toLowerCase()}
                    </div>
                </div>
            )}
        </div>
    )
}