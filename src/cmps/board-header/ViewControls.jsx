import { useState, useRef, useEffect } from 'react'
import { ThreeDots } from '../svg/ThreeDots'
import { PinIcon } from '../svg/PinIcon'


export function ViewControls() {
  const [isPinned, setIsPinned] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  function handleDotsClick(e) {
    e.stopPropagation()
    setIsDropdownOpen(prev => !prev)
  }

  function handlePinToggle() {
    setIsPinned(prev => !prev)
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isDropdownOpen])

  return (
    <div className="view-controls">
      <button className="main-table-btn">
        {isPinned && <span className="pin-icon"><PinIcon /></span>}
        Main table
        <span className="btn-more" onClick={handleDotsClick}>
          <ThreeDots />
        </span>
      </button>

      {isDropdownOpen && (
        <div className="view-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-item"
            onClick={handlePinToggle}
          >
            <>
             <PinIcon />
                {isPinned ? 'Unpin view' : 'Pin view'}
           </>
          </button>
        </div>
      )}
    </div>
  )
}
