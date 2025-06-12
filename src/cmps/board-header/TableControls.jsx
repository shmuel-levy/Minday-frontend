import { useState } from 'react'
import { SearchIcon } from '../svg/SearchIcon'
import { PersonIcon } from '../svg/PersonIcon'
import { FilterIcon } from '../svg/FilterIcon'
import { SortIcon } from '../svg/SortIcon'
import { NewTaskButton } from './NewTaskButton'

export function TableControls({ onAddNewTask, onAddNewGroup ,onSetFilter }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTxt, setSearchTxt] = useState('')

    function handleSearchToggle() {
        setIsSearchOpen(prev => !prev)
        if (isSearchOpen) {
            setSearchTxt('')
            onSetFilter?.({ txt: '' })
        }
    }

    function handleSearchChange(ev) {
        const value = ev.target.value
        setSearchTxt(value)
        onSetFilter?.({ txt: value }) 
    }

    function handleClearSearch() {
        setSearchTxt('')
        setIsSearchOpen(false)
        onSetFilter?.({ txt: '' })
    }

    function handleSort() {
        console.log('Sort clicked')
    }

    return (
        <div className="table-controls">
            <NewTaskButton onAddNewTask={onAddNewTask} onAddNewGroup={onAddNewGroup} />

            <button className="btn-control search-btn" onClick={handleSearchToggle}>
                <SearchIcon />
                Search
            </button>

            {isSearchOpen && (
                <form className="search-form" onSubmit={ev => ev.preventDefault()}>
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search this board..."
                        value={searchTxt}
                        onChange={handleSearchChange}
                        autoFocus
                    />
                    <button type="button" onClick={handleClearSearch}>✕</button>
                </form>
            )}

            <button className="btn-control person-btn">
                <PersonIcon />
                Person
            </button>

            <button className="btn-control filter-btn">
                <FilterIcon />
                Filter
            </button>

            <button className="btn-control sort-btn" onClick={handleSort}>
                <SortIcon />
                Sort
            </button>
        </div>
    )
}
