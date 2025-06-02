import { MainTableIcon } from '../svg/MainTableIcon'
import { DropdownArrowIcon } from '../svg/DropdownArrowIcon'

export function ViewControls() {
    return (
        <div className="view-controls">
            <button className="main-table-btn">
                <MainTableIcon />
                Main table
                <DropdownArrowIcon />
            </button>
        </div>
    )
}