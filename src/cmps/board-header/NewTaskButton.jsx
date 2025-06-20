import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'
import { NewGroupIcon } from '../svg/NewGroupIcon'
import { ImportTasksIcon } from '../svg/ImportTasksIcon'

export function NewTaskButton({ onAddTask, onAddNewGroup, boardType = 'Items' }) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [dropdownStyles, setDropdownStyles] = useState({})
    const triggerRef = useRef(null)

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

    // Position dropdown below the trigger
    useEffect(() => {
        if (showDropdown && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setDropdownStyles({
                position: 'absolute',
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                minWidth: rect.width,
                zIndex: 2000,
            })
        }
    }, [showDropdown])

    // Close on outside click
    useEffect(() => {
        if (!showDropdown) return
        function handleClick(e) {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                !document.getElementById('new-task-dropdown-portal')?.contains(e.target)
            ) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [showDropdown])

    return (
        <div className="new-task-split-button" ref={triggerRef}>
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

            {/* Dropdown Menu via Portal */}
            {showDropdown && ReactDOM.createPortal(
                <div 
                    className="new-task-dropdown" 
                    id="new-task-dropdown-portal"
                    style={dropdownStyles}
                >
                    <div className="dropdown-item" onClick={handleNewGroup}>
                        <NewGroupIcon />
                        New group of {boardType.toLowerCase()}
                    </div>
                    <div className="dropdown-item" onClick={handleImportTasks}>
                        <ImportTasksIcon />
                        Import {boardType.toLowerCase()}
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}