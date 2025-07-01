import { useState, useRef, useEffect } from 'react'
import { CollapseGroupDown } from "./svg/CollapseGroupDown"
import { ThreeDots } from "./svg/ThreeDots"
import { showSuccessMsg } from '../services/event-bus.service'
import { StatusDistribution } from './table/column-types/distributions/StatusDistribution'
import { PriorityDistribution } from './table/column-types/distributions/PriorityDistribution'
import { TimelineDistribution } from './table/column-types/distributions/TimelineDistribution'
import { MembersDistribution } from './table/column-types/distributions/MembersDistribution'
import { Modal } from "./Modal";
import "../assets/styles/cmps/DeleteConfirmationModal.scss";
import ReactDOM from "react-dom";
import { userService } from '../services/user'

export function GroupHeader({ group, onDeleteGroup, onToggleCollapse, onUpdateGroup }) {
    const [showMenu, setShowMenu] = useState(false)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [title, setTitle] = useState(group.title)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const colorPickerRef = useRef()
    const inputRef = useRef()
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
        setShowDeleteModal(true);
        setShowMenu(false);
    }

    function handleToggleCollapse() {
        onToggleCollapse?.(group.id)
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

    const totalFiles = group.tasks.reduce((sum, task) => sum + (task.files?.length || 0), 0)

    const modalRoot = document.getElementById('modal-root') || document.body;

    return (
        <div className={`group-header ${group.isCollapsed ? 'collapsed' : ''}`}
            style={group.isCollapsed ? { '--group-color': group.color } : {}}
        >

            <div className={`group-actions ${group.isCollapsed ? 'collapsed' : ''}`}>
                <button
                    className={`group-menu-btn ${group.isCollapsed ? 'collapsed' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <ThreeDots />
                </button>

                {showMenu && (
                    <div className="group-menu">
                                               <button className="group-menu-item delete" onClick={handleDeleteGroup}>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                <path d="M8.3 1.86c-.52 0-1.01.23-1.35.6a1.89 1.89 0 00-.53 1.38v.48H4.9H2.63a.63.63 0 000 1.26H4.15v10.33c0 .5.18.99.53 1.37.35.38.83.6 1.35.6h7.93c.52 0 1-.22 1.34-.6.35-.38.53-.87.53-1.37V5.83h1.52a.63.63 0 000-1.26h-2.27h-1.52v-.48c0-.52-.18-1-.53-1.38a1.89-1.89 0 00-1.34-.6H8.3zm-1.14 3.96h6.83v10.33c0 .15-.05.28-.13.36a.46.46 0 01-.35.15H6.03a.46.46 0 01-.35-.15.53.53 0 01-.14-.36V5.83h1.6zm4.92-1.5v-.48c0-.15-.05-.28-.13-.36a.46.46 0 00-.35-.15H8.3a.46.46 0 00-.35.15.53.53 0 00-.14.36v.48h4.92z" />
                            </svg>
                            Delete group
                        </button>
                    </div>
                )}
            </div>

            <div className="group-spacer"></div>

            <button
                className={`collapse-btn ${group.isCollapsed ? 'collapsed' : ''}`}
                style={{ color: group.color }}
                onClick={handleToggleCollapse}
            >
                <CollapseGroupDown />
            </button>

            <div className={`group-title-container ${group.isCollapsed ? 'collapsed' : ''}`}>
                {isEditingTitle ? (
                    <div className="group-title-edit-wrapper" ref={editWrapperRef} style={{ flexGrow: 1 }}>
                        <span className="group-color-picker floating">
                            <a className="group-color-picker-button" tabIndex="1"
                                onClick={() => setShowColorPicker(prev => !prev)}>
                                <span className="group-color-picker-button-inner"
                                    style={{ background: group.color }}></span>
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
                                        inputRef.current?.focus()
                                        return
                                    }
                                    setIsEditingTitle(false)
                                    setShowColorPicker(false)
                                    if (title !== group.title) {
                                        onUpdateGroup({ ...group, title })
                                    }
                                }, 0)
                            }}
                            autoFocus
                            style={{ paddingLeft: '28px', color: group.color }}
                        />

                        {showColorPicker && (
                            <div className="color-picker" ref={colorPickerRef}>
                                {colors.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className="color-option"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            handleColorChange(color)
                                            setShowColorPicker(false)
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`group-title-display-wrapper ${group.isCollapsed ? 'collapsed' : ''}`}>
                        <div
                            className="group-title-display"
                            style={{ color: group.color }}
                            onClick={() => setIsEditingTitle(true)}
                        >
                            {group.title}
                        </div>

                        {group.isCollapsed ? (
                            <div className="task-count-collapsed">
                                {group.tasks?.length || 0} Tasks
                            </div>
                        ) : (
                            <div className="task-count-inline">
                                {group.tasks?.length || 0} Tasks
                            </div>
                        )}
                    </div>
                )}
            </div>

            {group.isCollapsed && (
                <div className="group-summary-row collapsed">
                    <div className="col-person"></div>

                    <div className="col-status">
                        <div className="white-space-status">Status</div>
                        <StatusDistribution tasks={group.tasks} />
                    </div>

                    <div className="col-date"></div>

                    <div className="col-timeline">
                        <div className="white-space-timeline">Timeline</div>
                        <TimelineDistribution tasks={group.tasks} />
                    </div>

                    <div className="col-priority">
                        <div className="white-space-priority">Priority</div>
                        <PriorityDistribution tasks={group.tasks} />
                    </div>

                    <div className="col-members">
                        <div className="white-space-members">People</div>
                        <MembersDistribution tasks={group.tasks} />
                    </div>

                    <div className="col-files">
                        <div className="white-space-files">Files</div>
                        {totalFiles} files
                    </div>

                    <div className="col-add-cell"></div>
                </div>
            )}

            {showDeleteModal && ReactDOM.createPortal(
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    className="delete-confirmation-modal"
                    hideDefaultHeader={true}
                >
                    <div className="modal-component default-overlay-style system-modal delete-object-wrapper" style={{ position: 'relative' }}>
                        <div className="modal-component-content">
                            <div className="delete-object-warning-dialog">
                                <div className="delete-object-warning-title-wrapper">
                                    <h2 className="want-to-delete-title">Delete this group?</h2>
                                </div>
                                <p className="want-to-delete-bottom-note">We'll keep it in your trash for 30 days, and then permanently delete it.</p>
                                <span className="delete-object-warning-dialog-button-section">
                                    <button
                                        type="button"
                                        className="want-to-delete-secondary-button button_179ab51c11 sizeMedium_58824a014d kindTertiary_08f8117bdb colorPrimary_1e1fb85d38 marginRight_a08cb551e8"
                                        onClick={() => setShowDeleteModal(false)}
                                        data-testid="button"
                                        data-vibe="Button"
                                        aria-disabled="false"
                                        aria-busy="false"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="button_179ab51c11 sizeMedium_58824a014d kindPrimary_6478670b5e colorPrimary_1e1fb85d38"
                                        onClick={() => {
                                            onDeleteGroup(group.id);
                                            setShowDeleteModal(false);
                                        }}
                                        data-testid="button"
                                        data-vibe="Button"
                                        aria-disabled="false"
                                        aria-busy="false"
                                    >
                                        Delete group
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </Modal>,
                modalRoot
            )}
        </div>
    )
}