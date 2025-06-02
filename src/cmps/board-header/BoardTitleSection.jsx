import { useState } from 'react'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'
import { Modal } from '../Modal'

export function BoardTitleSection({ board, onUpdateBoard }) {
    const [showModal, setShowModal] = useState(false)
    const [titleDraft, setTitleDraft] = useState(board?.title || '')
    const [isFavorited, setIsFavorited] = useState(board?.isFavorited || false)

    function handleTitleClick() {
        setShowModal(true)
        setTitleDraft(board?.title || '')
    }

    function handleTitleSave() {
        const trimmedTitle = titleDraft.trim()
        if (trimmedTitle && trimmedTitle !== board?.title) {
            onUpdateBoard({ ...board, title: trimmedTitle })
        }
        setShowModal(false)
    }

    function handleModalClose() {
        setTitleDraft(board?.title || '')
        setShowModal(false)
    }

    function toggleFavorite() {
        const updatedBoard = { ...board, isFavorited: !isFavorited }
        setIsFavorited(!isFavorited)
        onUpdateBoard(updatedBoard)
    }

    return (
        <div className="board-title-section">
            <div className="board-title-container">
                <div className="board-title-wrapper" onClick={handleTitleClick}>
                    <h1 className="board-title">
                        {board?.title || 'Untitled Board'}
                    </h1>
                    <DropdownArrowIcon />
                </div>
            </div>
            
            <button className="btn-share">
                Share
            </button>

            <Modal 
                isOpen={showModal}
                onClose={handleModalClose}
                title="Board Details"
                className="board-details-modal"
            >
                <div className="board-modal-content">
                    <div className="board-title-edit">
                        <label>Board Title</label>
                        <input
                            type="text"
                            className="board-title-input"
                            value={titleDraft}
                            onChange={(e) => setTitleDraft(e.target.value)}
                            maxLength={100}
                        />
                    </div>
                    
                    <div className="board-favorite">
                        <button 
                            className={`btn-favorite-modal ${isFavorited ? 'favorited' : ''}`}
                            onClick={toggleFavorite}
                        >
                            {isFavorited ? '★' : '☆'} 
                            {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                        </button>
                    </div>
                    
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={handleModalClose}>Cancel</button>
                        <button className="btn-save" onClick={handleTitleSave}>Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}