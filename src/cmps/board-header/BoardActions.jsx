import { IntegrateIcon } from '../svg/IntegrateIcon'
import { AutomateIcon } from '../svg/AutomateIcon'

export function BoardActions() {
    return (
        <div className="board-actions">
            <button className="btn-action">
                <IntegrateIcon />
                Integrate
            </button>
            
            <button className="btn-action">
                <AutomateIcon />
                Automate
            </button>
            
            <button className="btn-invite">
                Invite / 1
            </button>
        </div>
    )
}