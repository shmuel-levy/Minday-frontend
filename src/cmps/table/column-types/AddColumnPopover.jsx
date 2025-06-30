import React, { useRef, useEffect } from 'react'
import { 
    StatusSvg, 
    PrioritySvg, 
    TimelineSvg, 
    FilesSvg, 
    MembersSvg, 
    TextSvg, 
    NumbersSvg, 
    CountriesSvg,
    PersonSvg 
} from '../../svg/TaskSvg'

export function AddColumnPopover({ isOpen, anchorRef, onClose, onAddColumn }) {
    const popoverRef = useRef(null)
    const [searchTerm, setSearchTerm] = React.useState('')

    const columnOptions = [
        { id: 'status', label: 'Status', icon: StatusSvg, type: 'status' },
        { id: 'priority', label: 'Priority', icon: PrioritySvg, type: 'priority' },
        { id: 'timeline', label: 'Timeline', icon: TimelineSvg, type: 'timeline' },
        { id: 'files', label: 'Files', icon: FilesSvg, type: 'files' },
        { id: 'members', label: 'Members', icon: MembersSvg, type: 'members' },
        { id: 'person', label: 'Person', icon: PersonSvg, type: 'person' },
        { id: 'text', label: 'Text', icon: TextSvg, type: 'text' },
        { id: 'numbers', label: 'Numbers', icon: NumbersSvg, type: 'numbers' },
        { id: 'date', label: 'Date', icon: NumbersSvg, type: 'date' },
        { id: 'countries', label: 'Countries', icon: CountriesSvg, type: 'countries' }
    ]

    const filteredOptions = columnOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                popoverRef.current && 
                !popoverRef.current.contains(event.target) &&
                anchorRef?.current &&
                !anchorRef.current.contains(event.target)
            ) {
                onClose?.()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose, anchorRef])

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose?.()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    // Position popover below anchor
    const [popoverStyle, setPopoverStyle] = React.useState({})
    useEffect(() => {
        if (isOpen && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect()
            setPopoverStyle({
                position: 'absolute',
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                zIndex: 2000
            })
        }
    }, [isOpen, anchorRef])

    if (!isOpen) return null

    return (
        <div ref={popoverRef} className="add-column-popover" style={popoverStyle}>
            <div className="popover-search">
                <input
                    type="text"
                    placeholder="Search column types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    autoFocus
                />
            </div>
            <div className="popover-options">
                {filteredOptions.length > 0 ? (
                    filteredOptions.map(option => (
                        <button
                            key={option.id}
                            className="option-item"
                            onClick={() => { onAddColumn(option.type); onClose?.(); }}
                        >
                            <div className="option-icon">
                                <option.icon size={20} />
                            </div>
                            <span className="option-label">{option.label}</span>
                        </button>
                    ))
                ) : (
                    <div className="no-results">
                        No column types found
                    </div>
                )}
            </div>
        </div>
    )
}