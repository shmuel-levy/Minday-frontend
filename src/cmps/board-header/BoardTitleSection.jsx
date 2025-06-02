import { useState } from 'react'

export function BoardTitleSection({ board, onUpdateBoard }) {
    const [isEditing, setIsEditing] = useState(false)
    const [titleDraft, setTitleDraft] = useState(board?.title || '')
    const [isFavorited, setIsFavorited] = useState(board?.isFavorited || false)

    function handleTitleClick() {
        setIsEditing(true)
        setTitleDraft(board?.title || '')
    }

    function handleTitleSave() {
        const trimmedTitle = titleDraft.trim()
        if (trimmedTitle && trimmedTitle !== board?.title) {
            onUpdateBoard({ ...board, title: trimmedTitle })
        }
        setIsEditing(false)
    }

    function handleTitleCancel() {
        setTitleDraft(board?.title || '')
        setIsEditing(false)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleTitleSave()
        } else if (e.key === 'Escape') {
            handleTitleCancel()
        }
    }

    function toggleFavorite() {
        const updatedBoard = { ...board, isFavorited: !isFavorited }
        setIsFavorited(!isFavorited)
        onUpdateBoard(updatedBoard)
    }

    return (
        <div className="board-title-section">
            <div className="board-title-container">
                {isEditing ? (
                    <input
                        type="text"
                        className="board-title-input"
                        value={titleDraft}
                        onChange={(e) => setTitleDraft(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        maxLength={100}
                    />
                ) : (
                    <h1 
                        className="board-title"
                        onClick={handleTitleClick}
                        title="Click to edit board title"
                    >
                        {board?.title || 'Untitled Board'}
                    </h1>
                )}
                
                <button 
                    className={`btn-favorite ${isFavorited ? 'favorited' : ''}`}
                    onClick={toggleFavorite}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorited ? '★' : '☆'}
                </button>
            </div>
            
            <button className="btn-share">
                Share
            </button>
        </div>
    )
}