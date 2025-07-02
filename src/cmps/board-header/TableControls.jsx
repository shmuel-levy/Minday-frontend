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
import { MainTableIcon } from '../svg/MainTableIcon'
import { ChartIcon } from '../svg/ChartIcon'
import { KanbanIcon } from '../svg/KanbanIcon'
import { DashboardIcon } from '../svg/DashboardIcon'
import { StatusDistribution } from '../table/column-types/distributions/StatusDistribution'

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
    const [isAddViewDropdownOpen, setIsAddViewDropdownOpen] = useState(false)
    const personBtnRef = useRef(null)
    const sortBtnRef = useRef(null)
    const filterBtnRef = useRef(null)
    const clearButtonClickedRef = useRef(false)
    const addViewBtnRef = useRef(null)
    const [activeFilters, setActiveFilters] = useState([]);

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
        setActiveFilters(filters);
        onApplyFilters(filters);
    }

    const handleFilterClear = (e) => {
        e.stopPropagation();
        setActiveFilters([]);
        onApplyFilters([]);
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
    }

    const handleAddViewClick = (e) => {
        e.stopPropagation();
        setIsAddViewDropdownOpen(prev => {
            return !prev;
        });
    }

    const handleAddViewSelect = (type) => {
        handleViewAdd(type);
        setIsAddViewDropdownOpen(false);
    }

    const getViewIcon = (viewType) => {
        switch (viewType) {
            case 'table':
                return <MainTableIcon />
            case 'dashboard':
                return <DashboardIcon />
            case 'kanban':
                return <KanbanIcon />
            default:
                return <MainTableIcon />
        }
    }

    function getAllBoardPersons(board) {
        const membersMap = new Map();
        board?.members?.forEach(member => {
            if (member._id) {
                membersMap.set(member._id, {
                    _id: member._id,
                    fullname: member.fullname || member.firstName,
                    imgUrl: member.imgUrl || member.profileImg,
                });
            }
        });
        board?.groups?.forEach(group => {
            group.tasks?.forEach(task => {
                if (task.assignee && !membersMap.has(task.assignee)) {
                    membersMap.set(task.assignee, {
                        _id: task.assignee,
                        fullname: task.assignee,
                    });
                }
                if (Array.isArray(task.members)) {
                    task.members.forEach(m => {
                        if (typeof m === 'string' && !membersMap.has(m)) {
                            membersMap.set(m, { _id: m, fullname: m });
                        } else if (m && m._id && !membersMap.has(m._id)) {
                            membersMap.set(m._id, { _id: m._id, fullname: m.fullname || m.firstName || m._id, imgUrl: m.imgUrl || m.profileImg });
                        }
                    });
                }
            });
        });
        return Array.from(membersMap.values());
    }

    // במקום members מהפרופס, נשתמש בפונקציה
    const allPersons = getAllBoardPersons(board);

    return (
        <div className="table-controls" >
            {isCollapsed && (
                <div className="view-selector-section">
                    <div className="view-selector-wrapper" ref={viewSelectorRef}>
                        <button
                            className="view-selector-btn"
                            onClick={onViewSelectorClick}
                        >
                            <span className="view-icon">
                                {getViewIcon(activeView?.type)}
                            </span>
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
                                        {getViewIcon(view.type)}
                                        {view.name}
                                    </button>
                                ))}
                                <div className="dropdown-divider"></div>
                                <div className="add-view-container">
                                    <button
                                        ref={addViewBtnRef}
                                        className="dropdown-item add-view-btn"
                                        onClick={handleAddViewClick}
                                    >
                                        <Plus />
                                        Add View
                                    </button>
                                </div>
                            </div>
                        )}
                        {isAddViewDropdownOpen && (
                            <div className="add-view-dropdown">
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleAddViewSelect('table')}
                                >
                                    <MainTableIcon />
                                    Table
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleAddViewSelect('dashboard')}
                                >
                                    <DashboardIcon />
                                    Dashboard
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleAddViewSelect('kanban')}
                                >
                                    <KanbanIcon />
                                    Kanban
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
                {!isSearchOpen && !searchText ? (
                    <button
                        className={`btn-control search-btn${searchText ? ' selected' : ''}`}
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

    <div className='filter-container'>
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
                    members={allPersons}
                    selectedId={selectedPersonId}
                    onSelect={handleSelectPerson}
                    anchorRef={personBtnRef}
                />
                </div>

            <div className='filter-container'>
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
                    onSelectField={setSelectedSortField}
                    sortDirection={sortDirection}
                    onSelectDirection={setSortDirection}
                    onClear={handleSortClear}
                    anchorRef={sortBtnRef}
                />
            </div>

   <div className='filter-container'>
                <button
                    className={`btn-control filter-btn${isFilterPopoverOpen ? ' active' : ''}${activeFilters && activeFilters.length > 0 ? ' selected' : ''}`}
                    onClick={handleFilterClick}
                    aria-pressed={isFilterPopoverOpen}
                    type="button"
                    ref={filterBtnRef}
                >
                    <FilterIcon />
                    Filter
                    {activeFilters && activeFilters.length > 0 && (
                        <button
                            className="filter-clear-btn"
                            onClick={handleFilterClear}
                            tabIndex={-1}
                            type="button"
                            aria-label="Clear filter"
                        >
                            ×
                        </button>
                    )}
                </button>
            
                <FilterPopover
                    isOpen={isFilterPopoverOpen}
                    onClose={() => setIsFilterPopoverOpen(false)}
                    onApplyFilters={handleApplyFilters}
                    anchorRef={filterBtnRef}
                    board={board}
                />

</div>
            
            {currentView === 'kanban' && board && board.groups && (
                <div style={{ marginLeft: 'auto', minWidth: 180, maxWidth: 320, flex: 'none', display: 'flex', alignItems: 'center' }}>
                    <StatusDistribution tasks={board.groups.flatMap(g => g.tasks)} />
                </div>
            )}

            
        </div>
    )
}