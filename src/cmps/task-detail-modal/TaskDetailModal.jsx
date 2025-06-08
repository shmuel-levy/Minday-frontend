import { useState, useEffect } from 'react'
import { TaskFilesSection } from './TaskFilesSection'
import { TaskUpdatesSection } from './TaskUpdatesSection'

export function TaskDetailModal({ taskId, board, onClose, onStartClose, onUpdateAdded }) {
    const [isClosing, setIsClosing] = useState(false)
    const [activeTab, setActiveTab] = useState('updates')
    
    let task = null
    let groupId = ''
    let groupTitle = ''
    
    if (board && taskId) {
        for (const group of board.groups) {
            const foundTask = group.tasks.find(t => t.id === taskId)
            if (foundTask) {
                task = foundTask
                groupId = group.id
                groupTitle = group.title
                break
            }
        }
    }

    function handleAddFile(fileData) {
        console.log('File added:', fileData)
    }

    function handleClose() {
        setIsClosing(true)
        if (onStartClose) onStartClose()
        setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, 300)
    }

    function handleUpdateAdded(taskId, groupId, newUpdate) {
        if (onUpdateAdded) {
            onUpdateAdded(taskId, groupId, newUpdate)
        }
    }

    if (!task) {
        return <div>Task not found</div>
    }

    const updatesCount = task.updates?.length || 0

    return (
        <section className={`update-modal${isClosing ? ' closing' : ''}`}>
            <button className="close-btn" onClick={handleClose}>✖</button>

            <h2 className="task-title">{task.title}</h2>

            <div className="tabs">
                <button 
                    className={activeTab === 'updates' ? 'active' : ''}
                    onClick={() => setActiveTab('updates')}
                >
                    Updates ({updatesCount})
                </button>
                <button 
                    className={activeTab === 'files' ? 'active' : ''}
                    onClick={() => setActiveTab('files')}
                >
                    Files
                </button>
                <button 
                    className={activeTab === 'activity' ? 'active' : ''}
                    onClick={() => setActiveTab('activity')}
                >
                    Activity Log
                </button>
                <button>+</button>
            </div>

            {activeTab === 'updates' && (
                <TaskUpdatesSection 
                    task={task}
                    groupId={groupId}
                    onUpdateAdded={handleUpdateAdded}
                />
            )}

            {activeTab === 'files' && (
                <TaskFilesSection 
                    task={task}
                    onAddFile={handleAddFile}
                />
            )}

            {activeTab === 'activity' && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3>Activity Log</h3>
                    <p>Coming soon...</p>
                </div>
            )}
        </section>
    )
}