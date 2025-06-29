import { useState, useRef } from 'react'
import { SearchIcon } from '../svg/SearchIcon'
import { PersonIcon } from '../svg/PersonIcon'
import { FilterIcon } from '../svg/FilterIcon'
import { SortIcon } from '../svg/SortIcon'
import { NewTaskButton } from './NewTaskButton'
import { PlusWidget } from '../svg/PlusWidget'
import { PersonFilterPopover } from './PersonFilterPopover'
import { UserAvatar } from '../UserAvatar'
import { SortPopover } from './SortPopover'
import { FilterPopover } from './FilterPopover'
import { ArrowDownUpIcon } from '../svg/ArrowDownUpIcon'
import { Plus } from '../svg/Plus'

export function TableControls({ 
    onAddNewTask, 
    onAddNewGroup, 
    boardType, 
    currentView, 
    onAddWidget, 
    addWidgetBtnRef, 
    searchText, 
    setSearchText, 
    members = [], 
    selectedPersonId, 
    setSelectedPersonId,
    selectedSortField,
    setSelectedSortField,
    sortDirection,
    setSortDirection,
    board,
    onApplyFilters,
    isCollapsed = false,
    onCollapseToggle,
    activeView,
    views = [],
    onViewSelect,
    showViewDropdown,
    onViewSelectorClick,
    viewSelectorRef,
    onAddView
}) {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isPersonPopoverOpen, setIsPersonPopoverOpen] = useState(false)
    const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false)
    const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false)
    const personBtnRef = useRef(null)
    const sortBtnRef = useRef(null)
    const filterBtnRef = useRef(null)
    const clearButtonClickedRef = useRef(false)

    const selectedPerson = members.find(m => m._id === selectedPersonId) || null;

    const handleToggle = (type) => {
        setOpenDropdown(openDropdown === type ? null : type)
    }

    const handlePersonClick = (e) => {
        if (e.target.closest('.person-clear-btn')) return;
        setIsPersonPopoverOpen((prev) => !prev);
    }

    const handleSelectPerson = (personId) => {
        setSelectedPersonId(prev => prev === personId ? null : personId);
        setIsPersonPopoverOpen(false);
    }

    const handleClearPerson = (e) => {
        e.stopPropagation();
        setSelectedPersonId(null);
        setIsPersonPopoverOpen(false);
    }

    const handleSortClick = (e) => {
        if (e.target.closest('.sort-clear-btn')) return;
        setIsSortPopoverOpen((prev) => !prev);
    }

    const handleSortField = (field) => {
        setSelectedSortField(field);
        setIsSortPopoverOpen(false);
    }

    const handleSortDirection = (direction) => {
        setSortDirection(direction);
        setIsSortPopoverOpen(false);
    }

    const handleSortClear = (e) => {
        e.stopPropagation();
        setSelectedSortField(null);
        setSortDirection('asc');
        setIsSortPopoverOpen(false);
    }

    const handleFilterClick = (e) => {
        setIsFilterPopoverOpen((prev) => !prev);
    }

    const handleApplyFilters = (filters) => {
        onApplyFilters(filters);
        setIsFilterPopoverOpen(false);
    }

    const handleSearchBlur = () => {
        setTimeout(() => {
            if (!clearButtonClickedRef.current) {
                setIsSearchOpen(false);
            }
            clearButtonClickedRef.current = false;
        }, 200);
    }

    const handleSearchClear = () => {
        clearButtonClickedRef.current = true;
        setSearchText('');
    }

    const handleViewAdd = (type) => {
        onAddView(type);
        setShowViewDropdown(false);
    }

    return (
        <div className="table-controls">
            {isCollapsed && (
                <div className="view-selector-section">
                    <div className="view-selector-wrapper" ref={viewSelectorRef}>
                        <button
                            className="view-selector-btn"
                            onClick={onViewSelectorClick}
                        >
                            <span className="view-name">{activeView?.name || 'Table'}</span>
                            <ArrowDownUpIcon direction={showViewDropdown ? 'up' : 'down'} className="arrow-icon" />
                        </button>
                        {showViewDropdown && (
                            <div className="view-selector-dropdown">
                                {views.map(view => (
                                    <button
                                        key={view.id}
                                        className={`dropdown-item${view.id === activeView?.id ? ' active' : ''}`}
                                        onClick={() => onViewSelect(view.id)}
                                    >
                                        {view.name}
                                    </button>
                                ))}
                                <div className="dropdown-divider"></div>
                                <button
                                    className="dropdown-item add-view-item"
                                    onClick={() => handleViewAdd('table')}
                                >
                                    <Plus />
                                    Add View
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="separator"></div>
                </div>
            )}

            {currentView !== 'kanban' && (
                <div className="new-task-split-button">
                    <NewTaskButton 
                        onAddTask={onAddNewTask} 
                        onAddNewGroup={onAddNewGroup}
                        boardType={boardType}
                    />
                </div>
            )}
            
            {currentView === 'dashboard' && (
                <button 
                    ref={addWidgetBtnRef}
                    className="btn-add-widget" 
                    onClick={() => onAddWidget(addWidgetBtnRef)}
                >
                    <PlusWidget className="plus-icon" />
                    Add Widget
                </button>
            )}
            
            {!isSearchOpen ? (
                <button
                    className="btn-control search-btn"
                    onClick={() => setIsSearchOpen(true)}
                    type="button"
                >
                    <SearchIcon />
                    Search
                </button>
            ) : (
                <div className="search-input-wrapper">
                    <SearchIcon />
                    <input
                        className="search-input"
                        placeholder="Search this board"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        autoFocus
                        onBlur={handleSearchBlur}
                    />
                    {searchText && (
                        <button
                            className="search-clear-btn"
                            onClick={handleSearchClear}
                            tabIndex={-1}
                            type="button"
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>
            )}

            <button
                className={`btn-control person-btn${isPersonPopoverOpen ? ' active' : ''}${selectedPerson ? ' selected' : ''}`}
                onClick={handlePersonClick}
                aria-pressed={isPersonPopoverOpen}
                type="button"
                ref={personBtnRef}
            >
                {selectedPerson ? (
                    <UserAvatar
                        src={selectedPerson.imgUrl || selectedPerson.profileImg}
                        fullname={selectedPerson.fullname || selectedPerson.firstName}
                        userId={selectedPerson._id}
                        className="person-btn-avatar"
                        style={{ width: 24, height: 24, marginRight: 6 }}
                    />
                ) : (
                    <PersonIcon />
                )}
                Person
                {selectedPerson && (
                    <button
                        className="person-clear-btn"
                        onClick={handleClearPerson}
                        tabIndex={-1}
                        type="button"
                        aria-label="Clear person filter"
                    >
                        ×
                    </button>
                )}
            </button>

            <PersonFilterPopover
                isOpen={isPersonPopoverOpen}
                onClose={() => setIsPersonPopoverOpen(false)}
                members={members}
                selectedId={selectedPersonId}
                onSelect={handleSelectPerson}
                anchorRef={personBtnRef}
            />

            <button
                className={`btn-control sort-btn${isSortPopoverOpen ? ' active' : ''}${selectedSortField ? ' selected' : ''}`}
                onClick={handleSortClick}
                aria-pressed={isSortPopoverOpen}
                type="button"
                ref={sortBtnRef}
            >
                <SortIcon />
                Sort
                {selectedSortField && (
                    <button
                        className="sort-clear-btn"
                        onClick={handleSortClear}
                        tabIndex={-1}
                        type="button"
                        aria-label="Clear sort"
                    >
                        ×
                    </button>
                )}
            </button>

            <SortPopover
                isOpen={isSortPopoverOpen}
                onClose={() => setIsSortPopoverOpen(false)}
                selectedField={selectedSortField}
                onSelectField={handleSortField}
                sortDirection={sortDirection}
                onSelectDirection={handleSortDirection}
                onClear={handleSortClear}
                anchorRef={sortBtnRef}
            />

            <button
                className={`btn-control filter-btn${isFilterPopoverOpen ? ' active' : ''}`}
                onClick={handleFilterClick}
                aria-pressed={isFilterPopoverOpen}
                type="button"
                ref={filterBtnRef}
            >
                <FilterIcon />
                Filter
            </button>

            <FilterPopover
                isOpen={isFilterPopoverOpen}
                onClose={() => setIsFilterPopoverOpen(false)}
                onApplyFilters={handleApplyFilters}
                anchorRef={filterBtnRef}
                board={board}
            />

            <button
                className="btn-control collapse-btn"
                onClick={onCollapseToggle}
                type="button"
                aria-label={isCollapsed ? "Expand header" : "Collapse header"}
            >
                <ArrowDownUpIcon direction={isCollapsed ? 'down' : 'up'} className="arrow-icon" />
            </button>
        </div>
    )
}