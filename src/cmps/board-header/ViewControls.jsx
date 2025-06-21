import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThreeDots } from '../svg/ThreeDots'
import { PinIcon } from '../svg/PinIcon'
import { ChartIcon } from '../svg/ChartIcon'
import { TrashIcon } from '../svg/TrashIcon'

export function ViewControls({ view, isActive, onViewChange, onSetActive, onRemove, canRemove }) {
  const [isPinned, setIsPinned] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownStyles, setDropdownStyles] = useState({})
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

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

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownStyles({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 4, 
        left: rect.left + window.scrollX,
        minWidth: rect.width,
        zIndex: 2000,
      })
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (!isDropdownOpen) return
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen])

  return (
    <div className={`view-controls ${isActive ? 'active' : ''}`}>
      <button className="main-table-btn" ref={buttonRef} onClick={onSetActive}>
        {isPinned && <span className="pin-icon"><PinIcon /></span>}
        {view.name}
        {isActive && (
          <span className="btn-more" onClick={handleDotsClick}>
            <ThreeDots />
          </span>
        )}
      </button>

      {isDropdownOpen && ReactDOM.createPortal(
        <div className="view-dropdown" ref={dropdownRef} style={dropdownStyles}>
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
              <TrashIcon style={{marginRight: '8px'}} />
              Remove view
            </button>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}