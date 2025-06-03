import { useState, useRef, useEffect } from 'react'
import { MainTableIcon } from '../svg/MainTableIcon'
import { NotificationIcon } from '../svg/NotificationIcon'

export function BoardTitleDropdown({ isOpen, onClose, board, onUpdateBoard, anchorEl }) {
    const [titleDraft, setTitleDraft] = useState(board?.title || '')
    const [descriptionDraft, setDescriptionDraft] = useState(board?.description || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.')
    const [isFavorited, setIsFavorited] = useState(board?.isFavorited || false)
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const dropdownRef = useRef(null)

    const availableUsers = [
        { id: 'u1', name: 'Shoham', initials: 'SS', color: '#ff7f50' },
        { id: 'u2', name: 'Shmuel', initials: 'SL', color: '#87ceeb' },
        { id: 'u3', name: 'Agam', initials: 'AL', color: '#dda0dd' },
        { id: 'u4', name: 'Shani', initials: 'SC', color: '#98fb98' }
    ]

    const owner = availableUsers.find(user => user.id === (board?.ownerId || 'u1')) || availableUsers[0]
    const creator = availableUsers.find(user => user.id === (board?.createdBy || 'u1')) || availableUsers[0]

    useEffect(() => {
        if (isOpen) {
            setTitleDraft(board?.title || '')
            setDescriptionDraft(board?.description || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.')
        }
    }, [isOpen, board?.title, board?.description])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target) && 
                anchorEl && 
                !anchorEl.contains(event.target)) {
                handleSave()
            }
        }

        if (isOpen) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside)
            }, 100)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, anchorEl, titleDraft, descriptionDraft])

    function handleSave() {
        const trimmedTitle = titleDraft.trim()
        const trimmedDescription = descriptionDraft.trim()
        
        if (trimmedTitle && (trimmedTitle !== board?.title || trimmedDescription !== board?.description)) {
            onUpdateBoard({ 
                ...board, 
                title: trimmedTitle,
                description: trimmedDescription 
            })
        }
        setIsEditingDescription(false)
        onClose()
    }

    function handleCancel() {
        setTitleDraft(board?.title || '')
        setDescriptionDraft(board?.description || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.')
        setIsEditingDescription(false)
        onClose()
    }

    function toggleFavorite() {
        const updatedBoard = { ...board, isFavorited: !isFavorited }
        setIsFavorited(!isFavorited)
        onUpdateBoard(updatedBoard)
    }

    function handleDropdownClick(e) {
        e.stopPropagation()
    }

    if (!isOpen) return null

    return (
        <div 
            className="board-dropdown" 
            ref={dropdownRef}
            onClick={handleDropdownClick}
        >
            <div className="board-dropdown-content">
                <div className="board-header">
                    <div className="title-star">
                        <input
                            className="title-input"
                            value={titleDraft}
                            onChange={(e) => setTitleDraft(e.target.value)}
                            maxLength={100}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button 
                            className={`star-btn ${isFavorited ? 'starred' : ''}`}
                            onClick={toggleFavorite}
                        >
                            {isFavorited ? '★' : '☆'}
                        </button>
                    </div>
                    
                    {isEditingDescription ? (
                        <textarea
                            className="description-input"
                            value={descriptionDraft}
                            onChange={(e) => setDescriptionDraft(e.target.value)}
                            onBlur={() => setIsEditingDescription(false)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            rows={3}
                        />
                    ) : (
                        <p 
                            className="description" 
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsEditingDescription(true)
                            }}
                        >
                            {descriptionDraft}
                        </p>
                    )}
                </div>

                <div className="divider"></div>

                <div className="board-info">
                    <h3 className="info-title">Board info</h3>
                    
                    <div className="info-row">
                        <span className="label">Board type</span>
                        <div className="value">
                            <MainTableIcon width={16} height={16} />
                            <span>Main</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <span className="label">Owner</span>
                        <div className="value">
                            <div className="avatar" style={{ backgroundColor: owner.color }}>
                                {owner.initials}
                            </div>
                            <span>{owner.name}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <span className="label">Created by</span>
                        <div className="value">
                            <div className="avatar" style={{ backgroundColor: creator.color }}>
                                {creator.initials}
                            </div>
                            <span>on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <span className="label">Notifications</span>
                        <div className="value">
                            <NotificationIcon />
                            <span>Everything</span>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}