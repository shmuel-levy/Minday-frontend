import { useState, useRef, useEffect } from 'react'
import { uploadService } from '../../../../services/upload.service.js'
import { makeId } from '../../../../services/util.service.js'
import { AttachmentIcon } from '../../../svg/AttachmentIcon'
import { LinkIcon } from '../../../svg/LinkIcon'
import { DeleteIcon } from '../../../svg/CloseIcon'

export function FilesColumn({ value = [], onUpdate, task }) {
    const [isUploading, setIsUploading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const fileInputRef = useRef(null)
    const menuRef = useRef(null)

    const files = Array.isArray(value) ? value : []
    const filesCount = files.length
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }
        
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])
    
    async function handleFileUpload(ev) {
        try {
            setIsUploading(true)
            const file = ev.target.files[0]
            if (!file) return
            
            const { secure_url } = await uploadService.uploadImg(ev)
            
            const newFile = {
                _id: makeId(),
                name: file.name,
                url: secure_url,
                type: file.type,
                size: file.size,
                createdAt: new Date().toISOString()
            }
            
            onUpdate([...files, newFile])
            
        } catch (err) {
            console.error('Failed to upload file:', err)
        } finally {
            setIsUploading(false)
        }
    }
    
    function handleFromComputer() {
        fileInputRef.current?.click()
    }
    
    function handleFromLink() {
        const url = prompt('Enter file URL:')
        if (!url) return
        
        const newFile = {
            _id: makeId(),
            name: url.split('/').pop() || 'Link',
            url: url,
            type: 'link',
            size: 0,
            createdAt: new Date().toISOString()
        }
        
        onUpdate([...files, newFile])
    }
    
    function removeFile(fileId) {
        onUpdate(files.filter(file => file._id !== fileId))
    }
    
    function openFile(url) {
        window.open(url, '_blank')
    }
    
    function getFilePreview(file) {
        if (file.type && file.type.includes('image')) {
            return <img src={file.url} alt={file.name} className="file-thumbnail" />
        } else if (file.type === 'link') {
            return <img src="https://cdn.monday.com/images/file-types/v2-link.svg" alt="Link" className="file-thumbnail" />
        } else {
            return <img src="https://cdn.monday.com/images/file-types/v2-document.svg" alt="Document" className="file-thumbnail" />
        }
    }
    
    return (
        <div className="files-column">
            <div 
                className="files-preview"
                onClick={() => setIsMenuOpen(true)}
            >
                {isUploading ? (
                    <div className="uploading-spinner"></div>
                ) : filesCount > 0 ? (
                    <div className="files-thumbnails">
                        {files.slice(0, 3).map((file, index) => (
                            <div key={file._id} className="preview-thumbnail" style={{ zIndex: 3 - index }}>
                                {getFilePreview(file)}
                            </div>
                        ))}
                        {filesCount > 3 && (
                            <div className="more-files">+{filesCount - 3}</div>
                        )}
                    </div>
                ) : (
                    <div className="empty-files">
                        <span className="plus-icon"></span>
                    </div>
                )}
            </div>
            
            {isMenuOpen && (
                <div className="files-menu" ref={menuRef}>
                    {files.length > 0 && (
                        <div className="files-list">
                            {files.map(file => (
                                <div key={file._id} className="file-item">
                                    <div 
                                        className="file-content"
                                        onClick={() => openFile(file.url)}
                                    >
                                        <div className="file-preview">
                                            {getFilePreview(file)}
                                        </div>
                                        <div className="file-details">
                                            <div className="file-name">{file.name || 'File'}</div>
                                            <div className="file-size">
                                                {file.type === 'link' ? 'Link' : `${Math.round((file.size || 0) / 1024)} KB`}
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeFile(file._id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="upload-options">
                        <button className="option-button" onClick={handleFromComputer}>
                            <AttachmentIcon showPlus={true} />
                            <span>From Computer</span>
                        </button>
                        
                        <button className="option-button" onClick={handleFromLink}>
                            <LinkIcon />
                            <span>From Link</span>
                        </button>
                        
                        <input 
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}