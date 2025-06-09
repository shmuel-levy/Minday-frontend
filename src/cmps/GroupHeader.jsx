import { useState, useRef, useEffect } from 'react'
import { CollapseGroupDown } from "./svg/CollapseGroupDown"
import { ThreeDots } from "./svg/ThreeDots"

export function GroupHeader({ group, onDeleteGroup, onToggleCollapse, onUpdateGroup }) {
    const [showMenu, setShowMenu] = useState(false)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [title, setTitle] = useState(group.title)
    const [showColorPicker, setShowColorPicker] = useState(false)

    const colorPickerRef = useRef()
    const inputRef = useRef()
    const didClickColorToggle = useRef(false)
    const clickedInsidePicker = useRef(false)
    const editWrapperRef = useRef()

    const colors = [
        '#037F4C', '#00C875', '#9CD326', '#CAB641', '#FFCB00',
        '#784BD1', '#9D50DD', '#007EB5', '#66CCFF', '#BB3354',
        '#df2f4a', '#FF007F', '#FF5AC4', '#FF642E', '#FDAB3D',
        '#7F5347', '#C4C4C4', '#757575'
    ]

    useEffect(() => {
        function handleMouseDown(e) {
            if (editWrapperRef.current?.contains(e.target)) {
                clickedInsidePicker.current = true
            } else {
                clickedInsidePicker.current = false
            }
        }

        document.addEventListener('mousedown', handleMouseDown)
        return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [])

    function handleDeleteGroup() {
        onDeleteGroup(group.id)
        setShowMenu(false)
    }

    function handleToggleCollapse() {
        if (onToggleCollapse) {
            onToggleCollapse(group.id)
        }
    }

    function handleColorChange(color) {
        if (color !== group.color) {
            onUpdateGroup({ ...group, color })
        }
    }


    function handleTitleBlur() {
        setIsEditingTitle(false)
        if (title !== group.title) {
            onUpdateGroup({ ...group, title })
        }
    }

    return (
        <div className="group-header">
            <div className="group-actions">
                <button
                    className="group-menu-btn"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <ThreeDots />
                </button>

                {showMenu && (
                    <div className="group-menu">
                        <button
                            className="group-menu-item delete"
                            onClick={handleDeleteGroup}
                        >
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" aria-label="Delete group">
                                <path d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                            Delete group
                        </button>
                    </div>
                )}
            </div>

            <button
                className={`collapse-btn ${group.isCollapsed ? 'collapsed' : ''}`}
                style={{ color: group.color }}
                onClick={handleToggleCollapse}
            >
                <CollapseGroupDown />
            </button>



            <div className="group-title-container">
                {isEditingTitle ? (
                    <>
                        <div className="group-title-edit-wrapper" ref={editWrapperRef} style={{ flexGrow: 1 }}>
                            <span className="group-color-picker floating">
                                <a
                                    className="group-color-picker-button"
                                    tabIndex="1"
                                    onClick={() => {
                                        console.log('Color picker toggle clicked')
                                        setShowColorPicker(prev => !prev)
                                    }}
                                >
                                    <span
                                        className="group-color-picker-button-inner"
                                        style={{ background: group.color }}
                                    ></span>
                                </a>
                            </span>

                            <input
                                ref={inputRef}
                                className="group-title-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => {
                                    setTimeout(() => {
                                        if (clickedInsidePicker.current) {
                                            console.log('Clicked inside picker — keep open')
                                            inputRef.current?.focus() // stay in editing mode
                                            return
                                        }

                                        console.log('Blur triggered — close all')
                                        setIsEditingTitle(false)
                                        setShowColorPicker(false)

                                        if (title !== group.title) {
                                            onUpdateGroup({ ...group, title })
                                        }
                                    }, 0)
                                }}
                                autoFocus
                                style={{
                                    paddingLeft: '28px',
                                    color: group.color
                                }}
                            />

                            {showColorPicker && (
                                <div className="color-picker" ref={colorPickerRef}>
                                    {colors.map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => {
                                                console.log('Color selected:', color)
                                                handleColorChange(color)
                                                setShowColorPicker(false)
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div
                        className="group-title-display"
                        style={{ color: group.color }}
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {group.title}
                    </div>
                )}
            </div>


            <div className="progress-indicator">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}