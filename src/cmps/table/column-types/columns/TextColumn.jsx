import { useState } from 'react'

export function TextColumn({ value, onUpdate, placeholder = "Enter text...", isEditable = true }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value || '')

    function handleSave() {
        if (onUpdate && editValue !== value) {
            onUpdate(editValue)
        }
        setIsEditing(false)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSave()
        }
        if (e.key === 'Escape') {
            setEditValue(value || '')
            setIsEditing(false)
        }
    }

    if (isEditing && isEditable) {
        return (
            <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="text-column-input"
                placeholder={placeholder}
                autoFocus
            />
        )
    }

    return (
        <div 
            className="text-column"
            onClick={() => isEditable && setIsEditing(true)}
            style={{ cursor: isEditable ? 'text' : 'default' }}
        >
            {value || <span className="placeholder">{placeholder}</span>}
        </div>
    )
}