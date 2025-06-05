import { useState, useEffect } from 'react'

export function TaskDetailModal({ taskId, board, onClose }) {
    const [text, setText] = useState('')
    const [updates, setUpdates] = useState([])
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    
    let task = null
    let groupTitle = ''
    
    if (board && taskId) {
        for (const group of board.groups) {
            const foundTask = group.tasks.find(t => t.id === taskId)
            if (foundTask) {
                task = foundTask
                groupTitle = group.title
                break
            }
        }
    }


    useEffect(() => {
        if (task) {
            setUpdates(task.updates || [])
        }
    }, [taskId, task])

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!text.trim()) return
        const newUpdate = {
            id: Date.now(),
            text,
            createdAt: new Date()
        }
        setUpdates(prev => [...prev, newUpdate])
        setText('')
    }

    function handleClose() {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, 300)
    }

    if (!task) {
        return <div>Task not found</div>
    }

    return (
        <section className={`update-modal${isClosing ? ' closing' : ''}`}>
            <button className="close-btn" onClick={handleClose}>✖</button>

            <h2 className="task-title">{task.title}</h2>

            <div className="tabs">
                <button className="active">Updates</button>
                <button>Files</button>
                <button>Activity Log</button>
                <button>+</button>
            </div>

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
                        ></div>

                        <div className="bottom-actions">
                            <span className="mention">@ Mention</span>
                            <button className="submit-btn">Update</button>
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
                            <li key={update.id}>{update.text}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}