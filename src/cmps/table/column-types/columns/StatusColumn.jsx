import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ConfettiAnimation } from '../../ConfettiAnimation'

export function StatusColumn({ value, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    /* ── 1. Detect active board title ─────────────────────── */
    const boardTitle =
        useSelector(state => state.boardModule?.board?.title) || ''

    /* ── 2. Define all palettes once ──────────────────────── */
    const palettes = {
        default: [
            { label: 'Not Started', bg: '#c4c4c4', color: '#323338' },
            { label: 'Working on it', bg: '#fdab3d', color: '#ffffff' },
            { label: 'Stuck', bg: '#df2f4a', color: '#ffffff' },
            { label: 'Done', bg: '#00c875', color: '#ffffff' }
        ],
        party: [
            { label: 'Not Started', bg: '#FBF3C1', color: '#323338b3' },
            { label: 'Working on it', bg: '#DC8BE0', color: '#ffffff' },
            { label: 'Stuck', bg: '#D50B8B', color: '#ffffff' },
            { label: 'Done', bg: '#59d1a8', color: '#ffffff' }
        ]
    }

    /* ── 3. Pick palette based on board name ──────────────── */
    const theme = boardTitle.includes('Party') ? 'party' : 'default'
    const statusOptions = palettes[theme]

    const currentStatus =
        statusOptions.find(opt => opt.label === value) || statusOptions[0]

    /* existing handlers/render stay the same … */
    /* ----------------------------------------------------------------- */
    function handleStatusChange(newStatus) {
        onUpdate?.(newStatus.label)
        setIsOpen(false)
        if (newStatus.label === 'Done' && value !== 'Done') setShowConfetti(true)
    }

    function handleConfettiComplete() {
        setShowConfetti(false)
    }

    return (
        <div className="status-column">
            <div
                className="status-badge"
                style={{ backgroundColor: currentStatus.bg, color: currentStatus.color }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentStatus.label}
                <div className="corner-fold" />
            </div>

            <ConfettiAnimation isActive={showConfetti} onComplete={handleConfettiComplete} />

            {isOpen && (
                <>
                    <div className="status-dropdown">
                        <div className="status-caret" />
                        <ul className="change-label-container">
                            {statusOptions.map(opt => (
                                <li
                                    key={opt.label}
                                    style={{ backgroundColor: opt.bg, color: opt.color }}
                                    onClick={() => handleStatusChange(opt)}
                                >
                                    {opt.label}
                                    <div className="corner-fold" />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
                </>
            )}
        </div>
    )
}