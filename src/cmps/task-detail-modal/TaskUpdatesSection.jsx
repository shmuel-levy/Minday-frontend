import { useState, useEffect } from 'react'

export function TaskUpdatesSection({ task, groupId, onUpdateAdded }) {
    const [text, setText] = useState('')
    const [updates, setUpdates] = useState([])
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    useEffect(() => {
        if (task) {
            setUpdates(task.updates || [])
        }
    }, [task])

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!text.trim()) return
        
        const newUpdate = {
            id: `update_${Date.now()}`,
            text: text.trim(),
            type: 'text',
            createdAt: Date.now(),
            byMember: {
                _id: 'current_user',
                fullname: 'Current User'
            }
        }
        
        setUpdates(prev => [...prev, newUpdate])
        setText('')
        setIsEditorOpen(false)
        
        if (onUpdateAdded && task && groupId) {
            onUpdateAdded(task.id, groupId, newUpdate)
        }
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString()
    }

    return (
        <>
            <div className="editor-container">
                {!isEditorOpen ? (
                    <div className="fake-textarea" onClick={() => setIsEditorOpen(true)}>
                        Write an update and mention others with @...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="rich-editor">
                        <div className="toolbar">
                            <span>¶</span>
                            <b>B</b>
                            <i>I</i>
                            <u>U</u>
                            <span>🔗</span>
                            <span>📋</span>
                        </div>

                        <div
                            className="editable"
                            contentEditable
                            suppressContentEditableWarning
                            onInput={(e) => setText(e.currentTarget.innerText)}
                            placeholder="Write your update here..."
                        ></div>

                        <div className="bottom-actions">
                            <span className="mention">@ Mention</span>
                            <button type="submit" className="submit-btn">Update</button>
                        </div>
                    </form>
                )}
            </div>

            <div className="updates-list">
                {updates.length === 0 ? (
                    <div className="no-updates">
                        <img src="https://microfrontends.monday.com/mf-feed/latest/static/media/empty-state.8bf98d52.svg" alt="No updates yet" />
                        <h3><strong>No updates yet</strong></h3>
                        <div>Share progress, mention a teammate,<br></br> or upload a file to get things moving</div>
                    </div>
                ) : (
                    <ul>
                        {updates.map(update => (
                            <li key={update.id} className="update-item">
                                <div className="update-header">
                                    <span className="update-author">
                                        {update.byMember?.fullname || 'Unknown User'}
                                    </span>
                                    <span className="update-date">
                                        {formatDate(update.createdAt)}
                                    </span>
                                </div>
                                <div className="update-content">
                                    {update.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}