import { useRef, useEffect } from 'react'
import { BoardIconSidebar } from './svg/BoardIconSidebar'
import { DashboardIcon } from './svg/DashboardIcon'
import { KanbanIcon } from './svg/KanbanIcon'

export function AddBoardDropdown({ onClose, onSelect, triggerRef }) {
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose()
            }
        }

        function positionDropdown() {
            if (dropdownRef.current && triggerRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect()
                dropdownRef.current.style.top = `${triggerRect.bottom + 4}px`
                dropdownRef.current.style.left = `${triggerRect.left}px`
            }
        }

        positionDropdown()
        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('resize', positionDropdown)
        window.addEventListener('scroll', positionDropdown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('resize', positionDropdown)
            window.removeEventListener('scroll', positionDropdown)
        }
    }, [onClose, triggerRef])

    return (
        <div className="add-board-dropdown" ref={dropdownRef}>
            <div className="dropdown-item" onClick={() => onSelect('board')}>
                <BoardIconSidebar />
                <span>Board</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('dashboard')}>
                <DashboardIcon />
                <span>Dashboard</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('kanban')}>
                <KanbanIcon />
                <span>Kanban</span>
            </div>
        </div>
    )
} 