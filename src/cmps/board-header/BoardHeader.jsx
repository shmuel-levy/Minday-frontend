import { useState, useRef, useEffect } from 'react'
import { BoardTitleSection } from './BoardTitleSection'
import { BoardActions } from './BoardActions'
import { ViewControls } from './ViewControls'
import { TableControls } from './TableControls'
import { Plus } from '../svg/Plus'
import { AddBoardDropdown } from '../AddBoardDropdown'

export function BoardHeader({ 
    board, onUpdateBoard, onAddNewTask, onAddNewGroup, 
    views, activeViewId, onAddView, onUpdateView, onSetActiveView, 
    onAddWidget, addWidgetBtnRef, onUpdateViews, searchText, setSearchText, 
    selectedPersonId, setSelectedPersonId, selectedSortField, setSelectedSortField,
    sortDirection, setSortDirection, members = [], onApplyFilters
}) {
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [showViewDropdown, setShowViewDropdown] = useState(false)
    const plusBtnRef = useRef(null)
    const viewSelectorRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        if (!isAddDropdownOpen) return
        function handleClickOutside(e) {
            if (
                plusBtnRef.current &&
                !plusBtnRef.current.contains(e.target) &&
                !document.querySelector('.add-board-dropdown')?.contains(e.target)
            ) {
                setIsAddDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isAddDropdownOpen])

    useEffect(() => {
        if (!showViewDropdown) return
        function handleClickOutside(e) {
            if (
                viewSelectorRef.current &&
                !viewSelectorRef.current.contains(e.target) &&
                !document.querySelector('.view-selector-dropdown')?.contains(e.target)
            ) {
                setShowViewDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showViewDropdown])

    function handlePlusClick(e) {
        e.stopPropagation()
        setIsAddDropdownOpen(prev => !prev)
    }

    function handleDropdownClose() {
        setIsAddDropdownOpen(false)
    }

    function handleDropdownSelect(type) {
        if (type === 'board') {
            onAddView('table')
        } else {
            onAddView(type)
        }
        setIsAddDropdownOpen(false)
    }

    function handleRemoveView(viewId) {
        if (views.length <= 1) return;
        const idx = views.findIndex(v => v.id === viewId);
        const newViews = views.filter(v => v.id !== viewId);
        let newActiveId = activeViewId;
        if (viewId === activeViewId) {
            if (idx > 0) newActiveId = newViews[idx - 1]?.id || newViews[0]?.id;
            else newActiveId = newViews[0]?.id;
        }
        onSetActiveView(newActiveId);
        if (typeof onUpdateViews === 'function') onUpdateViews(newViews);
    }

    function handleCollapseToggle() {
        setIsCollapsed(prev => !prev)
        setShowViewDropdown(false)
    }

    function handleViewSelectorClick() {
        setShowViewDropdown(prev => !prev)
    }

    function handleViewSelect(viewId) {
        onSetActiveView(viewId)
        setShowViewDropdown(false)
    }

    const activeView = views.find(v => v.id === activeViewId)

    return (
        <section className={`board-header-container${isCollapsed ? ' collapsed' : ''}`}>
            <div className="board-header-info">
                <BoardTitleSection 
                    board={board} 
                    onUpdateBoard={onUpdateBoard}
                />    
            </div>

            <div className="board-header-action flex align-center">
                <BoardActions />
            </div>

            {!isCollapsed && (
            <div className="board-header-navigation">
                    <div className="views-wrapper">
                    <ViewControls
                            views={views}
                            activeViewId={activeViewId}
                            onViewChange={onUpdateView}
                            onSetActiveView={onSetActiveView}
                            onRemoveView={handleRemoveView}
                        canRemove={views.length > 1}
                    />
                <button
                    type="button"
                            className="add-view-btn"
                    ref={plusBtnRef}
                    onClick={handlePlusClick}
                            aria-label="Add view"
                    style={{ marginLeft: '8px' }}
                        >
                        >
                        <Plus />
                </button>
                {isAddDropdownOpen && (
                    <AddBoardDropdown
                        onClose={handleDropdownClose}
                        onSelect={handleDropdownSelect}
                        triggerRef={plusBtnRef}
                    />
                )}
            </div>
                </div>
            )}

            <div className="board-header-contextualAction">
                <TableControls 
                    onAddNewTask={onAddNewTask}
                    onAddNewGroup={onAddNewGroup}
                    boardType={board.type || 'Items'}
                    currentView={activeView?.type}
                    onAddWidget={onAddWidget}
                    addWidgetBtnRef={addWidgetBtnRef}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    members={members}
                    selectedPersonId={selectedPersonId}
                    setSelectedPersonId={setSelectedPersonId}
                    selectedSortField={selectedSortField}
                    setSelectedSortField={setSelectedSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    board={board}
                    onApplyFilters={onApplyFilters}
                    isCollapsed={isCollapsed}
                    onCollapseToggle={handleCollapseToggle}
                    activeView={activeView}
                    views={views}
                    onViewSelect={handleViewSelect}
                    showViewDropdown={showViewDropdown}
                    onViewSelectorClick={handleViewSelectorClick}
                    viewSelectorRef={viewSelectorRef}
                    onAddView={onAddView}
                />
            </div>
        </section>
    )
}