import { useState, useRef } from 'react'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'
import { BoardTitleDropdown } from './BoardTitleDropdown'

export function BoardTitleSection({ board, onUpdateBoard }) {
    const [showDropdown, setShowDropdown] = useState(false)
    const titleWrapperRef = useRef(null)

    function handleTitleClick() {
        setShowDropdown(!showDropdown)
    }

    function handleDropdownClose() {
        setShowDropdown(false)
    }

    return (
        <div className="board-title-section">
            <div className="board-title-container">
                <div 
                    className="board-title-wrapper flex align-center" 
                    onClick={handleTitleClick}
                    ref={titleWrapperRef}
                >
                    <h1 className="board-title">
                        {board?.title || 'Untitled Board'}
                    </h1>
                    <DropdownArrowIcon />
                    
                    <BoardTitleDropdown
                        isOpen={showDropdown}
                        onClose={handleDropdownClose}
                        board={board}
                        onUpdateBoard={onUpdateBoard}
                        anchorEl={titleWrapperRef.current}
                    />
                </div>
            </div>
        
        </div>
    )
}