import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { MainTableIcon } from '../svg/MainTableIcon'
import { NotificationIcon } from '../svg/NotificationIcon'
import { UserAvatar } from '../UserAvatar'

export function BoardTitleDropdown({ isOpen, onClose, board, onUpdateBoard, anchorEl }) {
    const [titleDraft, setTitleDraft] = useState(board?.title || '')
    const [descriptionDraft, setDescriptionDraft] = useState(board?.description || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.')
    const [isFavorited, setIsFavorited] = useState(board?.isFavorited || false)
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const dropdownRef = useRef(null)
    const [dropdownStyles, setDropdownStyles] = useState({})
    
    const { user: loggedinUser } = useSelector(state => state.userModule)
    const owner = board?.createdBy || loggedinUser
    const createdDate = board?.createdAt ? 
        new Date(board.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    useEffect(() => {
        if (isOpen) {
            setTitleDraft(board?.title || '')
            setDescriptionDraft(board?.description || 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.')
        }
    }, [isOpen, board])

    useEffect(() => {
        if (isOpen && anchorEl) {
            const rect = anchorEl.getBoundingClientRect()
            setDropdownStyles({
                position: 'absolute',
                top: rect.bottom + window.scrollY + 4, 
                left: rect.left + window.scrollX,
                zIndex: 2000,
            })
        }
    }, [isOpen, anchorEl])

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                anchorEl && !anchorEl.contains(event.target)
            ) {
                handleSave()
            }
        }
        if (isOpen) {
            setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 100)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, anchorEl, titleDraft, descriptionDraft])

    function handleSave() {
        const trimmedTitle = titleDraft.trim()
        const trimmedDescription = descriptionDraft.trim()
        
        if (trimmedTitle && (trimmedTitle !== board?.title || trimmedDescription !== board?.description)) {
            onUpdateBoard({ ...board, title: trimmedTitle, description: trimmedDescription })
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

    if (!isOpen) return null

    // Render dropdown via portal
    return ReactDOM.createPortal(
        <div className="board-dropdown" ref={dropdownRef} style={dropdownStyles} onClick={(e) => e.stopPropagation()}>
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
                        <button className={`star-btn ${isFavorited ? 'starred' : ''}`} onClick={toggleFavorite}>
                            {isFavorited ? '\u2605' : '\u2606'}
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
                        <p className="description" onClick={(e) => {
                            e.stopPropagation()
                            setIsEditingDescription(true)
                        }}>
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
                            <UserAvatar
                                src={owner?.imgUrl}
                                fullname={owner?.fullname || 'Unknown User'}
                                userId={owner?._id}
                                className="owner-avatar"
                            />
                            <span>{owner?.fullname || 'Unknown User'}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <span className="label">Created by</span>
                        <div className="value">
                            <UserAvatar
                                src={owner?.imgUrl}
                                fullname={owner?.fullname || 'Unknown User'}
                                userId={owner?._id}
                                className="owner-avatar"
                            />
                            <span>on {createdDate}</span>
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
        </div>,
        document.body
    )
}