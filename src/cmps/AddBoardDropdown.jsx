import { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MainTableIcon } from './svg/MainTableIcon'
import { ChartIcon } from './svg/ChartIcon'
import { KanbanIcon } from './svg/KanbanIcon'

export function AddBoardDropdown({ onClose, onSelect, triggerRef }) {
    const dropdownRef = useRef(null)
    const [dropdownStyles, setDropdownStyles] = useState({})

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
                onClose()
            }
        }

        function positionDropdown() {
            if (dropdownRef.current && triggerRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const popoverWidth = dropdownRef.current.offsetWidth || 140;
                setDropdownStyles({
                    position: 'fixed',
                    top: triggerRect.top + window.scrollY,
                    left: triggerRect.right + 8 + window.scrollX, 
                    zIndex: 2000,
                    minWidth: 140,
                    background: '#fff',
                    border: '1px solid #e0e1e3',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    padding: '6px 0',
                })
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

    return ReactDOM.createPortal(
        <div className="add-board-dropdown" ref={dropdownRef} style={dropdownStyles}>
            <div className="dropdown-item" onClick={() => onSelect('board')}>
                <MainTableIcon />
                <span>Table</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('dashboard', 'chart')}>
                <ChartIcon />
                <span>Chart</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('kanban')}>
                <KanbanIcon />
                <span>Kanban</span>
            </div>
        </div>,
        document.body
    )
} 