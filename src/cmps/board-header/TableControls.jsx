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

export function TableControls({ onAddNewTask, onAddNewGroup, boardType, currentView, onAddWidget, addWidgetBtnRef, searchText, setSearchText, members = [], selectedPersonId, setSelectedPersonId }) {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isPersonPopoverOpen, setIsPersonPopoverOpen] = useState(false)
    const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false)
    const [selectedSortField, setSelectedSortField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const personBtnRef = useRef(null)
    const sortBtnRef = useRef(null)
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
        setSelectedPersonId(prev => prev === personId ? null : personId)
        setIsPersonPopoverOpen(false);
    }

    const handleClearPerson = (e) => {
        e.stopPropagation();
        setSelectedPersonId(null);
        setIsPersonPopoverOpen(false);
    }

    const handleSortClick = () => {
        setIsSortPopoverOpen((prev) => !prev);
    }

    const handleSortField = (field) => {
        setSelectedSortField(field);
    }

    const handleSortDirection = (dir) => {
        setSortDirection(dir);
    }

    const handleSortClear = () => {
        setSelectedSortField('');
        setSortDirection('asc');
        setIsSortPopoverOpen(false);
    }

    const handleSearchClear = () => {
        clearButtonClickedRef.current = true;
        setSearchText('');
        // Don't close the search input when clearing
    }

    const handleSearchBlur = () => {
        // Only close if the clear button wasn't clicked
        if (!clearButtonClickedRef.current) {
            if (!searchText) {
                setIsSearchOpen(false);
            } else {
                setTimeout(() => setIsSearchOpen(false), 180);
            }
        }
        // Reset the flag
        clearButtonClickedRef.current = false;
    }

    return (
        <div className="table-controls">
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
                className={`btn-control sort-btn${isSortPopoverOpen ? ' active' : ''}`}
                onClick={handleSortClick}
                aria-pressed={isSortPopoverOpen}
                type="button"
                ref={sortBtnRef}
            >
                <SortIcon />
                Sort
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
                className={`btn-control filter-btn${openDropdown === 'filter' ? ' active' : ''}`}
                onClick={() => handleToggle('filter')}
                aria-pressed={openDropdown === 'filter'}
                type="button"
            >
                <FilterIcon />
                Filter
            </button>
            {openDropdown === 'filter' && (
                <div className="dropdown">Filter dropdown</div>
            )}
        </div>
    )
}