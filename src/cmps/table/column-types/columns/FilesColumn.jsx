import { useState, useRef, useEffect } from 'react'
import { uploadService } from '../../../../services/upload.service.js'
import { makeId } from '../../../../services/util.service.js'
import { AttachmentIcon } from '../../../svg/AttachmentIcon'
import { LinkIcon } from '../../../svg/LinkIcon'
import { DeleteIcon } from '../../../svg/CloseIcon'

const PlusIcon = () => (
    <div className="plus-icon-date">
        <div className="icon-dapulse-addbtn"></div>
    </div>
)

export function FilesColumn({ value = [], onUpdate, task }) {
    const [isUploading, setIsUploading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
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

    function isImageFile(file) {
        if (file.type && file.type.startsWith('image')) return true
        return /\.(png|jpe?g|gif|webp|svg)$/i.test(file.url || '')
    }

    function getFilePreview(file) {
        if (isImageFile(file)) {
            return (
                <img
                    src={file.url}
                    alt={file.name}
                    className="file-thumbnail"
                />
            )
        }

        if (file.type === 'link') {
            return (
                <img
                    src="https://lucide.dev/api/icons/link?size=32&color=0073ea"
                    alt="Link"
                    className="file-thumbnail"
                />
            )
        }

        return (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4a4a4a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="file-thumbnail"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
        )
    }

    return (
        <div className="files-column"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div
                className="files-preview"
                onClick={() => setIsMenuOpen(true)}
            >
                {isUploading ? (
                    <div className="uploading-spinner"></div>
                ) : filesCount > 0 ? (
                    <div className="files-with-plus">
                        {isHovered && <PlusIcon />}
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