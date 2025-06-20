import { SearchIcon } from '../svg/SearchIcon'
import { PersonIcon } from '../svg/PersonIcon'
import { FilterIcon } from '../svg/FilterIcon'
import { SortIcon } from '../svg/SortIcon'
import { NewTaskButton } from './NewTaskButton'

export function TableControls({ onAddNewTask, onAddNewGroup, boardType, currentView, onAddWidget }) {
    return (
        <div className="table-controls">
            <div className="new-task-split-button">
                <NewTaskButton 
                    onAddTask={onAddNewTask} 
                    onAddNewGroup={onAddNewGroup}
                    boardType={boardType}
                />
            </div>
            
            {currentView === 'dashboard' && (
                <button className="btn-add-widget" onClick={onAddWidget}>
                    <span className="plus-icon">+</span>
                    Add Widget
                </button>
            )}
            
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