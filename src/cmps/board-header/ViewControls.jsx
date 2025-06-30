import { useState, useRef, useEffect } from 'react'
import { ThreeDots } from '../svg/ThreeDots'
import { PinIcon } from '../svg/PinIcon'
import { ChartIcon } from '../svg/ChartIcon'
import { DashboardIcon } from '../svg/DashboardIcon'
import { TrashIcon } from '../svg/TrashIcon'
import { MainTableIcon } from '../svg/MainTableIcon'
import { KanbanIcon } from '../svg/KanbanIcon'

export function ViewControls({ view, isActive, onViewChange, onSetActive, onRemove, canRemove, showIcons = false }) {
  const [isPinned, setIsPinned] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const getViewIcon = (viewType) => {
    switch (viewType) {
      case 'table':
        return <MainTableIcon />
      case 'dashboard':
        return <DashboardIcon />
      case 'kanban':
        return <KanbanIcon />
      default:
        return <MainTableIcon />
    }
  }

  function handleDotsClick(e) {
    e.stopPropagation()
    setIsDropdownOpen(prev => !prev)
  }

  function handlePinToggle() {
    setIsPinned(prev => !prev)
    setIsDropdownOpen(false)
  }

  function handleChartView() {
    onViewChange('dashboard')
    setIsDropdownOpen(false)
  }

  function handleTableView() {
    onViewChange('table')
    setIsDropdownOpen(false)
  }

  return (
    <div className={`view-controls ${isActive ? 'active' : ''}`}>
      <button className="main-table-btn" ref={buttonRef} onClick={onSetActive}>
        {isPinned && <span className="pin-icon"><PinIcon /></span>}
        {showIcons && <span className="view-icon">{getViewIcon(view.type)}</span>}
        {view.name}
        {isActive && (
          <span className="btn-more" onClick={handleDotsClick}>
            <ThreeDots />
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="view-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-item"
            onClick={handlePinToggle}
          >
            <PinIcon />
            {isPinned ? 'Unpin view' : 'Pin view'}
          </button>
          {canRemove && (
            <button
              className="dropdown-item"
              onClick={() => { setIsDropdownOpen(false); onRemove && onRemove(); }}
            >
              <TrashIcon className="dropdown-icon" />
              Remove view
            </button>
          )}
        </div>
      )}
    </div>
  )
}