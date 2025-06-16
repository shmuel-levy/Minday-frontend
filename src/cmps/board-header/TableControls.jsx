import { useState } from 'react'
import { SearchIcon } from '../svg/SearchIcon'
import { PersonIcon } from '../svg/PersonIcon'
import { FilterIcon } from '../svg/FilterIcon'
import { SortIcon } from '../svg/SortIcon'
import { NewTaskButton } from './NewTaskButton'

export function TableControls({board,onAddNewTask, onAddNewGroup ,onSetFilter }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTxt, setSearchTxt] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)

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
            <NewTaskButton 
            board={board} 
            onAddNewTask={onAddNewTask}
             onAddNewGroup={onAddNewGroup} />
         
                <form  className={`btn-control  ${isSearchFocused ? 'active' : ''}`}   onClick={handleSearchToggle}  onSubmit={ev => ev.preventDefault()}>
                   <div className='search-btn'>
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTxt}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        />
                        </div>
                    <button className='clear-btn' type="button" onClick={handleClearSearch}>✕</button>
                </form>
           

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
