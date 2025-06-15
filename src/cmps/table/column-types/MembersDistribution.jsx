export function MembersDistribution({ tasks }) {
    const members = tasks.flatMap(task => task.members || []);

    const uniqueMembers = Array.from(new Map(
        members.map(m => [m._id, m])
    ).values());

    const totalMembers = uniqueMembers.length;

    const firstMember = uniqueMembers[0];

    // safe fallback for empty data:
    const displayLetter = firstMember?.name?.charAt(0).toUpperCase() || '?';

    return (
        <div className="members-summary">
            <div className="avatar" style={{ backgroundColor: firstMember?.color || '#0073ea' }}>
                {displayLetter}
            </div>
            {totalMembers > 1 && (
                <div className="counter">+{totalMembers - 1}</div>
            )}
        </div>
    )
}