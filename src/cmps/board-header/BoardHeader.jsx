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

    // Close view dropdown on outside click
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
                {views.map(view => (
                    <ViewControls
                        key={view.id}
                        view={view}
                        isActive={view.id === activeViewId}
                        onViewChange={(newType) => onUpdateView(view.id, newType)}
                        onSetActive={() => onSetActiveView(view.id)}
                        onRemove={() => handleRemoveView(view.id)}
                        canRemove={views.length > 1}
                            showIcons={false}
                    />
                ))}
                <button
                    type="button"
                    className="add-board-subset-picker-component__button add-board-subset-picker-component__tabs-v2 xtPC2 button_179ab51c11 sizeMedium_58824a014d kindTertiary_08f8117bdb colorPrimary_1e1fb85d38 insetFocusStyle_be5d86065f"
                    id="add-board-subset-button"
                    data-testid="add-board-subset-picker-component"
                    data-vibe="Button"
                    aria-disabled="false"
                    aria-busy="false"
                    aria-label="Add view"
                    ref={plusBtnRef}
                    onClick={handlePlusClick}
                >
                    <span aria-hidden="true" className="icon_7f7b2e32a9 noFocusStyle_ae47567b36 fa icon icon-v2-plus-simple" role="img" data-testid="icon" data-vibe="Icon">
                        <Plus />
                    </span>
                </button>
                {isAddDropdownOpen && (
                    <AddBoardDropdown
                        onClose={handleDropdownClose}
                        onSelect={handleDropdownSelect}
                        triggerRef={plusBtnRef}
                    />
                )}
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