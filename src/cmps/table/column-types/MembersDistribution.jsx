export function MembersDistribution({ tasks }) {
    const allMembers = tasks.flatMap(task => task.members || []);
    const uniqueMembers = [...new Set(allMembers.map(m => m.id))];

    if (uniqueMembers.length === 0) {
        return <div className="members-distribution empty">-</div>;
    }

    return (
        <div className="members-distribution">
            <span>{uniqueMembers.length}</span>
        </div>
    );
}