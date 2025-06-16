import { Avatar } from './MembersColumn'

export function MembersDistribution({ tasks }) {
    const members = tasks.flatMap(task => task.members || []);

    const uniqueMembers = Array.from(new Map(
        members.map(m => [m._id, m])
    ).values());

    const totalMembers = uniqueMembers.length;

    return (
        <div className="members-summary">
            {totalMembers === 0 ? (
                <img 
                    src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                    width="32" 
                    height="32" 
                    alt="Default avatar"
                />
            ) : totalMembers === 1 ? (
                <Avatar member={uniqueMembers[0]} size="32px" />
            ) : (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {uniqueMembers.slice(0, 3).map((member, i) => (
                        <div key={member._id} style={{marginLeft: i > 0 ? '-8px' : '0', zIndex: 3-i}}>
                            <Avatar member={member} size="24px" />
                        </div>
                    ))}
                    {totalMembers > 3 && (
                        <div className="counter">+{totalMembers - 3}</div>
                    )}
                </div>
            )}
        </div>
    )
}