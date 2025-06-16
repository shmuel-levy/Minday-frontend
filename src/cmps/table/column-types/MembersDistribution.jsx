import { Avatar } from './MembersColumn'

export function MembersDistribution({ tasks }) {
    const members = tasks.flatMap(task => task.members || []);

    const uniqueMembers = Array.from(new Map(
        members.map(m => [m._id, m])
    ).values());

    const totalMembers = uniqueMembers.length;

    const firstMember = uniqueMembers[0];

    return (
        <div className="members-summary">
            {firstMember ? (
                <Avatar member={firstMember} size="32px" />
            ) : (
                <img 
                    src="https://cdn.monday.com/icons/dapulse-person-column.svg" 
                    width="32" 
                    height="32" 
                    alt="Default avatar"
                />
            )}
            {totalMembers > 1 && (
                <div className="counter">+{totalMembers - 1}</div>
            )}
        </div>
    )
}