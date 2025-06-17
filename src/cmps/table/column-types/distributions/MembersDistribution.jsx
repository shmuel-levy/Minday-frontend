import { Avatar } from '../columns/MembersColumn'
import { useState } from 'react';

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
                    width="30"
                    height="30"
                    alt="Default avatar"
                />
            ) : totalMembers === 1 ? (
                <Avatar member={uniqueMembers[0]} size="30px" />
            ) : totalMembers === 2 ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {uniqueMembers.slice(0, 2).map((member, i) => (
                        <div key={member._id} style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 3 + i }}>
                            <Avatar member={member} size="30px" />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginLeft: '0', zIndex: 3 }}>
                        <Avatar member={uniqueMembers[0]} size="30px" />
                    </div>
                    <div className="counter">+{totalMembers - 1}</div>
                </div>
            )}
        </div>
    )
}