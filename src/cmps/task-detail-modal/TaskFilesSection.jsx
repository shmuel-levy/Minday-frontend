import { useState } from 'react'
import { ImgUploader } from '../ImgUploader'

export function TaskFilesSection({ task, onAddFile }) {
    const [files, setFiles] = useState(task.files || [])
    const [activeMenu, setActiveMenu] = useState(null)

    async function handleFileUploaded(fileUrl) {
        const newFile = {
            id: Date.now(),
            name: fileUrl.split('/').pop(),
            url: fileUrl,
            uploadedAt: new Date().toISOString()
        }
        setFiles(prev => [...prev, newFile])
        onAddFile?.(newFile)
    }

    function handleMenuClick(fileId, event) {
        event.stopPropagation()
        setActiveMenu(activeMenu === fileId ? null : fileId)
    }

    function handleDownload(file) {
        const link = document.createElement('a')
        link.href = file.url
        link.download = file.name
        link.click()
        setActiveMenu(null)
    }

    function handlePreview(file) {
        window.open(file.url, '_blank')
        setActiveMenu(null)
    }

    return (
        <div className="task-files-section">
            <div className="files-header">
                <ImgUploader onUploaded={handleFileUploaded} />
                <div className="files-info">
                    <span className="files-count">Showing {files.length} out of {files.length} file{files.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="files-grid">
                {files.length === 0 ? (
                    <div className="no-updates">
                        <img src="https://microfrontends.monday.com/mf-feed/latest/static/media/empty-state.8bf98d52.svg" alt="No files yet" />
                        <h3><strong>No files yet</strong></h3>
                        <div>Upload files to share with your team and keep everything organized</div>
                    </div>
                ) : (
                    files.map(file => (
                        <div key={file.id} className="file-card">
                            <div className="file-thumbnail">
                                <img src={file.url} alt={file.name} />
                            </div>
                            <div className="file-actions">
                                <button 
                                    className="file-action-btn"
                                    onClick={(e) => handleMenuClick(file.id, e)}
                                >
                                    ⋯
                                </button>
                                {activeMenu === file.id && (
                                    <div className="file-menu">
                                        <button onClick={() => handlePreview(file)}>
                                            👁️ Preview
                                        </button>
                                        <button onClick={() => handleDownload(file)}>
                                            ⬇️ Download
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="file-details">
                                <div className="file-name">{file.name}</div>
                                <div className="file-source">📁 Files gallery</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {files.length > 0 && (
                <div className="files-status">
                    <span className="upload-status">✅ Uploaded {files.length} file{files.length !== 1 ? 's' : ''}</span>
                </div>
            )}
        </div>
    )
}