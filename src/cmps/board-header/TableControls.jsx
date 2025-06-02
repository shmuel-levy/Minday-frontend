import { SearchIcon } from '../svg/SearchIcon'
import { PersonIcon } from '../svg/PersonIcon'
import { FilterIcon } from '../svg/FilterIcon'
import { SortIcon } from '../svg/SortIcon'

export function TableControls() {
    return (
        <div className="table-controls">
            <button className="btn-new-task">
                New task
            </button>
            
            <button className="btn-control search-btn">
                <SearchIcon />
                Search
            </button>
            
            <button className="btn-control person-btn">
                <PersonIcon />
                Person
            </button>
            
            <button className="btn-control filter-btn">
                <FilterIcon />
                Filter
            </button>
            
            <button className="btn-control sort-btn">
                <SortIcon />
                Sort
            </button>
        </div>
    )
}