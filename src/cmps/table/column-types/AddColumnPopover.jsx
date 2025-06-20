import { useState, useRef, useEffect } from 'react'
import { Plus } from '../../svg/Plus'
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

export function AddColumnPopover({ onAddColumn }) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const buttonRef = useRef(null)
    const popoverRef = useRef(null)

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

    function handleToggle() {
        setIsOpen(!isOpen)
        if (!isOpen) {
            setSearchTerm('')
        }
    }

    function handleClose() {
        setIsOpen(false)
        setSearchTerm('')
    }

    function handleOptionSelect(option) {
        if (onAddColumn) {
            onAddColumn(option.type)
        }
        handleClose()
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                popoverRef.current && 
                !popoverRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    return (
        <div className="add-column-container">
            <button 
                ref={buttonRef}
                className={`add-column-btn ${isOpen ? 'open' : ''}`}
                onClick={handleToggle}
                title="Add column"
            >
                <Plus size={16} />
            </button>

            {isOpen && (
                <div ref={popoverRef} className="add-column-popover">
                    
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
                                    onClick={() => handleOptionSelect(option)}
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
            )}
        </div>
    )
}