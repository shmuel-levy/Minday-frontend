import { useEffect } from 'react'

export function Modal({ isOpen, onClose, title, children, className = '', hideDefaultHeader = false }) {
    
    useEffect(() => {
        function handleEscape(e) {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className={`modal-content ${className}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {!hideDefaultHeader && (
                    <div className="modal-header">
                        <h2 className="modal-title">{title}</h2>
                       
                    </div>
                )}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}